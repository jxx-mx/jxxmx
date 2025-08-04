"use client";

import { useState, useTransition, useEffect } from "react";
import { translateText, getUsage } from "./_actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProtectedPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<{
    originalText: string;
    translatedText: string;
    detectedSourceLang: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [usage, setUsage] = useState<{
    character_count: number;
    character_limit: number;
  } | null>(null);
  const [usageError, setUsageError] = useState<string | null>(null);

  // 페이지 로드 시 사용량 정보 가져오기
  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const response = await getUsage();
      if (response.success && response.data) {
        setUsage(response.data);
        setUsageError(null);
      } else {
        setUsageError(response.error || "사용량 정보를 가져올 수 없습니다.");
      }
    } catch (error) {
      setUsageError("사용량 정보를 가져오는 중 오류가 발생했습니다.");
      console.error("Usage fetch error:", error);
    }
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      setError("번역할 텍스트를 입력해주세요.");
      return;
    }

    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const response = await translateText(inputText);

        if (response.success && response.data) {
          setResult(response.data);
          // 번역 완료 후 사용량 정보 업데이트
          fetchUsage();
        } else {
          setError(response.error || "번역 중 오류가 발생했습니다.");
        }
      } catch (error) {
        setError("번역 요청 중 오류가 발생했습니다.");
        console.error("Translation error:", error);
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">영어 번역 서비스</h1>
          <p className="text-muted-foreground mt-2">
            영어 텍스트를 입력하면 한국어로 번역해드립니다.
          </p>
        </div>

        {/* 사용량 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>DeepL API 사용량</span>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchUsage}
                disabled={isPending}
              >
                새로고침
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {usageError ? (
              <div className="text-sm text-red-600">{usageError}</div>
            ) : usage ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    사용한 글자수:
                  </span>
                  <span className="font-medium">{usage.character_count}자</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    전체 한도:
                  </span>
                  <span className="font-medium">
                    {usage.character_limit.toLocaleString()}자
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    남은 글자수:
                  </span>
                  <span
                    className={`font-medium ${
                      usage.character_count / usage.character_limit > 0.8
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {usage.character_limit - usage.character_count}자
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      usage.character_count / usage.character_limit > 0.8
                        ? "bg-red-500"
                        : usage.character_count / usage.character_limit > 0.5
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        (usage.character_count / usage.character_limit) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  {(
                    (usage.character_count / usage.character_limit) *
                    100
                  ).toFixed(1)}
                  % 사용됨
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                사용량 정보를 불러오는 중...
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>텍스트 번역</CardTitle>
            <CardDescription>
              번역하고 싶은 영어 텍스트를 입력하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-text">영어 텍스트</Label>
              <Input
                id="input-text"
                placeholder="How are you doing today?"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isPending}
              />
            </div>

            <Button
              onClick={handleTranslate}
              disabled={isPending || !inputText.trim()}
              className="w-full"
            >
              {isPending ? "번역 중..." : "번역하기"}
            </Button>

            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>번역 결과</CardTitle>
              <CardDescription>
                감지된 언어: {result.detectedSourceLang}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">원본 (영어)</Label>
                  <div className="p-3 bg-gray-50 border rounded-md min-h-[80px]">
                    <p className="text-sm">{result.originalText}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">번역본 (한국어)</Label>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md min-h-[80px]">
                    <p className="text-sm font-medium text-blue-900">
                      {result.translatedText}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
