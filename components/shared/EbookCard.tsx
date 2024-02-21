import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Link from "next/link"
import RatingComponent from "./RatingComponent"
import { HeartIcon, ShoppingCartIcon } from "lucide-react"

const EbookCard = ({ebook}: any) => {
  return (
    <Card className="relative">
        {/* Floating buttons  */}
        <div className="absolute top-2 right-2">
            <button 
                // onClick={()=>handleCart()}
                title='Add to cart' 
                className="rounded-full border flex items-center justify-center h-10 w-10 bg-white hover:bg-red-500 transition hover:text-white mb-2">
                <ShoppingCartIcon className="h-5 w-5"/>
            </button>
            <button title="Add to wishlist" className="rounded-full border flex items-center justify-center h-10 w-10 bg-white hover:bg-red-500 transition hover:text-white">
                <HeartIcon className="h-5 w-5"/>
            </button>
        </div>
        
        <CardContent className="py-5">
            <img src={ebook.imageUrl} alt="..." className="h-48 w-full object-contain"/>
            <div className="flex flex-col justify-between h-full my-2">
                <Link href={`/ebooks/${ebook._id}`}>
                    <p className="text-lg font-semibold line-clamp-2 flex-1 text-black hover:text-red-600">{ebook.title}</p>
                </Link>

                <h5 className="text-xl font-semibold text-red-600 my-2">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(ebook.price)}
                </h5>     

                <RatingComponent />
            </div>
        </CardContent>
    </Card>
  )
}

export default EbookCard