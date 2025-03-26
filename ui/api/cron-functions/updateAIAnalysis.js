import OpenAI from "openai";
import { setBlob, fetchBlob } from "../../api-utils/blob.js";
const PRICE_AREAS = ["SE1", "SE2", "SE3", "SE4"];

const client = new OpenAI();

async function getData(name) {
  const TODAYS_DATE = new Date().toISOString().split("T")[0];
  const blobName = `${name}_${TODAYS_DATE}`;
  const blobData = await fetchBlob(blobName);

  return blobData;
}
function constructPromt(spotPrices, exchangeData, energyMix, priceArea) {
  return `Använd datapunkterna 'SPOT_PRICES', 'IMPORT_EXPORT' och 'ENERGY_PRODUCTION_MIX' för att förklara varför 'SPOT_PRICES' är på dagens nivå.  
          Var specifik för just dagens priser och undvik generella förklaringar. Lyft fram de mest avgörande faktorerna, såsom förändringar i elproduktion, import/export och hur detta påverkar priset.

          Skapa en detaljerad analys för elområde ${priceArea}, analysen är cirka 100 ord lång. Diskutera faktorer som påverkat priset i elområdet, inklusive produktionsmix, överföringskapacitet och import/export.  

          Svaret ska vara på svenska och formulerat på ett naturligt sätt.

          DATA
          SPOT_PRICES: ${JSON.stringify(spotPrices[priceArea])}
          IMPORT_EXPORT: ${JSON.stringify(exchangeData[priceArea])}
          ENERGY_PRODUCTION_MIX: ${JSON.stringify(energyMix.areas[priceArea])}
          `;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const [spotPrices, energyMix, exchangeData] = await Promise.all([
      getData("spotprice"),
      getData("energy"),
      getData("exchange"),
    ]);

    const analysisPerPriceArea = await Promise.all(
      PRICE_AREAS.map(async (priceArea) => {
        const analysis = await client.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: constructPromt(
                spotPrices,
                exchangeData,
                energyMix,
                priceArea
              ),
            },
          ],
        });

        return analysis.choices[0].message.content;
      })
    );

    const blobToSet = {
      SE1: analysisPerPriceArea[0],
      SE2: analysisPerPriceArea[1],
      SE3: analysisPerPriceArea[2],
      SE4: analysisPerPriceArea[3],
    };

    const date = new Date().toISOString().split("T")[0];
    const blobName = `ai_analysis_${date}`;
    await setBlob(blobName, JSON.stringify(blobToSet));

    res.status(200).json(blobToSet);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
