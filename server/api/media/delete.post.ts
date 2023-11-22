import crypto from "crypto";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const publicId = body.media.publicId;
  const cloudName = config.public.cloudinaryApiCloudName;
  const timestamp = new Date().getTime();
  const apiKey = config.cloudinaryApiKey;
  const apiSecret = config.cloudinaryApiSecret
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const mediaType = body.media.type
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${mediaType}/destroy`;

  const res = await $fetch(url,{
    method:"post",
    body: { 
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    }})

  return res
})

const generateSHA1 =(data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
const timestamp = new Date().getTime();
return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};