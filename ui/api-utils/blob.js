import { put } from "@vercel/blob";
import axios from "axios";
export async function fetchBlob(name) {
  const { data } = await axios.get(
    `https://vmiofuhfoulvg3ax.public.blob.vercel-storage.com/${name}?download=1`
  );
  return data;
}

export async function setBlob(name, content) {
  const { url } = await put(name, content, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return url;
}
