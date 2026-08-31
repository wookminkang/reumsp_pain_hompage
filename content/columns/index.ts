import type { ColumnArticle } from "@/lib/columns/types";
import { asanHospitalNearbyKoreanMedicine } from "./asan-hospital-nearby-korean-medicine";
import { asanHospitalNearbyNursingHospital } from "./asan-hospital-nearby-nursing-hospital";
import { bangiPelvicPainTreatment } from "./bangi-pelvic-pain-treatment";
import { bohunHospitalNearbyNursingHospital } from "./bohun-hospital-nearby-nursing-hospital";
import { breastCancerSurgeryRecovery } from "./breast-cancer-surgery-recovery";
import { carAccidentAftereffectsTreatment } from "./car-accident-aftereffects-treatment";
import { cheonhoNeckShoulderPain } from "./cheonho-neck-shoulder-pain";
import { dunchonPostSurgeryRehabHospital } from "./dunchon-post-surgery-rehab-hospital";
import { dunchonStationNursingHospital } from "./dunchon-station-nursing-hospital";
import { dunchonTarsalTunnelSyndrome } from "./dunchon-tarsal-tunnel-syndrome";
import { gangdongAnklePainCare } from "./gangdong-ankle-pain-care";
import { gangdongCancerNursingHospital } from "./gangdong-cancer-nursing-hospital";
import { gangdongBackPainHospital } from "./gangdong-back-pain-hospital";
import { gangdongBackPainTreatment } from "./gangdong-back-pain-treatment";
import { gangdongCarAccident } from "./gangdong-car-accident";
import { gangdongCarAccidentHospitalization } from "./gangdong-car-accident-hospitalization";
import { gangdongChemoSideEffectCare } from "./gangdong-chemo-side-effect-care";
import { gangdongChronicPainCarAccident } from "./gangdong-chronic-pain-car-accident";
import { gangdongFrozenShoulderTreatment } from "./gangdong-frozen-shoulder-treatment";
import { gangdongKneePainTreatment } from "./gangdong-knee-pain-treatment";
import { gangdongLumbarDisc } from "./gangdong-lumbar-disc";
import { gangdongMuscleSpasmTreatment } from "./gangdong-muscle-spasm-treatment";
import { gangdongNeckPainTreatment } from "./gangdong-neck-pain-treatment";
import { gangdongPostSurgeryRehabHospital } from "./gangdong-post-surgery-rehab-hospital";
import { gangdongWristPainTreatment } from "./gangdong-wrist-pain-treatment";
import { gildongCarAccidentAftereffects } from "./gildong-car-accident-aftereffects";
import { jamsilCancerSurgeryRecovery } from "./jamsil-cancer-surgery-recovery";
import { jamsilElbowPainTreatment } from "./jamsil-elbow-pain-treatment";
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
import { seongnaeNeckPainTreatment } from "./seongnae-neck-pain-treatment";
import { seongsimHospitalNearbyKoreanMedicine } from "./seongsim-hospital-nearby-korean-medicine";
import { songpaCancerNursingHospital } from "./songpa-cancer-nursing-hospital";
import { songpaKneeAnklePainCare } from "./songpa-knee-ankle-pain-care";
import { songpaLumbarDiscSurgeryRehab } from "./songpa-lumbar-disc-surgery-rehab";
import { songpaNeckDisc } from "./songpa-neck-disc";
import { songpaPelvicPainOutpatientCare } from "./songpa-pelvic-pain-outpatient-care";
import { songpaPostSurgeryRehabHospital } from "./songpa-post-surgery-rehab-hospital";
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
  bangiPelvicPainTreatment,
  bohunHospitalNearbyNursingHospital,
  breastCancerSurgeryRecovery,
  carAccidentAftereffectsTreatment,
  cheonhoNeckShoulderPain,
  dunchonPostSurgeryRehabHospital,
  dunchonStationNursingHospital,
  dunchonTarsalTunnelSyndrome,
  gangdongAnklePainCare,
  gangdongBackPainHospital,
  gangdongBackPainTreatment,
  gangdongCancerNursingHospital,
  gangdongCarAccident,
  gangdongCarAccidentHospitalization,
  gangdongChemoSideEffectCare,
  gangdongChronicPainCarAccident,
  gangdongFrozenShoulderTreatment,
  gangdongKneePainTreatment,
  gangdongLumbarDisc,
  gangdongMuscleSpasmTreatment,
  gangdongNeckPainTreatment,
  gangdongPostSurgeryRehabHospital,
  gangdongWristPainTreatment,
  gildongCarAccidentAftereffects,
  jamsilCancerSurgeryRecovery,
  jamsilElbowPainTreatment,
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
  seongnaeNeckPainTreatment,
  seongsimHospitalNearbyKoreanMedicine,
  songpaCancerNursingHospital,
  songpaKneeAnklePainCare,
  songpaLumbarDiscSurgeryRehab,
  songpaNeckDisc,
  songpaPelvicPainOutpatientCare,
  songpaPostSurgeryRehabHospital,
  thyroidCancerSurgeryRecovery,
].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function getColumn(slug: string): ColumnArticle | undefined {
  return COLUMNS.find((column) => column.slug === slug);
}
