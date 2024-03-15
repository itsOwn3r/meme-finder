// Library
import { getContent } from "@/app/utils/getContent";

// Components
import MemeCard from "@/components/Card/MemeCard";
import PaginationControls from "../Pagination/PaginationControls";


export default async function MemeContainer({ category, page, per_page, total, search }) {
  const {items: memes} = await getContent({
    content_type: "memesPage",
    search,
    skip: Number(page - 1) * Number(per_page),
    limit: Number(per_page),
    order: ["fields.title"],
    "fields.category.sys.contentType.sys.id": "categories",
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
        total={total}
      />
    </>
  );
}
