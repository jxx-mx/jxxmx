import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { TABLE_NAMES } from "@/lib/utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST",
};

export async function GET() {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from(TABLE_NAMES.HEALTH_CHECK_PING)
      .select("id")
      .limit(1);

    if (error) {
      console.error("Health check error:", error);
      return NextResponse.json(
        { status: "unhealthy", error: error.message },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json({ status: "healthy" }, { headers: corsHeaders });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      { status: "unhealthy", error: "Database connection failed" },
      { status: 500, headers: corsHeaders }
    );
  }
}
