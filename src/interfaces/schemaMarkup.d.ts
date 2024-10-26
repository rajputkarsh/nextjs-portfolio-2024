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
  sameAs: Array<string>;
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
  programmingLanguage: Array<string>;
  codeRepository: string;
  url?: string;
}

export interface ItemListSchema {
  "@type": "ItemList";
  "@id": string;
  itemListElement: Array<ProjectSchema | GameSchema>;
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
  "@graph": Array<
    PersonSchema | WebsiteSchema | ItemListSchema | ProfilePageSchema
  >;
}
