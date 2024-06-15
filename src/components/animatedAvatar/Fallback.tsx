import Image from "next/image";
import TypewriterComponent from "typewriter-effect";
import CodingBoy from "@/assets/page/coding-boy.webp";

const FALLBACK_TEXT = "Loading Something Awesome. {PROGRESS} ";

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
        <TypewriterComponent
          options={{
            strings: "%",
            autoStart: true,
            loop: true,
          }}
        />
      </h3>
    </>
  );
}

export default Fallback;
