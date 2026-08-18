import { getPlaiceholder } from "plaiceholder";

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error("Failed to fetch image");
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (err) {
    console.error(err);
  }
}

export default async function addBlurDataUrl(data: any[], imageField: string) {
  const base64Promises = data.map((item: any) => {
    return getBase64(item[imageField]);
  });

  const blurDataUrlResults = await Promise.all(base64Promises);

  const result = data.map((item, i) => {
    item.blurDataURL = blurDataUrlResults[i];
    return item;
  });

  return result;
}
