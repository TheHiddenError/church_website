import { NextResponse } from "next/server";
import { supportTable } from "@/app/db/schema";
import { db } from "@/app";

export async function POST(request: Request){
    const body = await request.json();
    const {reason, text} = body;
    try {
        await db.insert(supportTable).values({reason: reason, description: text});
    }catch(error){
        return NextResponse.json({message: error, status: 400})
    }
    return NextResponse.json({
        message: "The test",
        status: 200
    })
}