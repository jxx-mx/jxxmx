CREATE TABLE public.news_articles (
  id            bigserial PRIMARY KEY,
  url           text NOT NULL UNIQUE,
  title         text,
  description   text,
  image_url     text,
  source_domain text,
  source_name   text,
  published_at  timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- RLS 활성화
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- 읽기: 전체 공개
CREATE POLICY news_articles_select_all
ON public.news_articles
FOR SELECT
USING (true);

-- 쓰기: 서비스 롤 전용
CREATE POLICY news_articles_insert_service
ON public.news_articles
FOR INSERT
WITH CHECK (auth.role() = 'service_role');
