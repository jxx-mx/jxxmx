# Supabase 클라이언트 사용 가이드

## 📁 파일 구조

- `client.ts` - 브라우저용 Supabase 클라이언트
- `server.ts` - 서버용 Supabase 클라이언트

## 🔧 함수별 용도

### 일반 `createClient()` 함수

#### `client.ts - createClient()`

```typescript
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
  );
}
```

#### `server.ts - createClient()`

```typescript
export async function createClient() {
  // 쿠키 설정만 포함, 인증 토큰 없음
}
```

**사용 용도:**

- ✅ **공개 데이터 접근** (인증 불필요)
- ✅ **anonymous/anon key 사용**
- ✅ **RLS 정책에서 `SELECT USING (true)` 같은 공개 접근**

### Clerk JWT `createClerkSupabaseClient()` 함수

**특징:**

- 인증 토큰 포함: `Authorization: Bearer ${token}`
- Clerk JWT 토큰을 Supabase 요청에 자동 포함

**사용 용도:**

- ✅ **인증된 사용자 데이터 접근**
- ✅ **RLS 정책에서 `auth.jwt()` 사용하는 경우**
- ✅ **사용자별 데이터 조작 (INSERT/UPDATE/DELETE)**

## 📊 RLS 정책에 따른 동작 차이

현재 `health_check_ping` 테이블의 RLS 정책:

```sql
-- SELECT: 모든 사용자 허용
CREATE POLICY "Enable read access for all users" ON health_check_ping
FOR SELECT USING (true);

-- INSERT: 인증된 사용자만
CREATE POLICY "Enable insert for authenticated users only" ON health_check_ping
FOR INSERT WITH CHECK (
  auth.jwt() ->> 'aud' = 'authenticated'
  AND auth.jwt() ->> 'sub' IS NOT NULL
);
```

### 동작 결과 비교

| 작업       | 일반 `createClient()` | Clerk `createClerkSupabaseClient()` |
| ---------- | --------------------- | ----------------------------------- |
| **SELECT** | ✅ 성공 (공개 접근)   | ✅ 성공 (인증 + 공개)               |
| **INSERT** | ❌ 실패 (토큰 없음)   | ✅ 성공 (JWT 토큰 있음)             |
| **UPDATE** | ❌ 실패 (토큰 없음)   | ✅ 성공 (본인 데이터만)             |
| **DELETE** | ❌ 실패 (토큰 없음)   | ✅ 성공 (본인 데이터만)             |

## 💻 사용 예시

### 일반 `createClient()` 사용 시기

#### 1. 공개 Health Check

```typescript
// app/api/health/route.ts
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("health_check_ping")
    .select("id")
    .limit(1); // 단순 연결 확인만
}
```

#### 2. 공개 설정 데이터 조회

```typescript
const supabase = await createClient();
const { data } = await supabase.from("app_settings").select("*"); // 인증 불필요한 설정값들
```

### Clerk `createClerkSupabaseClient()` 사용 시기

#### 1. 사용자 데이터 조작 (Server Actions)

```typescript
// app/protected/_actions/index.ts
import { createClerkSupabaseClient } from "@/lib/supabase/server";

export async function addHealthCheckPing() {
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase.from("health_check_ping").insert({}); // ✅ 인증 토큰이 있어서 성공
}
```

#### 2. 서버 컴포넌트에서 인증된 데이터 조회

```typescript
// app/dashboard/page.tsx
import { createClerkSupabaseClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClerkSupabaseClient();

  const { data } = await supabase.from("user_profiles").select("*"); // 본인 프로필만 조회
}
```

#### 3. 클라이언트 컴포넌트에서 사용

```typescript
"use client";
import { useAuth } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "@/lib/supabase/client";

export default function ClientComponent() {
  const { getToken } = useAuth();

  const fetchData = async () => {
    const token = await getToken({ template: "supabase" });
    const supabase = createClerkSupabaseClient(token);

    const { data } = await supabase.from("health_check_ping").select("*");
  };
}
```

## ⚠️ 주의사항

### 잘못된 사용 예시

```typescript
// ❌ 이렇게 하면 RLS 정책에 막힘
export async function addHealthCheckPing() {
  const supabase = await createClient(); // 인증 토큰 없음

  const { error } = await supabase.from("health_check_ping").insert({}); // RLS 정책에서 거부됨!
}
```

### 올바른 사용 예시

```typescript
// ✅ 인증 토큰이 있어서 성공
export async function addHealthCheckPing() {
  const supabase = await createClerkSupabaseClient(); // JWT 토큰 포함

  const { error } = await supabase.from("health_check_ping").insert({}); // RLS 정책 통과!
}
```

## 🎯 요약

- **일반 함수**: "익명 사용자"로 접근 → **공개 데이터만**
- **Clerk 함수**: "인증된 사용자"로 접근 → **모든 데이터 + 사용자별 권한**

**핵심 원칙**: 데이터 쓰기 작업(INSERT/UPDATE/DELETE)은 반드시 **Clerk 함수**를 사용해야 합니다! 🔐
