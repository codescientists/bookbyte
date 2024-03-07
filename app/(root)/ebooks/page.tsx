import CategoryFilter from "@/components/shared/CategoryFilter"
import Collection from "@/components/shared/Collection"
import Search from "@/components/shared/Search"
import { getAllEbooks } from "@/lib/actions/ebook.actions";
import { SearchParamProps } from "@/types";

const Ebooks = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const ebooks = await getAllEbooks({
    query: searchText,
    category,
    page,
    limit: 8
  });

  return (
    <section id="ebooks" className="my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="font-bold text-2xl">All Ebooks</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={ebooks?.data}
          emptyTitle="No Ebooks Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Ebooks"
          limit={6}
          page={page}
          totalPages={ebooks?.totalPages}
        />
      </section>
  )
}

export default Ebooks