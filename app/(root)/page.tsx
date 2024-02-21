import HomeHero from "@/components/HomeHero"
import EbookCard from "@/components/shared/EbookCard";
import { getAllEbooks } from "@/lib/actions/ebook.actions";
import { SearchParamProps } from "@/types";


const Home = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const ebooks = await getAllEbooks({
    query: searchText,
    category,
    page,
    limit: 8
  })

  return (
    <div>
      <HomeHero />
      <section>
        <h2 className="text-center text-3xl font-bold mb-6">Trending Ebooks</h2>
        <div className="grid grid-cols-5 gap-5 my-10">
        {ebooks?.data.map((ebook: any)=>(
          <EbookCard ebook={ebook} />
        ))}
        </div>
      </section>
    </div>
  )
}

export default Home