import Image from "next/image";
import { CLINIC } from "@/lib/clinic";

export default function CancerCenterLink() {
  return (
    <a
      href={CLINIC.cancerCenterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-[77px] w-full items-center justify-center gap-[10px] bg-navy px-6"
    >
      <span className="text-[15.5px] font-semibold text-white/80">
        리움한방병원 암센터 바로가기
      </span>
      <Image src="/figma/ic-arrow-right.svg" alt="" width={18} height={18} />
    </a>
  );
}
