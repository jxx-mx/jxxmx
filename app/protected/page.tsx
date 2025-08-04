"use client";

import { useState, useTransition } from "react";
import { translateText } from "./_actions";
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
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">영어 번역 서비스</h1>
          <p className="text-muted-foreground mt-2">
            영어 텍스트를 입력하면 한국어로 번역해드립니다.
          </p>
        </div>

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
