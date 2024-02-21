'use client'

import EbookCard from '@/components/shared/EbookCard'
import { Button } from '@/components/ui/button'
import { getEbooksByUser } from '@/lib/actions/ebook.actions'
import { SearchParamProps } from '@/types'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const ProfilePage = ({ searchParams }: SearchParamProps) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;

    const [organizedEbooks, setOrganizedEbooks] = useState([]);

    useEffect(() => {
      const getEbooks = async () => {
        const fetchedEbooks = await getEbooksByUser({ userId, page: 1 })    
        setOrganizedEbooks(fetchedEbooks?.data)
      }

      getEbooks();
    }, [])

    console.log(organizedEbooks)
    

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-2">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='text-2xl font-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/ebooks">
              Explore More Ebooks
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <div className="grid grid-cols-5 gap-5 my-10">
            {organizedEbooks?.map((ebook: any)=>(
              <EbookCard ebook={ebook} key={ebook._id} />
            ))}
            </div>
      </section>

      {/* Ebooks Created */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-2">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='text-2xl font-bold text-center sm:text-left'>Ebooks you created</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/create">
              Create New Ebook
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <div className="grid grid-cols-5 gap-5 my-10">
            {organizedEbooks?.map((ebook: any)=>(
            <EbookCard ebook={ebook} key={ebook._id} />
            ))}
        </div>
      </section>
    </>
  )
}

export default ProfilePage