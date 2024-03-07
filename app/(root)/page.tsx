import HomeHero from "@/components/HomeHero"
import Collection from "@/components/shared/Collection";
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
          <section className="wrapper my-8">
            <Collection
              data={ebooks?.data}
              emptyTitle="No ebook found!"
              emptyStateSubtext="Come back later"
              collectionType="All_Ebooks"
              limit={6}
              page={page}
              totalPages={ebooks?.totalPages}
            />
          </section>
      </section>
    </div>
  )
}

export default Home