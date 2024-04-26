import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import configs from './config/index.js';
import connect from './utility/db-connection.js';
import router from './api/routes/routes.js';

const port = configs.backend.port;

const app = express();

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

/* start server */
try {
   if ((await connect()) === true) {
      try {
         app.listen(port, () => {
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
