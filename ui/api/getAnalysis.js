import apiHandler from "../api-utils/apiHelper.js";

export default async function handler(req, res) {
  return await apiHandler("ai_analysis", req, res);
}
