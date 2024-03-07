import Collection from '@/components/shared/Collection'
import EbookCard from '@/components/shared/EbookCard'
import { Button } from '@/components/ui/button'
import { getEbooksByUser } from '@/lib/actions/ebook.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const ebooksPage = Number(searchParams?.ebooksPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage})

  const orderedEbooks = orders?.data.map((order: IOrder) => order.ebook) || [];
  const publishedEbooks = await getEbooksByUser({ userId, page: ebooksPage });

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

      <section className="my-8">
        <Collection
          data={orderedEbooks}
          emptyTitle="You haven't purchased any ebook yet!"
          emptyStateSubtext=""
          collectionType="My_Ebooks"
          limit={6}
          page={ordersPage}
        />
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

      <section className="my-8">
        <Collection
          data={publishedEbooks?.data}
          emptyTitle="You haven't created any ebook yet!"
          emptyStateSubtext=""
          collectionType="ebooks_Organized"
          limit={6}
          page={ordersPage}
        />
      </section>
    </>
  )
}

export default ProfilePage