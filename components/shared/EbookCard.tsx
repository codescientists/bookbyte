
import { IEbook } from '@/lib/database/models/ebook.model'
import { auth } from '@clerk/nextjs'
import { ArrowRight, EditIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RatingComponent from './RatingComponent'

type CardProps = {
  ebook: IEbook,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const EbookCard = ({ ebook, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEbookCreator = userId === ebook.publisher._id.toString();

  return (
    <div className="group relative w-64 flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg py-8">
        <img src={ebook.imageUrl} alt="..." className="h-44 w-full object-contain"/>

      {isEbookCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/update/${ebook._id}`}>
            <EditIcon/>
          </Link>

          {/* <DeleteConfirmation ebookId={ebook._id} /> */}
        </div>
      )}

      <div
        className="flex flex-col gap-3 p-5 md:gap-4"
      > 
       {!hidePrice && <div className="flex gap-2">
          <p className="w-min rounded-full bg-green-100 px-2 py-1 text-green-60">
            <span className="text-sm font-semibold my-2">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(ebook.price))}
            </span> 
          </p>
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {ebook.category.name}
          </p>
        </div>}

        <Link href={`/ebooks/${ebook._id}`}>
            <p className="text-lg font-semibold line-clamp-1 flex-1 text-black hover:text-red-600" title={ebook.title}>{ebook.title}</p>
        </Link>

        <RatingComponent />


        <div className="flex-between w-full">
          <p className="text-gray-600">
            {ebook.publisher.firstName} {ebook.publisher.lastName}
          </p>

            {hasOrderLink && (
            <Link href={`/orders?ebookId=${ebook._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <ArrowRight/>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default EbookCard;