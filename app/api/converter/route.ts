import { ObjToSendType } from "@/app/new/page";
import { getOCR } from "@/libs/getOCR";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import fetch from "node-fetch";

export async function GET(req: NextRequest) {
  const rawUrl = new URL(req.url);
  const searchParams = new URLSearchParams(rawUrl.search);
  const url = searchParams.get("url");

  try {
    if (!url) {
      return NextResponse.json({ message: "URL is required", success: false });
    }

    const requset = await fetch(url, {
      headers: {
        "user-agent": `com.google.android.youtube/17.36.4 (Linux; U; Android 12; GB) gzip`,
        host: "www.threads.net",
        authority: "www.threads.net",
        Referer: "www.threads.net",
      },
    });
    const htmlRawData = await requset.text();

    const regex = /<meta property="og:image" content="(.*?)"/;
    let img = htmlRawData.match(regex)![1];
    img = img.replaceAll("&amp;", "&");

    return NextResponse.json({ success: true, image: img });

  } catch (error) {

    return NextResponse.json({
      message: (error as Error).message,
      success: false,
    });
  }
}
