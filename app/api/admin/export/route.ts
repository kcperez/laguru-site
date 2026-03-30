import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabase) {
    return new NextResponse("name,email,source,created_at\n", {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=laguru-subscribers.csv",
      },
    });
  }

  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { error: "Failed to export." },
      { status: 500 }
    );
  }

  const headers = ["name", "email", "source", "created_at"];
  const csvRows = [
    headers.join(","),
    ...(data || []).map((row) =>
      headers
        .map((h) => {
          const val = String(row[h] ?? "");
          return val.includes(",") ? `"${val}"` : val;
        })
        .join(",")
    ),
  ];

  return new NextResponse(csvRows.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=laguru-subscribers.csv",
    },
  });
}
