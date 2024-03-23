import React from 'react'
import EditMemePage from './ClientSideHandler'
import { getContent } from '@/app/utils/getContent';
import ErrorPage from '@/app/not-found';



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


export default async function EditPage({ params }: { params: { id: string }}) {
  const meme = await fetchMeme(params);
  if (!meme) {
    return <ErrorPage />
  }
  return (
    <EditMemePage memes={meme} />
  )
}