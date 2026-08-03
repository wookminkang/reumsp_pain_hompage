import Link from "next/link";
import type { Inline } from "@/lib/columns/types";

/** Inline 토큰 배열 → 텍스트/링크/강조 렌더링 (paragraph·callout 공용) */
export default function InlineText({ content }: { content: Inline }) {
  return (
    <>
      {content.map((token, i) => {
        if (typeof token === "string") return token;
        if ("href" in token) {
          if (token.external) {
            return (
              <a
                key={i}
                href={token.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold underline underline-offset-4"
              >
                {token.text}
              </a>
            );
          }
          return (
            <Link
              key={i}
              href={token.href}
              className="font-medium text-gold underline underline-offset-4"
            >
              {token.text}
            </Link>
          );
        }
        return (
          <strong key={i} className="font-semibold text-ink">
            {token.text}
          </strong>
        );
      })}
    </>
  );
}
