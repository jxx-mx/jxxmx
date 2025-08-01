import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};

const supabase = createClient();

export async function GET() {
  const { error } = await supabase
    .from("health_check_ping")
    .select("id")
    .limit(1);

  if (error) {
    return NextResponse.json(
      { status: "unhealthy" },
      { status: 500, headers: corsHeaders }
    );
  }

  return NextResponse.json({ status: "healthy" }, { headers: corsHeaders });
}
