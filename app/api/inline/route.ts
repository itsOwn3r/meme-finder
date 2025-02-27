import { NextResponse } from "next/server";
import db from "@/db"

export async function POST(req: Request) {

    const body = await req.json();

    const botToken = process.env.botToken!;

    if (body.inline_query) {
      const queryId = body.inline_query.id;


        const query = body.inline_query.query;

        let findMemes;

        if (query === "") {
          findMemes = await db.memes.findMany();
        } else {

        findMemes = await db.memes.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive"
                },
              },
              {
                description: {
                  contains: query,
                  mode: "insensitive"
                },
              },
              {
                ocr: {
                  contains: query,
                  mode: "insensitive"
                },
              },
            ],
          },
        });

      }


        const results = [];

        results.push(
            {
            type: "article",
            id: "0",
            title: "MemeHub And MemeFinder Project",
            input_message_content: {
                message_text: "Hey! I'm using @memehubocr and @aimemerobot !",
            },
        });

        for (const meme of findMemes) {

            results.push({
                type: "photo",
                id: meme.id,
                photo_url: meme.meme,
                thumb_url: `https://meme.own3r.me/_next/image?url=${encodeURIComponent(meme.meme)}&w=256&q=50`,
                title: meme.title,
                description: meme.description,
                caption: "@aimemerobot\n@memehubocr",
            })

        }
  

      // Send response to Telegram
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/answerInlineQuery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inline_query_id: queryId,
            results,
          }),
        }
      );

      const data = await response.json();

    }

  
    return NextResponse.json({ message: "Success" }, { status: 200 });
  }
  