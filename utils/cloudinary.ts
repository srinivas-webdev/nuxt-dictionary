export const uploadFile = async (file: any, type: string) => {
  const config = useRuntimeConfig()
  const data = new FormData()
  data.append("file", file)
  data.append("upload_preset", config.public.cloudinaryApiUploadPreset)
  data.append("folder","phrases")

  const res = await fetch(config.public.cloudinaryApiBase+"/"+config.public.cloudinaryApiCloudName+"/"+type+"/upload",{
    method:"post",
    body: data
    })

  const resp = await res.json()
  return resp
};
