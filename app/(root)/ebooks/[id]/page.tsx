import CheckoutButton from '@/components/shared/CheckoutButton';
import RatingComponent from '@/components/shared/RatingComponent';
import { Separator } from '@/components/ui/separator';
import { getEbookById } from '@/lib/actions/ebook.actions';
import { SearchParamProps } from '@/types'
import { RefreshCcw, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import Link from 'next/link';

const EbookDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const ebook = await getEbookById(id);

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
              <CheckoutButton ebook={ebook} />
            </div>

            <div className="mt-10 w-full">
              <div className="flex items-center border-2 border-black">
                <div className="p-4">
                  <TruckIcon className="h-10 w-10"/>
                </div>
                <div className="font-regular">
                  <h6 className="text-lg">Free Delivery</h6>
                  <p className='underline text-sm'>Enter your pincode for delivery availablity</p>
                </div>
              </div>
              <div className="flex items-center border-2 border-black border-t-0">
                <div className="p-4">
                  <RefreshCcw className="h-10 w-10"/>
                </div>
                <div className="font-regular">
                  <h6 className="text-lg">Return Delivery</h6>
                  <p className='underline text-sm'>Free 30 Days Return Policy</p>
                </div>
              </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default EbookDetails