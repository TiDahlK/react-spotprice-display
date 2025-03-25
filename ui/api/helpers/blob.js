import { put, list } from "@vercel/blob";
import axios from 'axios'
export async function fetchBlob(name) {
  const blobList = await list();

  const blobToGet = blobList.blobs.find(blob => blob.pathName.includes(name))

  if(!blobToGet) {
    console.log("Blob not found")
    return;
  }

  const blob = await axios.get(blobToGet.pathName);
  const data = await blob.json();

  return data;
}

export async function setBlob(name, content) {
  const {url} = await put(name, content, { access: "public" });
  return url;
}
