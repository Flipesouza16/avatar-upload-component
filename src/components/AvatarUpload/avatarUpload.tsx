import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaMountain } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import "./avatarUploadStyles.scss";

type ImageModel = File & {
  path?: string;
  preview?: string;
  name?: string;
  type?: string;
};

type AcceptedFilesModel = (args: ImageModel[]) => void

const AvatarUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageModel | null>();

  const onDrop = useCallback<AcceptedFilesModel>((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      
      const newImage = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedImage(newImage);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const returnToInitialState = (): void => {
    setSelectedImage(null)
  }

  return (
    <div className="box">
      <div className="box-header">
        <GrClose onClick={returnToInitialState} />
      </div>
      <div className="drop-file-container" {...getRootProps()}>
        <div className='container-info-image'>
          {selectedImage && (
            <img src={selectedImage.preview} className="file-image" alt="preview"></img>
          )}
        
          <div className={`container-titles ${selectedImage && 'container-title-with-image-filled'}`}>
            <span className="file-title">
              <FaMountain />
              <span>Organization Logo</span>
            </span>

            <span className="file-subtitle">
              Drop the image here or click to browse.
            </span>
          </div>
        </div>
      </div>
      
      <input type="file" {...getInputProps()} />
    </div>
  );
};

export default AvatarUpload;
