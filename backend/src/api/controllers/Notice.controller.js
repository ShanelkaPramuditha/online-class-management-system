import NoticeModel from '../models/Notice.model.js';

//insert
export async function create(req, res) {
   NoticeModel.create(req.body)
      .then(() => res.json({ msg: 'Notice added sucsesfully' }))
      .catch(error =>
         res.status(400).json({ msg: 'notice adding faild', error })
      );
}

//get
export async function getall(req, res) {
   NoticeModel.find()
      .then(Notices => res.json(Notices))
      .catch(err => res.status(400).json({ msg: 'No Notice found' }));
}

//getOne
export async function getOne(req, res) {
   NoticeModel.findById(req.params.id)
      .then(Notices => res.json(Notices))
      .catch(() => res.status(400).json({ msg: 'cannot find the notice' }));
}

//update
export async function update(req, res) {
   NoticeModel.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.json({ msg: 'Notise udate successfuly' }))
      .catch(() => res.status(400).json({ msg: 'Notice update faild' }));
}

//Delete
export async function deleteOne(req, res) {
   NoticeModel.findByIdAndDelete(req.params.id)
      .then(() => res.json({ msg: 'Notice Delted Successfuly' }))
      .catch(() =>
         res.status(400).json({ msg: ' this notice Cannot be deleted' })
      );
}
