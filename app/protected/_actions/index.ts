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

export async function translateText(text: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        error: "인증되지 않은 사용자입니다.",
        success: false,
      };
    }

    if (!text.trim()) {
      return {
        error: "번역할 텍스트를 입력해주세요.",
        success: false,
      };
    }

    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) {
      return {
        error: "DeepL API 키가 설정되지 않았습니다.",
        success: false,
      };
    }

    const url = "https://api-free.deepl.com/v2/translate";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `DeepL-Auth-Key ${apiKey}`,
      },
      body: JSON.stringify({
        text: [text],
        target_lang: "KO",
        source_lang: "EN",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("DeepL API 오류:", errorData);
      return {
        error: `번역 API 오류: ${response.status}`,
        success: false,
      };
    }

    const data = await response.json();
    const translation = data.translations[0];

    return {
      data: {
        originalText: text,
        translatedText: translation.text,
        detectedSourceLang: translation.detected_source_language,
      },
      success: true,
      message: "번역이 성공적으로 완료되었습니다.",
    };
  } catch (error) {
    console.error("translateText 오류:", error);
    return {
      error: "번역 중 오류가 발생했습니다.",
      success: false,
    };
  }
}

export async function getUsage() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        error: "인증되지 않은 사용자입니다.",
        success: false,
      };
    }

    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) {
      return {
        error: "DeepL API 키가 설정되지 않았습니다.",
        success: false,
      };
    }

    const url = "https://api-free.deepl.com/v2/usage";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("DeepL Usage API 오류:", errorData);
      return {
        error: `사용량 확인 API 오류: ${response.status}`,
        success: false,
      };
    }

    const data = await response.json();

    return {
      data: {
        character_limit: data.character_limit,
        character_count: data.character_count,
      },
      success: true,
      message: "사용량 정보를 성공적으로 가져왔습니다.",
    };
  } catch (error) {
    console.error("getUsage 오류:", error);
    return {
      error: "사용량 확인 중 오류가 발생했습니다.",
      success: false,
    };
  }
}
