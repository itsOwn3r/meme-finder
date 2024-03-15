import db from "@/db"

export async function getContent({ category, page, id, limit, search }) {

  const where = { isActive: true }
  if (id) {
    where.id = id
  }
  if (category) {
    where.category = category
  }


  if (!search) {
    search = "someRandomStringThatNoOneEverHeardOf";
    where.OR = undefined
  }else{

    where.OR = [
      {
      title: {
      contains: search
      }
    },
      {
        description: {
        contains: search
      }
    },
      {
        category: {
        contains: search
      }
    },
      {
        ocr: {
        contains: search
      }
    },
      {
        source: {
        contains: search
      }
    },
      {
        tags: {
        has: search
      }
    },
    ]
  
  }
  
  const currentPage = (page > 1 ? ((page * limit) - limit) : 0) || null;
  const database = await db.memes.findMany({
    where: where,
    take:  limit,
    skip: currentPage || 0,
  },
  )
  const total = await db.memes.count({
    where: where,
  })

  return {
    items: database, 
    total: total,
  };
}