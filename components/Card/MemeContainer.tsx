// Library
import { getContent, getContentProps } from "@/app/utils/getContent";

// Components
import MemeCard from "@/components/Card/MemeCard";
import PaginationControls from "../Pagination/PaginationControls";


export default async function MemeContainer({ category, page, per_page, total, search }: getContentProps & {
  total: number | string;

}) {
  const {items: memes} = await getContent({
    search,
    limit: per_page ? Number(per_page) : null,
    page: page === "all" ? null : Number(page),
    category: category === "all" ? null : category,
  });

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {memes.map((meme, i) => {
          return <MemeCard key={i} memeContent={meme} />;
        })}
      </div>
      <PaginationControls
        hasNextPage={memes.length === Number(per_page)}
        hasPrevPage={Number(page) > 1}
        total={Number(total)}
      />
    </>
  );
}
