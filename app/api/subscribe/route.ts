import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { name, email, source } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 }
      );
    }

    const validSources = ["landing", "documentary", "album"];
    const cleanSource = validSources.includes(source) ? source : "landing";

    if (!supabase) {
      console.log("Supabase not configured. Would save:", { name, email, source: cleanSource });
      return NextResponse.json({ success: true });
    }

    const { error } = await supabase
      .from("subscribers")
      .upsert(
        { email, name, source: cleanSource },
        { onConflict: "email", ignoreDuplicates: true }
      );

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
