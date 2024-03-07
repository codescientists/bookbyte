import CheckoutButton from '@/components/shared/CheckoutButton';
import RatingComponent from '@/components/shared/RatingComponent';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getEbookById } from '@/lib/actions/ebook.actions';
import { getOrdersByEbook } from '@/lib/actions/order.actions';
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs';
import { VerifiedIcon } from 'lucide-react';
import Link from 'next/link';

const EbookDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ebook = await getEbookById(id);

  const searchText = (searchParams?.query as string) || ''
  const orders = await getOrdersByEbook({ ebookId: id, searchString: searchText})
  const isEbookPurchased = orders.some((order: any) => order.buyerId === userId);

  return (
    <div className="w-full">
      <div className="container flex my-10 min-h-[500px]">
        <div className="w-full md:w-1/2 ">
            <img src={ebook.imageUrl} />
        </div>
        <div className="w-full md:w-5/12 px-10">
            <h2 className="text-2xl font-bold">{ebook.title}</h2>

            <RatingComponent />

            <p className="text-2xl my-2 font-semibold">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(ebook.price)}
            </p>

            <p className="text-sm">{ebook.description}</p>

            <Separator className="my-4"/>

            <div className="flex items-center">
              {ebook.publisher._id.toString() == userId || isEbookPurchased ? 
                  <div>
                    <h5 className="flex mb-2">Purchased <VerifiedIcon className="text-green-500 ml-1"/></h5>
                    <Button asChild className="button rounded-full" variant="secondary" size="lg">
                        <Link href={ebook.pdfUrl} target='_blank'>
                          Download Ebook
                        </Link>
                    </Button>
                  </div>
              :
              <CheckoutButton ebook={ebook} />
              }
            </div>

        </div>
    </div>
    
    </div>
  )
}

export default EbookDetails