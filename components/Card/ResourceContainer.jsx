// Library
import { getContent } from "@/app/utils/getContent";

// Components
import ResourceCard from "@/components/Card/ResourceCard";
import PaginationControls from "../Pagination/PaginationControls";


export default async function ResourceContainer({ category, page, per_page }) {
  const {items: resources, total} = await getContent({
    content_type: "resourcesPage",
    skip: Number(page - 1) * Number(per_page),
    limit: Number(per_page),
    order: ["fields.title"],
    "fields.category.sys.contentType.sys.id": "categories",
    page: page === "all" ? null : Number(page),
    category: category === "all" ? null : category,
  });

  // console.log(resources);
  // console.log(per_page);
  // console.log(page);
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {resources.map((resource, i) => {
          return <ResourceCard key={i} resource={resource} />;
        })}
      </div>
      <PaginationControls
        hasNextPage={resources.length === Number(per_page)}
        hasPrevPage={Number(page) > 1}
        total={total}
      />
    </>
  );
}
