import Image from "next/image";
import CodingBoy from "@/assets/coding-boy.webp";
import config from "@/constants/config";
import Typewriter from "typewriter-effect";
import Socials from "@/components/socials";

function HomeIntroduction() {
  return (
    <div className="flex flex-col lg:flex-row px-4 sm:px-8 md:px-12">
      <div className="h-1/2 lg:h-full lg:w-1/2 relative text-center flex flex-row justify-center">
        <Image
          src={CodingBoy.src}
          alt=""
          width={700}
          height={700}
          loading="eager"
        />
      </div>
      <div className="mt-12 md:mt-0 lg:w-1/2 flex flex-col gap-4 md:gap-8 items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-bold flex flex-row gap-2">
          {config.typewriterPreText}
          <span className="text-2xl md:text-4xl text-theme-color">
            <Typewriter
              options={{
                strings: [config.typewriterText],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </h1>
        <ul>
          {config.homeIintroductionTexts.map((text) => (
            <li key={text} className="mt-2 text-xl md:text-2xl">
              {text}
            </li>
          ))}
        </ul>
        <Socials />
      </div>
    </div>
  );
}

export default HomeIntroduction;
