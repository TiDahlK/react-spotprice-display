import { fetchBlob } from "./blob.js";

export default async function apiHandler(name, req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const TODAYS_DATE = new Date().toISOString().split("T")[0];
    const blobName = `${name}_${TODAYS_DATE}`;
    const blobData = await fetchBlob(blobName);

    if (!blobData) {
      return res.status(400);
    }

    res.status(200).json(blobData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
