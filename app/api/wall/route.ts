import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ messages: [] });
  }

  const { data, error } = await supabase
    .from("wall_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ messages: [] });
  }

  return NextResponse.json({ messages: data });
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    if (message.length > 140) {
      return NextResponse.json(
        { error: "Message too long. Keep it under 140 characters." },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.log("Supabase not configured. Would save:", { name, message });
      return NextResponse.json({ success: true });
    }

    const { error } = await supabase
      .from("wall_messages")
      .insert({ name, message });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
