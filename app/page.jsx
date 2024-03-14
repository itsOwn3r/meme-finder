import ResourceContainer from "@/components/Card/ResourceContainer";
import Tab from "@/components/TabNavigation/TabButtons";
import TabMobile from "@/components/TabNavigation/TabButtonsMobile";
import { Suspense } from "react";
import Skeleton from "@/components/Card/Skeleton";
import { getContent } from "./utils/getContent";
import Search from "@/components/Search/Search";

export default async function Home({ searchParams }) {
  const { category } = searchParams;
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "20";
  const search = searchParams["search"] ?? null;
  const { items: categories, total } = await getContent({
    category,
    search,
    content_type: "resourcesPage",
    order: ["fields.title"],
    include: 2,
  });
// console.log(categories);
console.log(search);

  // const data = await db.memes.findMany();
  // console.log(data);
  return (
    <main>
      <section className="mx-auto flex flex-col items-center space-y-5 mt-20 mb-32">
        <h1 className=" text-display max-w-[20ch] text-center text-accent">
          Meme Finder{" "}
          <span className=" text-light-gray">
            is a great tool to keep all your memes in one place.
          </span>
        </h1>
        <p className="text-text mx-auto text-base text-center xl:text-h6 2xl:text-h5 pt-5 max-w-[50ch]">
          You can search through your memes by title, tag, description and text of the Meme(OCR)
        </p>

        <Search />
      </section>
      <section>
        <TabMobile categories={categories} />
        <Tab categories={categories} />
        <Suspense fallback={<Skeleton />}>
          <ResourceContainer
            category={category}
            page={page}
            per_page={per_page}
            total={total}
            search={search}
          />
        </Suspense>
      </section>
    </main>
  );
}
