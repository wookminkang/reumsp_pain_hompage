import type { ColumnArticle } from "@/lib/columns/types";
import { asanHospitalNearbyKoreanMedicine } from "./asan-hospital-nearby-korean-medicine";
import { asanHospitalNearbyNursingHospital } from "./asan-hospital-nearby-nursing-hospital";

/**
 * 칼럼 레지스트리 — 원고 추가 절차:
 * 1) 이 폴더에 <slug>.ts 파일 생성 (기존 원고를 템플릿으로 복사)
 * 2) 아래 배열에 import 한 줄 추가
 * sitemap·목록·상세 페이지가 모두 이 배열을 참조한다.
 */
export const COLUMNS: ColumnArticle[] = [
  asanHospitalNearbyKoreanMedicine,
  asanHospitalNearbyNursingHospital,
].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function getColumn(slug: string): ColumnArticle | undefined {
  return COLUMNS.find((column) => column.slug === slug);
}
