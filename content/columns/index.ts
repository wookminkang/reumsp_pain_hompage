import type { ColumnArticle } from "@/lib/columns/types";
import { asanHospitalNearbyKoreanMedicine } from "./asan-hospital-nearby-korean-medicine";
import { asanHospitalNearbyNursingHospital } from "./asan-hospital-nearby-nursing-hospital";
import { bohunHospitalNearbyNursingHospital } from "./bohun-hospital-nearby-nursing-hospital";
import { breastCancerSurgeryRecovery } from "./breast-cancer-surgery-recovery";
import { carAccidentAftereffectsTreatment } from "./car-accident-aftereffects-treatment";
import { cheonhoNeckShoulderPain } from "./cheonho-neck-shoulder-pain";
import { dunchonStationNursingHospital } from "./dunchon-station-nursing-hospital";
import { gangdongCancerNursingHospital } from "./gangdong-cancer-nursing-hospital";
import { gangdongBackPainHospital } from "./gangdong-back-pain-hospital";
import { gangdongBackPainTreatment } from "./gangdong-back-pain-treatment";
import { gangdongCarAccident } from "./gangdong-car-accident";
import { gangdongCarAccidentHospitalization } from "./gangdong-car-accident-hospitalization";
import { gangdongChemoSideEffectCare } from "./gangdong-chemo-side-effect-care";
import { gangdongLumbarDisc } from "./gangdong-lumbar-disc";
import { gangdongNeckPainTreatment } from "./gangdong-neck-pain-treatment";
import { gangdongPostSurgeryRehabHospital } from "./gangdong-post-surgery-rehab-hospital";
import { jamsilCancerSurgeryRecovery } from "./jamsil-cancer-surgery-recovery";
import { jamsilShoulderPain } from "./jamsil-shoulder-pain";
import { jamsilSpinePain } from "./jamsil-spine-pain";
import { konkukHospitalNearbyKoreanMedicine } from "./konkuk-hospital-nearby-korean-medicine";
import { konkukHospitalNearbyNursingHospital } from "./konkuk-hospital-nearby-nursing-hospital";
import { kyungheeHospitalNearbyKoreanMedicine } from "./kyunghee-hospital-nearby-korean-medicine";
import { kyungheeHospitalNearbyNursingHospital } from "./kyunghee-hospital-nearby-nursing-hospital";
import { neckStiffnessHandNumbness } from "./neck-stiffness-hand-numbness";
import { postExercisePain } from "./post-exercise-pain";
import { radiationTherapyRecovery } from "./radiation-therapy-recovery";
import { samsungHospitalNearbyNursingHospital } from "./samsung-hospital-nearby-nursing-hospital";
import { seongsimHospitalNearbyKoreanMedicine } from "./seongsim-hospital-nearby-korean-medicine";
import { songpaCancerNursingHospital } from "./songpa-cancer-nursing-hospital";
import { songpaNeckDisc } from "./songpa-neck-disc";
import { thyroidCancerSurgeryRecovery } from "./thyroid-cancer-surgery-recovery";

/**
 * 칼럼 레지스트리 — 원고 추가 절차:
 * 1) 이 폴더에 <slug>.ts 파일 생성 (기존 원고를 템플릿으로 복사)
 * 2) 아래 배열에 import 한 줄 추가
 * sitemap·목록·상세 페이지가 모두 이 배열을 참조한다.
 */
export const COLUMNS: ColumnArticle[] = [
  asanHospitalNearbyKoreanMedicine,
  asanHospitalNearbyNursingHospital,
  bohunHospitalNearbyNursingHospital,
  breastCancerSurgeryRecovery,
  carAccidentAftereffectsTreatment,
  cheonhoNeckShoulderPain,
  dunchonStationNursingHospital,
  gangdongBackPainHospital,
  gangdongBackPainTreatment,
  gangdongCancerNursingHospital,
  gangdongCarAccident,
  gangdongCarAccidentHospitalization,
  gangdongChemoSideEffectCare,
  gangdongLumbarDisc,
  gangdongNeckPainTreatment,
  gangdongPostSurgeryRehabHospital,
  jamsilCancerSurgeryRecovery,
  jamsilShoulderPain,
  jamsilSpinePain,
  konkukHospitalNearbyKoreanMedicine,
  konkukHospitalNearbyNursingHospital,
  kyungheeHospitalNearbyKoreanMedicine,
  kyungheeHospitalNearbyNursingHospital,
  neckStiffnessHandNumbness,
  postExercisePain,
  radiationTherapyRecovery,
  samsungHospitalNearbyNursingHospital,
  seongsimHospitalNearbyKoreanMedicine,
  songpaCancerNursingHospital,
  songpaNeckDisc,
  thyroidCancerSurgeryRecovery,
].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function getColumn(slug: string): ColumnArticle | undefined {
  return COLUMNS.find((column) => column.slug === slug);
}
