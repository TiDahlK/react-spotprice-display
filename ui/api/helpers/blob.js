import { put, list } from "@vercel/blob";
import axios from "axios";
export async function fetchBlob(name) {
  const blobList = await list();

  const blobToGet = blobList.blobs.find((blob) => {
    return blob.pathname === name;
  });

  if (!blobToGet) {
    console.log("Blob not found");
    return;
  }

  const { data } = await axios.get(blobToGet.downloadUrl);
  return data;
}

export async function setBlob(name, content) {
  const { url } = await put(name, content, { access: "public" });
  return url;
}
