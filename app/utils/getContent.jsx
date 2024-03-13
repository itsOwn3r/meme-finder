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
import db from "@/db"
const localData = {
  items: [
  ],
  total: 0, 
};

export async function getContent({ tag, category, page, id, limit }) {
  // console.log(id);
  let url = new URL("http://localhost/php/meme/");
  let params = new URLSearchParams(url.search);
  
  //Add a second foo parameter.
  //Query string is now: 'foo=1&bar=2&foo=4'
  const where = {isActive: true}
  if (id) {
    params.append("id", id);
    where.id = id
  }
  if (category) {
    params.append("category", category);
    where.category = category
  }
  if (page) {
    params.append("page", page);
  }
  if (limit) {
    params.append("per_page", limit);
  }
  const finalParams = params.toString();
  // console.log(`http://localhost/php/meme/?${finalParams}`);
  const res = await fetch(`http://localhost/php/meme/?${finalParams}`);
  const data = await res.json();
  const currentPage = (page > 1 ? ((page * limit) - limit) : 0) || null;
  const database = await db.memes.findMany({
    where: where,
    // where: {
    //   isActive: true
    //   // isActive: true
    // }
    // take:  limit || 0,
    // skip: currentPage || 0,
    // select: limit || 20
  },
  )
  console.log(where);
  console.log(limit);
  console.log(page);
  console.log(currentPage);
  console.log(database);
  // console.log(data);
  // console.log(data.length);
  // console.log(data.total);
  return {
    items: database, 
    total: data.total,
  };
}