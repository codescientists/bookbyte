import Search  from '@/components/shared/Search'
import { SearchParamProps } from '@/types'
import { IOrderItem } from '@/lib/database/models/order.model'
import { getOrdersByEbook } from '@/lib/actions/order.actions'

const Orders = async ({ searchParams }: SearchParamProps) => {
  const ebookId = (searchParams?.ebookId as string) || ''
  const searchText = (searchParams?.query as string) || ''

  const orders = await getOrdersByEbook({ ebookId, searchString: searchText })

  return (
    <>
      <h3 className="wrapper text-xl font-bold text-center sm:text-left ">Your Orders</h3>
    
      <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." />
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Ebook Title</th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => (
                    <tr
                      key={row._id}
                      className="border-b"
                      style={{ boxSizing: 'border-box' }}>
                      <td className="min-w-[250px] py-4 text-primary-500">{row._id}</td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">{row.ebookTitle}</td>
                      <td className="min-w-[150px] py-4">{row.buyer}</td>
                      <td className="min-w-[150px] py-4">{new Date(row?.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                      <td className="w-[50px] py-4 mx-auto">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(row.totalAmount))}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Orders