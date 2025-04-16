import apiHandler from "../api-utils/apiHelper.js";

export default async function handler(req, res) {
  return await apiHandler("open_spotprice", req, res);
}
