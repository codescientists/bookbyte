"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEbookParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import {ObjectId} from 'mongodb';
import User from '../database/models/user.model';
import Order from '../database/models/order.model';
import Ebook from '../database/models/ebook.model';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: price,
            product_data: {
              name: order.ebookTitle,
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        ebookId: order.ebookId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      billing_address_collection: 'required',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    
    const newOrder = await Order.create({
      ...order,
      ebook: order.ebookId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY EBOOK
export async function getOrdersByEbook({ searchString, ebookId }: GetOrdersByEbookParams) {
  try {
    await connectToDatabase()

    if (!ebookId) throw new Error('Ebook ID is required')
    const ebookObjectId = new ObjectId(ebookId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'ebooks',
          localField: 'ebook',
          foreignField: '_id',
          as: 'ebook',
        },
      },
      {
        $unwind: '$ebook',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          ebookTitle: '$ebook.title',
          ebookId: '$ebook._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
          buyerId: '$buyer._id'
        },
      },
      {
        $match: {
          $and: [{ ebookId: ebookObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('ebook._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'ebook',
        model: Ebook,
        populate: {
          path: 'publisher',
          model: User,
          select: '_id firstName lastName username',
        },
      })

    const ordersCount = await Order.distinct('ebook._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}