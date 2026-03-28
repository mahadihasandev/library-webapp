"use client"

import { IKContext, IKImage, IKUpload } from "imagekitio-react"
import config from "@/lib/config"
import { useRef, useState } from "react"
import { CloudSync } from "lucide-react"
import { toast } from "sonner"

const authenticator =async ()=>{
  try {
    const response=await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)
    if(!response.ok){
      const errorText=await response.text()
      throw new Error(`Request field with status code ${response.status} : ${errorText}`)
      }
      const data=await response.json()
      const {signature,expire,token}=data
      return {signature,expire,token}
    
  } catch (error:unknown) {
    if(error instanceof Error){
    throw new Error(`Authentication failed ${error.message}`)
    }
    throw new Error("Unknown error during authentication.");
  }
}

interface Props{
type:'image'|'video'
onFileChange:(filePath:string)=>void
accept:string
placeholder:string
folder:string
variant:'dark'|'light'
}

interface UploadSuccessResponse {
  filePath: string
}

export default function FileUpload({
  onFileChange,type,accept,placeholder,folder,variant}:Props) {

    const onSuccess=(res: unknown)=>{
    if (!res || typeof res !== "object" || !("filePath" in res)) {
      toast.error("Upload failed", {
        description: "Unexpected upload response",
      })
      return
    }

    const uploadResponse = res as UploadSuccessResponse
      
    setFile(uploadResponse)
    onFileChange(uploadResponse.filePath)
    toast.success("Image uploaded Successfully",{     
      description:`${uploadResponse.filePath} uploaded successfully`
    })
  }

  const ikUploadRef=useRef<{ click: () => void } | null>(null)
  const [file,setFile]=useState<{filePath:string}|null>(null)
  const onError=()=>{
    toast.error("Image uploaded field",{     
      description:`Image can't be uploaded`
    })
  }

  

  return (
    <IKContext
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}

    >
      <IKUpload className='hidden' 
        ref={(instance) => {
          ikUploadRef.current = instance as { click: () => void } | null
        }}
        onSuccess={onSuccess}
        onError={onError}
        fileName='test.png'
        accept={accept}
        folder={folder}
        
        />

      <button 
      className={`upload-btn border ${variant === "dark" ? "bg-dark-300" : "bg-white"}`}
      onClick={(e)=>{
        e.preventDefault()
        ikUploadRef.current?.click()
      }}
      >
        <CloudSync />
        <p className="text-base text-light-100">{placeholder || `Upload ${type}`}</p>
        {file&&<p className="upload-filename">{file.filePath}</p>}
        </button>
        {file&&(
          <IKImage
          path={file.filePath}
          alt='default image'
          width={500}
          height={300}
          
          />
        )}
    </IKContext>
  )
}
