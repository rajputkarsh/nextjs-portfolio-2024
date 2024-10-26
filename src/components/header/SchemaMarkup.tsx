import { generatePortfolioSchema } from "@/actions/schemaMarkup";
import { PortfolioSchema } from "@/interfaces/schemaMarkup";
import Script from "next/script";

async function SchemaMarkup() {

  const portfolioSchema: PortfolioSchema = await generatePortfolioSchema();

  return (
    <Script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(portfolioSchema),
      }}
    />
  );

}

export default SchemaMarkup;