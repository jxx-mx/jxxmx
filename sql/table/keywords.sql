CREATE TABLE public.keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,                 -- Clerk의 user_id (문자열)
  keyword text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

-- 인덱스: 사용자별 키워드 빠른 조회용
CREATE INDEX idx_keywords_user_id ON public.keywords(user_id);
CREATE INDEX idx_keywords_user_id_keyword ON public.keywords(user_id, keyword);

-- RLS 활성화
ALTER TABLE public.keywords ENABLE ROW LEVEL SECURITY;

-- RLS 정책 예시: 본인 데이터만 접근 가능
-- (Clerk에서 Supabase JWT에 user_id 클레임을 넣어주고 current_setting('request.jwt.claim.sub', true)로 확인)
CREATE POLICY keywords_select_own
ON public.keywords
FOR SELECT
USING (user_id = current_setting('request.jwt.claim.sub', true));

CREATE POLICY keywords_insert_own
ON public.keywords
FOR INSERT
WITH CHECK (user_id = current_setting('request.jwt.claim.sub', true));

CREATE POLICY keywords_update_own
ON public.keywords
FOR UPDATE
USING (user_id = current_setting('request.jwt.claim.sub', true));

CREATE POLICY keywords_delete_own
ON public.keywords
FOR DELETE
USING (user_id = current_setting('request.jwt.claim.sub', true));