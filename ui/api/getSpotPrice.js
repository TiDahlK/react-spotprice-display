import { fetchBlob } from "./helpers/blob.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const date = new Date().toISOString().split("T")[0];
    const blobName = `spotprice_${date}`;
    const blobData = await fetchBlob(blobName);

    if (!blobData) {
      return res.status(400);
    }

    return res.status(200).json(blobData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
