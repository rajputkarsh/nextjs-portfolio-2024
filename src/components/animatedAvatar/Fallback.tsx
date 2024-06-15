import Image from "next/image";
import CodingBoy from "@/assets/page/coding-boy.webp";

const FALLBACK_TEXT = "Loading Awesomeness. {PROGRESS} %";

function Fallback({ text }: { text: string }) {
  return (
    <>
      <Image
        src={CodingBoy.src}
        alt=""
        width={700}
        height={700}
        loading="eager"
      />
      <h3 className="mt-8 text-xl font-semibold flex justify-center flex-row gap-1">
        {FALLBACK_TEXT.replace("{PROGRESS}", text)}
      </h3>
    </>
  );
}

export default Fallback;
