export interface SocialMediaLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

export interface PersonSchema {
  "@type": "Person";
  "@id": string;
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  sameAs: string[];
  url: string;
}

export interface WebsiteSchema {
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  description: string;
  publisher: {
    "@id": string;
  };
}

export interface ProjectSchema {
  "@type": "SoftwareSourceCode";
  name: string;
  description: string;
  programmingLanguage: string[];
  codeRepository: string;
  url: string;
}

export interface ItemListSchema {
  "@type": "ItemList";
  "@id": string;
  itemListElement: ProjectSchema[];
}

export interface ProfilePageSchema {
  "@type": "ProfilePage";
  "@id": string;
  isPartOf: {
    "@id": string;
  };
  mainEntity: {
    "@id": string;
  };
}

export interface PortfolioSchema {
  "@context": "https://schema.org";
  "@graph": (
    | PersonSchema
    | WebsiteSchema
    | ItemListSchema
    | ProfilePageSchema
  )[];
}