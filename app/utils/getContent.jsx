// import { createClient } from "contentful";

// //generateStaticParams here to statically generate the contents

// export async function getContent({ content_type, ...rest }) {
//   const client = createClient({
//     space: process.env.CONTENTFUL_SPACE_ID,
//     accessToken: process.env.CONTENTFUL_ACCESS_KEY,
//   });

//   const { items, total } = await client.getEntries({
//     content_type,
//     ...rest,
//   });

//   return { items, total };
// }

const localData = {
  items: [
  ],
  total: 0, 
};

export async function getContent({ tag, category, page }) {
  const res = await fetch("http://localhost/php/meme/");
  const data = await res.json();
  
  console.log(data);
  return {
    items: data, 
    total: data.length,
  };
}