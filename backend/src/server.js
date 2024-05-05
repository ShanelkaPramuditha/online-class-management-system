import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import configs from './config/index.js';
import connect from './utility/db-connection.js';
import router from './api/routes/routes.js';
import {
   postmessages,
   getdetails,
   deletemessages,
   editemessages,
   editmsgs,
   report,
   deleteAllmessages
} from './api/controllers/livechat.controller.js';
import {
   postmessages13,
   getdetails13,
   deletemessages13,
   editemessages13,
   editmsgs13,
   report13,
   deleteAllmessages13
} from './api/controllers/livechat.controller13.js';
import MSG from './api/models/messages.js';
import MSGS from './api/models/messages13.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import multer from 'multer';

const port = configs.backend.port;

const app = express();
app.use('/', express.static('files'));

/* middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
//app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));

/* HTTP GET Request */
app.get('/', (req, res) => {
   res.status(201).json('Duty Mode Activated!');
});

/* API Routes */
app.use('/api', router);

//socket.io for livechat
const server = createServer(app);

const io = new Server(server, {
   cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
   }
});
io.on('connect', socket => {
   console.log(`User Connected: ${socket.id}`);

   socket.on('send_msg', (data1, data2, data3) => {
      console.log(data1, data2, data3);
      io.emit('recived_msg', data1, data2, data3);
   });
   socket.on('send_file', (data1, data2) => {
      console.log(data1, data2);
      io.emit('recived_msg', data1, data2);
   });
   socket.on('delete_msg', async msgId => {
      try {
         await deletemessages(msgId);
         io.emit('message_deleted', msgId);
      } catch (error) {
         console.error('Error deleting message:', error);
      }
   });
});

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './files');
   },
   filename: (req, file, cb) => {
      const uniquesurfex = Date.now();
      cb(null, uniquesurfex + file.originalname);
   }
});
const upload = multer({ storage: storage });
const filesending = async (req, res) => {
   const name = req.body.firstName;

   const msg = req.file.filename;
   console.log(`namename`, msg);
   try {
      const newfile = new MSG({
         message: msg,
         firstName: name,
         filetype: 'file'
      });
      await newfile.save();
      res.send(msg);
   } catch (err) {
      res.send(err);
   }
};
const filesending13 = async (req, res) => {
   const name = req.body.firstName;

   const msg = req.file.filename;
   console.log(`namename`, msg);
   try {
      const newfile = new MSGS({
         message: msg,
         firstName: name,
         filetype: 'file'
      });
      await newfile.save();
      res.send(msg);
   } catch (err) {
      res.send(err);
   }
};

/* start server */
try {
   if ((await connect()) === true) {
      try {
         server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
         });
      } catch (error) {
         console.log('Server Not Running!');
      }
   } else {
      console.log('Server Not Running!');
   }
} catch (error) {
   console.log('Cannot connect to the database');
   console.log('Server Not Running!');
}

//Livechat
app.post('/message', postmessages);
app.get('/msg', getdetails);
app.delete('/deletemsg/:msgId', deletemessages);
app.get('/editdetail/:msgId', editemessages);
app.put('/editmsg/:msgId', editmsgs);
app.get('/report', report);
app.post('/uploadfile', upload.single('file'), filesending);
app.delete('/deleteAll', deleteAllmessages);

app.post('/message13', postmessages13);
app.get('/msg13', getdetails13);
app.delete('/deletemsg13/:msgId', deletemessages13);
app.get('/editdetail13/:msgId', editemessages13);
app.put('/editmsg13/:msgId', editmsgs13);
app.get('/report13', report13);
app.post('/uploadfile13', upload.single('file'), filesending13);
app.delete('/deleteAll13', deleteAllmessages13);
