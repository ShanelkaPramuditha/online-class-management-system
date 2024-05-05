import PaperModel from '../models/Paper.Model.js';

export async function getPaper(req, res, next) {
   PaperModel.find()
      .then(response => {
         res.json({ response });
      })
      .catch(error => {
         res.json({ error });
      });
}

export async function getonePaper(req, res, next) {
   const id = req.params.id;
   PaperModel.findById(id)
      .then(response => {
         res.json({ response });
      })
      .catch(error => {
         res.json({ error });
      });
}

//const getPapers = (req, res) => {
//   const xPapers = Paper.find()
//   res.status(200).json(xPapers)
export async function addPaper(req, res, next) {
   const Paper = await PaperModel.create({
      Des: req.body.Des,
      Tid: req.body.Tid,
      Pid: req.body.Pid,
      Plink: req.body.Plink,
      Time: req.body.Time,
      Sdate: req.body.Sdate,
      Edate: req.body.Edate
   })
      .then(response => {
         res.json({ response });
      })
      .catch(error => {
         res.json({ error });
      });
}

export async function updatePaper(req, res, next) {
   const { id } = req.params;
   const { Des, Tid, Pid, Plink, Time, Sdate, Edate } = req.body;
   const Tidval = parseInt(Tid);

   PaperModel.findOneAndUpdate(
      { _id: id }, // Query to find the document based on Pid
      { Des, Pid, Tid: Tidval, Plink, Time, Sdate, Edate }, // Update Tid field
      { new: true } // To return the updated document
   )
      .then(response => {
         res.json({ response });
      })
      .catch(error => {
         res.status(500).json({ error: error.message });
      });
}

export async function deletePaper(req, res, next) {
   const { id } = req.params;
   //Paper.deleteOne({ id: id })
   PaperModel.deleteOne({ _id: id })
      .then(response => {
         res.json({ response });
      })
      .catch(error => {
         res.json({ error });
      });
}
