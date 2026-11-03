import type { ColumnSection } from "@/lib/columns/types";

/**
 * 리움한방병원 통증재활센터 고정 안내 문구 (2026-11 원고부터 모든 편에 포함).
 *
 * 사용자가 제공한 공식 문구다. **글자를 바꾸지 않는다.** 원문의 줄바꿈은 문장 중간
 * 줄넘김이라 공백으로 이어 붙였고, 문단 구분(빈 줄)만 살려 문단 3개로 나눴다.
 * 원고에서는 `sections`의 2번째(첫 답변 섹션 바로 뒤)에 이 상수를 그대로 넣는다.
 */
export const painCenterIntroSection: ColumnSection = {
  id: "reum-pain-rehab-center",
  heading: "리움한방병원 통증재활센터 안내",
  blocks: [
    {
      type: "paragraph",
      content: [
        "리움한방병원은 암요양센터와 더불어 교통사고 후유증, 수술후 재활, 각종 통증치료를 전문적으로 시행하는 통증재활센터를 운영하고 있습니다.",
      ],
    },
    {
      type: "paragraph",
      content: [
        "재활의학과 전문의가 진료하고 있어 교통사고 후유증 목, 허리 통증, 어깨·무릎 관절 통증, 근골격계 통증, 운동 기능 저하 등 다양한 증상에 대한 진료와 통증 · 재활 치료를 제공합니다.",
      ],
    },
    {
      type: "paragraph",
      content: [
        "또한 의과 협진으로 x-ray촬영 및 각종 검사 가능, 매일 평일 야간진료 및 토·일요일 진료로 365일 진료하여 통원, 입원 진료가 편리합니다.",
      ],
    },
  ],
};
