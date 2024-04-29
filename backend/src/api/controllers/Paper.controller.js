const PaperModel = require("./models/paperModel");

const getPaper = (req, res, next) => {
  PaperModel.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const getonePaper = (req, res, next) => {
  const _id = req.body.id;
  PaperModel.findById(_id)
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

//const getPapers = (req, res) => {
//   const xPapers = Paper.find()
//   res.status(200).json(xPapers)
const addPaper = async (req, res, next) => {
  const Paper = await PaperModel.create({
    Des: req.body.Des,
    Tid: req.body.Tid,
    Pid: req.body.Pid,
    Plink: req.body.Plink,
    Time: req.body.Time,
    Sdate: req.body.Sdate,
    Edate: req.body.Edate,
  })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const updatePaper = (req, res, next) => {
  const { Des, Tid, Pid, Plink, Time, Sdate, Edate,  } = req.body;
  const Tidval = parseInt(Tid);
  const Data = req.body;
  console.log(Data);
  PaperModel.findOneAndUpdate(
    { Pid: 3 }, // Query to find the document based on Pid
    { Des, Tid: Tidval, Plink, Time, Sdate, Edate, Price }, // Update Tid field
    { new: true } // To return the updated document
  )
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

const deletePaper = (req, res, next) => {
  //const id = Data.id;
  //Paper.deleteOne({ id: id })
  const Pid = req.body.Pid;
  console.log(req.body.Pid);
  PaperModel.deleteOne({ Pid })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

exports.getonePaper = getonePaper;
exports.getPaper = getPaper;
exports.addPaper = addPaper;
exports.updatePaper = updatePaper;
exports.deletePaper = deletePaper;
