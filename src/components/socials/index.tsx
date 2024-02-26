import Link from "next/link";
import config from "@/constants/config";
import Image from "next/image";

import gmail from "@/assets/logos/gmail.webp";
import github from "@/assets/logos/github.webp";
import linkedin from "@/assets/logos/linkedin.webp";
import twitter from "@/assets/logos/twitter.webp";
import stackoverflow from "@/assets/logos/stackoverflow.webp";

function Socials() {
  return (
    <div className="flex flex-row gap-8">
      <Link target="_blank" href={config.social.github}>
        <Image
          src={github.src}
          width={50}
          height={50}
          alt={config.social.github}
        />
      </Link>
      <Link target="_blank" href={config.social.linkedin}>
        <Image
          src={linkedin.src}
          width={50}
          height={50}
          alt={config.social.linkedin}
        />
      </Link>
      <Link target="_blank" href={config.social.stackoverflow}>
        <Image
          src={stackoverflow.src}
          width={50}
          height={50}
          alt={config.social.stackoverflow}
        />
      </Link>
      <Link target="_blank" href={config.social.twitter}>
        <Image
          src={twitter.src}
          width={50}
          height={50}
          alt={config.social.twitter}
        />
      </Link>
      <Link target="_blank" href={config.social.email}>
        <Image
          src={gmail.src}
          width={50}
          height={50}
          alt={config.social.email}
        />
      </Link>
    </div>
  );
}

export default Socials;
