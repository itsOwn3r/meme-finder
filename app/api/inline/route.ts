import { NextResponse } from "next/server";
import db from "@/db"

export async function POST(req: Request) {

    const body = await req.json();

    const botToken = process.env.botToken!;

    if (body.inline_query) {
      const queryId = body.inline_query.id;


        const query = body.inline_query.query;

        const findMemes = await db.memes.findMany({
            where: {
                title: {
                    contains: query
                },
                description: {
                    contains: query
                },
                ocr: {
                    contains: query
                }
            }
        })


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
                thumb_url: `https://meme.own3r.me/_next/image?url=${encodeURIComponent(meme.meme)}&w=256&q=100`,
                title: meme.title,
                description: meme.description,
                caption: "@memehubocr \n @aimemerobot",
            })
            
        }

        //   const results = [
        //     {
        //         type: "article",
        //         id: "1",
        //         title: "Hello from Next.js",
        //         input_message_content: {
        //             message_text: "This is an inline bot response!",
        //         },
        //     },
        //     {
        //       type: "photo",
        //       id: "2",
        //       photo_url: "https://res.cloudinary.com/droxqswxo/image/upload/v1740501916/jz129fdq4lbmnwb9ocxn.jpg", // Replace with a real image URL
        //       thumb_url: "https://res.cloudinary.com/droxqswxo/image/upload/v1740501916/jz129fdq4lbmnwb9ocxn.jpg", // Thumbnail URL
        //       title: "Serial",
        //       description: "Just Another meme",
        //       caption: "Aha ok!",
        //     },
        //     {
        //       type: "photo",
        //       id: "3",
        //       photo_url: "https://res.cloudinary.com/droxqswxo/image/upload/v1740502031/czqmcltquys2hlmf0fbm.jpg", // Replace with a real image URL
        //       thumb_url: "https://res.cloudinary.com/droxqswxo/image/upload/v1740502031/czqmcltquys2hlmf0fbm.jpg", // Thumbnail URL
        //       title: "Second",
        //       description: "Second Just Another meme",
        //       caption: "Second Aha ok!",
        //     }
        //   ];
  

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
  