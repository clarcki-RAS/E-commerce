import { Paper } from "@mui/material";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileUploaderProps = {
  fieldChange : (files: File[]) => void;
  mediaUrl: string;
  setMediaUrl : (url: string) => string;
}

const FileUploader = ( {fieldChange, mediaUrl, setMediaUrl }: FileUploaderProps ) => {

    const [files, setFiles] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState('')
    // const getBase64 = (file :File ):Promise<string> => {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => resolve(reader.result as string);
    //     reader.onerror = (error) => reject(error)
    //   }
    //   );
    // };

    // const onDrop = useCallback(async(acceptedFiles : FileWithPath[]) => {
    //     const file = acceptedFiles[0];
    //     setFiles([file]);
    //     fieldChange([file]);
    //     const base64 = await getBase64(file);
    //     setMediaUrl(base64);
    //   }, [fieldChange, setMediaUrl])

    const onDrop = useCallback((acceptedFiles : FileWithPath[]) => {
      const file = acceptedFiles[0];
      setFiles([file]);
      fieldChange([file]);
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
      setFileUrl(url);
    }, [fieldChange, setMediaUrl])

      const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            'image/*': [ '.png', '.gif', '.jpg', '.jpeg', '.svg' ]
        }
    })
    
      return (
        <div {...getRootProps()} >
          <input {...getInputProps()} className="cursor-pointer"/>
          {
            fileUrl ?
              (
              <div className="flex justify-center">
                <Paper className="my-auto" sx={{ width:190}}>
                  <img src={fileUrl}
                  alt="image"
                  />
                </Paper>
                </div>
              ) : (
                <div className="flex flex-center flex-col bg-white rounded-lg border-1 border-stone-400 hover:border-stone-700 cursor-pointer">
                    <img src="/assets/images/3401838_web_photo_picture_essential.png" className="mx-auto pt-12" width={96} height={77} alt="File upload"/>
                    <h3 className="small-regular pb-12 text-light-4">SVG, PNG, JPG</h3>
                </div>
              )
          }
        </div>
      )
}

export default FileUploader
