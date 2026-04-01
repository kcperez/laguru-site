import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BLOCKED_WORDS = [
  "fuck", "shit", "bitch", "ass", "dick", "cock", "pussy", "cunt",
  "nigger", "nigga", "faggot", "fag", "retard", "whore", "slut",
  "puta", "mierda", "verga", "marica", "perra", "hijueputa", "gonorrea",
  "spam", "http://", "https://", ".com/", ".net/", ".org/",
];

function containsBlockedWords(text: string): boolean {
  const lower = text.toLowerCase();
  return BLOCKED_WORDS.some((word) => lower.includes(word));
}

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

    if (containsBlockedWords(name) || containsBlockedWords(message)) {
      return NextResponse.json(
        { error: "Keep it clean. Try again." },
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

export async function DELETE(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id || !supabase) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { error } = await supabase
      .from("wall_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
