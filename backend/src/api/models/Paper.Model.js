import mongoose from 'mongoose';

const paperSchema = mongoose.Schema(
   {
      Des: {
         type: String,
         required: [true, 'Please add a Description']
      },
      Tid: {
         type: Number,
         required: [true, 'Please add a Teacher Id']
      },
      Pid: {
         type: String,
         required: [true, 'Please add a Paper Id']
      },
      Plink: {
         type: String,
         required: [true, 'Please add a Paper Link']
      },
      Time: {
         type: String,
         required: [true, 'Please add a Time ']
      },
      Sdate: {
         type: String,
         required: [true, 'Please add a Starting date']
      },
      Edate: {
         type: String,
         required: [true, 'Please add a End date']
      }
   },
   {
      timestamps: true
   }
);

const PaperModel = mongoose.model('PaperModel', paperSchema);
export default PaperModel;
