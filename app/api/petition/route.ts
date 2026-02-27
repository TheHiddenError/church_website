import { NextResponse } from "next/server";
import 'dotenv/config';

// import * as twilio from twilio

export async function POST(data: Request){
  try {
    const body = await data.json();
    const { name, info } = body;
    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    const number = process.env.PERSONAL_NUMBER!;

    // const client = twilio(accountSid, authToken);
    // client.messages
    //     .create({
    //         body: info + name != "" ?  `From: ${name}` : "",
    //         messagingServiceSid: 'MGfc50027763d32f168f8b23673322a497',
    //         to: number
    //     })
    //     .then(message => console.log(message.sid));

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}