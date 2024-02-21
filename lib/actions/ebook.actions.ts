'use server'

import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import Ebook, { IEbook } from "../database/models/ebook.model";
import { CreateEbookParams, GetAllEbooksParams, GetEbooksByUserParams, UpdateEbookParams } from "@/types";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export async function createEbook({
  title,
  description,
  imageUrl,
  price,
  pdfUrl,
  category,
  publisher,
}: CreateEbookParams) {
  try {
    await connectToDatabase();

    const newEbook = await Ebook.create({
      title,
      description,
      imageUrl,
      price,
      pdfUrl,
      category,
      publisher,
    });

    return newEbook;
  } catch (error: any) {
    throw new Error("Error creating ebook: " + error.message);
  }
}

export async function updateEbook({
    ebookId,
    title,
    description,
    imageUrl,
    price,
    pdfUrl,
    category,
    publisher,
    path,
  }: UpdateEbookParams) {
  try {
    await connectToDatabase();

    const ebookToUpdate = await Ebook.findByIdAndUpdate(
      ebookId,
      {
        title,
        description,
        imageUrl,
        price,
        pdfUrl,
        category,
        publisher,
      },
      { new: true }
    );

    if (!ebookToUpdate) {
      throw new Error("Ebook not found");
    }

    return ebookToUpdate;
  } catch (error: any) {
    throw new Error("Error updating ebook: " + error.message);
  }
}


const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateCategory = (query: any) => {
  return query
  .populate({ path: 'category', model: Category, select: '_id name' })
}

export async function getAllEbooks({ query, limit = 6, page, category }: GetAllEbooksParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { name: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit;

    const ebooksQuery = Ebook.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const ebooks = await populateCategory(ebooksQuery)
    const ebooksCount = await Ebook.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(ebooks)),
      totalPages: Math.ceil(ebooksCount / limit),
    }
    
  } catch (error) {
    handleError(error)
  }
}

export async function getEbookById(ebookId: string) {
  try {
    await connectToDatabase();

    const ebook = await Ebook.findById(ebookId);

    if (!ebook) {
      throw new Error("Ebook not found");
    }

    return ebook;
  } catch (error: any) {
    throw new Error("Error getting ebook by ID: " + error.message);
  }
}


// GET EBOOKS BY PUBLISHER
export async function getEbooksByUser({ userId, limit = 6, page }: GetEbooksByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { publisher: userId }
    const skipAmount = (page - 1) * limit

    const ebooksQuery = Ebook.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const ebooks = await populateCategory(ebooksQuery)
    const ebooksCount = await Ebook.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(ebooks)), totalPages: Math.ceil(ebooksCount / limit) }
  } catch (error) {
    handleError(error)
  }
}