import { ObjToSendType } from "@/app/new/page";
import db from "@/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const url = [];

    try {
        const formData = await req.formData();

        const sendToWrapper = await fetch(`${process.env.NEXT_PUBLIC_URL}api/new/threads/wrapper`, {
            method: "POST",
            body: formData
        })

        const data = await sendToWrapper.json();

        const body: ObjToSendType = JSON.parse(formData.get("body") as string);

        url.push(body.url);
        
        
        if (data?.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false });
        }
        
    } catch (error) {
        await db.errors.create({
            data: {
                title: (error as Error).message,
                url: url.length > 0 ? url[0] as string: "No title"
            }
        })
        return NextResponse.json({ message: (error as Error).message, success: false});
        
    }
}