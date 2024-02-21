
import EbookForm from '@/components/EbookForm';
import { getEbookById } from '@/lib/actions/ebook.actions';

type updateEbookParams = {
  params:{
    id: string
  }
}

const UpdateProduct = async ({params: {id}}: updateEbookParams) => {

    const ebook = await getEbookById(id); 
    
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-2">
        <h3 className="wrapper font-semibold text-center sm:text-left">Update Product</h3>
    </section>

    <div className="wrapper my-4">
        <EbookForm type="Update" ebook={ebook} ebookId={id} />
    </div>
    </>
  )
}

export default UpdateProduct