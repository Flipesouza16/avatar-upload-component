import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaMountain } from "react-icons/fa";
import "./avatarUploadStyles.scss";

type ImageModel = {
  path: string;
  preview: string;
  lastModified: string;
  lastModifiedDate: string;
  name: string;
  size: string;
  type: string;
  webkitRelativePath: string;
};

const AvatarUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageModel>();

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const newImage: ImageModel = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedImage(newImage);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="box" {...getRootProps()}>
      <input type="file" {...getInputProps()} />
      <div className="drop-file-container">
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
    </div>
  );
};

export default AvatarUpload;
