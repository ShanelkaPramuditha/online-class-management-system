import mongoose from 'mongoose';

const faqschema = mongoose.Schema(
  {
    MainCategory: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    SubCategory: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    Question: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    Answer: {
      type: String
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('FaqSchema', faqschema);
