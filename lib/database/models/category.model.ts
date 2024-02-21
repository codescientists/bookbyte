import { Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },  
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' } 
});

const Category = models.Category || model('Category', CategorySchema);

export default Category;