"use server";

import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { TABLE_NAMES } from "@/lib/utils";

export async function addHealthCheckPing() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        error: "인증되지 않은 사용자입니다.",
        success: false,
      };
    }

    const supabase = await createClerkSupabaseClient();

    const { data, error } = await supabase
      .from(TABLE_NAMES.HEALTH_CHECK_PING)
      .insert({})
      .select();

    if (error) {
      console.error("Health check ping 추가 오류:", error);
      return {
        error: error.message,
        success: false,
      };
    }

    return {
      data: data[0],
      success: true,
      message: "Health check ping이 성공적으로 추가되었습니다.",
    };
  } catch (error) {
    console.error("addHealthCheckPing 오류:", error);
    return {
      error: "서버 오류가 발생했습니다.",
      success: false,
    };
  }
}

export async function getHealthCheckPings() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        error: "인증되지 않은 사용자입니다.",
        success: false,
      };
    }

    const supabase = await createClerkSupabaseClient();

    const { data, error } = await supabase
      .from(TABLE_NAMES.HEALTH_CHECK_PING)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Health check ping 조회 오류:", error);
      return {
        error: error.message,
        success: false,
      };
    }

    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error("getHealthCheckPings 오류:", error);
    return {
      error: "서버 오류가 발생했습니다.",
      success: false,
    };
  }
}
