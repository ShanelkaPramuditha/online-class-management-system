import mongoose from 'mongoose';

const faqschema = mongoose.Schema(
  {
    FAQID: {
      type: Number,
      required: [true, 'Please add a Id'],  
      unique: true, //Primary key
    },
    Question: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    Answer: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('FaqSchema', faqschema);
