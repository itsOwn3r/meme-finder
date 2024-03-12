import { ObjToSendType } from "@/app/new/page";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const formData = await req.formData();
        const body: ObjToSendType = JSON.parse(formData.get("body") as string);
        const meme = formData.get("meme") as File;

        return NextResponse.json({ success: true, body });

    } catch (error) {
        return NextResponse.json({ message: (error as Error).message, success: false});
        
    }
}