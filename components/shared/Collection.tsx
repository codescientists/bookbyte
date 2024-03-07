import { IEbook } from '@/lib/database/models/ebook.model'
import React from 'react'
import Pagination from './Pagination'
import EbookCard from './EbookCard'

type CollectionProps = {
  data: IEbook[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'ebooks_Organized' | 'My_Ebooks' | 'All_Ebooks'
}

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 xl:gap-10">
            {data.map((ebook) => {
              const hasOrderLink = collectionType === 'ebooks_Organized';
              const hidePrice = collectionType === 'My_Ebooks';

              return (
                <li key={ebook._id} className="flex justify-center">
                  <EbookCard ebook={ebook} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
        </div>
      ): (
        <div className="flex items-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-50 py-28 text-center">
          <h3 className="font-bold">{emptyTitle}</h3>
          <p className="text-md">{emptyStateSubtext}</p>
        </div>
      )} 
    </>
  )
}

export default Collection