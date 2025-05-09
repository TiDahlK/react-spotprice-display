/* eslint-disable no-undef */
import axios from "axios";

export default async function getContentHandler(req, res) {
  const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
  const CONTENTFUL_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
  console.log(process.env.CONTENTFUL_ACCESS_TOKEN);
  console.log(process.env.CONTENTFUL_SPACE_ID);

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

  try {
    const graphqlQuery = req.body;

    const response = await axios.post(endpoint, graphqlQuery, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CONTENTFUL_TOKEN}`,
      },
    });

    res.status(200).json({ ...response.data.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Internal server error",
    });
  }
}
