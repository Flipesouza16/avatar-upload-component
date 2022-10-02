import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaMountain } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { RiErrorWarningFill } from "react-icons/ri";
import "./avatarUploadStyles.scss";

type ImageModel = File & {
  path?: string;
  preview?: string;
  name?: string;
  type?: string;
};

type AcceptedFilesModel = (args: ImageModel[]) => void;

const AvatarUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageModel | null>();
  const [isErroUpload, setIsErroUpload] = useState<boolean>(false);

  const onDrop = useCallback<AcceptedFilesModel>(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (!file.type.includes("image")) {
          setIsErroUpload(true);
        } else {
          setIsErroUpload(false);
        }

        const newImage = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        setSelectedImage(newImage);
      });
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const returnToInitialState = (): void => {
    setSelectedImage(null);
    setIsErroUpload(false);
  };

  return (
    <div className={`box ${!selectedImage && 'box-default'}`}>
      <div className="box-header">
        <GrClose size={20} onClick={returnToInitialState} />
      </div>
      <div className="drop-file-container" {...getRootProps()}>
        <div className="container-info-image">
          {selectedImage &&
            (isErroUpload ? (
              <div className="container-image-error">
                <div className="file-image-icone">
                  <RiErrorWarningFill className="icone" />
                </div>
              </div>
            ) : (
              <img
                src={selectedImage.preview}
                className="file-image"
                alt="preview"
              ></img>
            ))}

          <div
            className={`container-titles ${
              selectedImage && "container-title-with-image-filled"
            } ${isErroUpload && "container-title-with-image-error"}`}
          >
            {isErroUpload ? (
              <>
                <span className="file-title title-error">
                  Sorry, the upload failed.
                </span>
                <span className="file-subtitle subtitle-error">Try again</span>
              </>
            ) : (
              <>
                <span className="file-title title-default">
                  <FaMountain />
                  <span>Organization Logo</span>
                </span>

                <span className="file-subtitle">
                  Drop the image here or click to browse.
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <input type="file" {...getInputProps()} />
    </div>
  );
};

export default AvatarUpload;
