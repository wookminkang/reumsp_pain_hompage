import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { COLUMNS, getColumn } from "@/content/columns";
import { CLINIC, SITE_URL } from "@/lib/clinic";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  JsonLd,
} from "@/lib/schema";
import SummaryBox from "@/components/columns/summary-box";
import Toc from "@/components/columns/toc";
import ArticleRenderer from "@/components/columns/article-renderer";
import FaqSection from "@/components/columns/faq-section";
import References from "@/components/columns/references";
import Disclaimer from "@/components/columns/disclaimer";
import RelatedColumns from "@/components/columns/related-columns";

// Next 16: 동적 세그먼트 params는 Promise — 반드시 await
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COLUMNS.map((column) => ({ slug: column.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) return {};
  return {
    title: column.title,
    description: column.description,
    keywords: [column.keyword],
    alternates: { canonical: `/columns/${column.slug}` },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: `/columns/${column.slug}`,
      title: column.title,
      description: column.description,
      publishedTime: column.datePublished,
      modifiedTime: column.dateModified,
      ...(column.thumbnail
        ? {
            images: [
              {
                url: column.thumbnail.src,
                width: 1080,
                height: 1080,
                alt: column.thumbnail.alt,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ColumnPage({ params }: Props) {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) notFound();

  return (
    <article>
      <JsonLd data={articleJsonLd(column)} />
      <JsonLd data={faqJsonLd(column)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", url: SITE_URL },
          { name: "건강 칼럼", url: `${SITE_URL}/columns` },
          { name: column.title },
        ])}
      />

      {/* 제목 영역 — 카테고리 라벨 · 제목 · 날짜·필진 */}
      <header>
        <p className="text-[14px] font-bold text-gold">{column.category}</p>
        <h1
          id="article-title"
          className="mt-2.5 text-[26px] font-bold leading-[1.4] tracking-[-0.01em] text-ink lg:text-[32px]"
        >
          {column.title}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-[14px] text-muted">
          <time dateTime={column.datePublished}>
            {column.datePublished.replaceAll("-", ".")}
          </time>
          <span aria-hidden>·</span>
          <span>{CLINIC.name}</span>
          {column.dateModified !== column.datePublished && (
            <>
              <span aria-hidden>·</span>
              <time dateTime={column.dateModified}>
                {column.dateModified.replaceAll("-", ".")} 수정
              </time>
            </>
          )}
        </div>
      </header>

      {/* 히어로 썸네일 — 1:1 리움 오버레이 템플릿 (scripts/make-thumbnail.py) */}
      {column.thumbnail && (
        <div className="relative mt-8 aspect-square w-full overflow-hidden rounded-2xl bg-cream">
          <Image
            src={column.thumbnail.src}
            alt={column.thumbnail.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 680px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10 flex flex-col gap-10">
        <SummaryBox summary={column.summary} />
        <Toc sections={column.sections} />
      </div>

      <div className="mt-16">
        <ArticleRenderer sections={column.sections} />
      </div>

      <div className="mt-16">
        <FaqSection faq={column.faq} />
      </div>

      <div className="mt-16 flex flex-col gap-10">
        {column.references && <References references={column.references} />}
        <Disclaimer />
        <RelatedColumns current={column} />
      </div>
    </article>
  );
}
