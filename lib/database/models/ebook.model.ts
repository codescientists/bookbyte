import { Document, Schema, model, models } from "mongoose";

export interface IEbook extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  price: string;
  isFree: boolean;
  category: { _id: string, name: string }
  publisher: { _id: string, firstName: string, lastName: string }
}

const EbookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  publisher: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Ebook = models.Ebook || model('Ebook', EbookSchema);

export default Ebook;