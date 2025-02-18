import db from "@/db"
import { Memes } from "@prisma/client";

export interface getContentProps{
  category?: string | null;
  page?: string | number | null;
  id?: string;
  limit?: string | number | null;
  search?: string | null;
  per_page?: string;
}

export async function getContent({ category, page, id, limit, search }: getContentProps) {

  const where:any = { isActive: true }
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
      contains: search,
      mode: 'insensitive'
      }
    },
      {
        description: {
        contains: search,
        mode: 'insensitive'
      }
    },
      {
        category: {
        contains: search,
        mode: 'insensitive'
      }
    },
      {
        ocr: {
        contains: search,
        mode: 'insensitive'
      }
    },
      {
        source: {
        contains: search,
        mode: 'insensitive'
      }
    },
      {
        tags: {
        has: search
      }
    },
    ]
  
  }
  const takeLimit = limit ? Number(limit) : undefined;
  const currentPage = (page && Number(page) > 1) ? (Number(page) * takeLimit!) - takeLimit! : 0;
  const database = await db.memes.findMany({
    where: where,
    take:  takeLimit,
    skip: currentPage,
    include: {
      MemeItem: true
    }
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