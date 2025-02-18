import Button from "@/components/Button/Button";
import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/app/utils/getContent";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import ErrorPage from "@/app/not-found"

export async function generateMetadata({ params }: { params: { id: string }}) {
  try {
    const meme = await fetchMeme(params);
    if (!meme)
      return {
        title: "404 Not Found",
        description:
          "The meme you are looking for does not exist or it has been removed.",
      };
    return {
      title: meme.title,
      description: meme.description ,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "404 Not Found",
      description:
        "The meme you are looking for does not exist or it has been removed.",
    };
  }
}

export async function generateStaticParams() {
  const res = await getContent({});
  return res.items.map((item) => ({
    id: item.id,
  }));
}

async function fetchMeme({ id } : { id: string }) {
  const res = await getContent({
    "id": id,
  });
  return res.items[0];
}

export default async function MemeDetails({ params }: { params: { id: string }}) {
  const meme = await fetchMeme(params);
  if (!meme) {
    return <ErrorPage />
  }
  return (
    <section className="mt-8 flex flex-col">
      <div className="w-full flex items-center justify-between gap-x-1 pl-2">
      <Link scroll={false} href="/" className="flex items-center gap-x-1 pl-2 max-w-[7em]">
        <GoArrowLeft color="#F7F7F7" size={24} />
        <span className=" font-semibold text-text text-base">Back</span>
      </Link>     
         
      <Link scroll={false} href={`/edit/${params.id}`} className="flex items-center justify-end gap-x-1 pl-2 max-w-[7em]">
        <span className=" font-semibold text-text text-base">Edit</span>
        <GoArrowRight color="#F7F7F7" size={24} />
      </Link>     

      </div>

      <div className="flex flex-col md:flex-row mt-5 gap-x-10 lg:gap-x-16 items-start justify-start">
        <div className=" bg-super-dark-gray flex flex-col relative items-center justify-center md:pb-[5em] md:pt-[5em] pt-[2.5em] pb-[2.5em] rounded-2xl w-full md:w-1/2 border-4 border-outline border-opacity-15">
          <div className="relative mt-2.5 w-2/3 rounded-3xl overflow-hidden  shadow-shine bg-transparent bg-opacity-0 ">
            <Image
              priority={true}
              alt={meme.title}
              src={meme.meme}
              className="h-full w-full"
              width={800}
              height={800}
            />
          </div>
          {meme.MemeItem.length > 0 && meme.MemeItem.map((item) => (
                    <div key={item.id} className="relative mt-2.5 w-2/3 rounded-3xl overflow-hidden  shadow-shine bg-transparent bg-opacity-0 ">
                      <Image
                        alt="Meme"
                        src={item.url}
                        className="h-full w-full"
                        width={800}
                        height={800}
                      />
                  </div>
          ))}
        </div>
        <div className="w-full mt-12 md:mt-0 md:w-1/2">
          <div className="flex flex-col gap-y-3 items-start">
            <h1 className="text-h4 xl:text-h3 font-bold">
              {meme.title}
            </h1>
            <p className=" text-text text-base xl:text-h6 2xl:text-h5 max-w-[50ch] text-balance pb-3 ">
              {meme.description}
            </p>
            <Button
              href={`/?category=${meme.category}`}
            >
              View All <span className="uppercase">&apos;{meme.category}&apos;</span> memes
            </Button>
          </div>

          <div className="flex flex-col gap-x-2 mt-12 divide-y-2 divide-outline divide-opacity-20 text-xs xl:text-base 2xl:text-h6">
            <div className=" gap-x-1 grid grid-cols-12 border-t-2 border-outline border-opacity-20 py-2">
              <h2 className=" font-semibold col-span-4">Category</h2>
              <span className=" col-span-8 text-text px-1">
                {meme.category}
              </span>
            </div>

            {meme.ocr !== null && (
              <div className="gap-x-1 grid grid-cols-12 ">
                <h2 className="font-semibold col-span-4 pt-2">OCR</h2>
                <span className="flex flex-col col-span-8  text-text">
                  {meme.ocr}
                </span>
              </div>)
            }

            <div className=" gap-x-1 grid grid-cols-12 ">
              <h2 className=" font-semibold col-span-4 pt-2">Tags</h2>
              <span className="flex flex-col col-span-8  text-text">
                {meme.tags.map((tag) => (
                  <span
                    className=" py-2 border-b-2 border-outline border-opacity-20 px-1"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
