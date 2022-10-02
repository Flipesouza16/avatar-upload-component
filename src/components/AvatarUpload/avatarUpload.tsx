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
  const [imageValue, setImageValue] = useState<number>(1);

  const [isSelectedImageSaved, setIsSelectedImageSaved] =
    useState<boolean>(false);

  const [isErroUpload, setIsErroUpload] = useState<boolean>(false);

  const onDrop = useCallback<AcceptedFilesModel>((acceptedFiles) => {
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const returnToInitialState = (): void => {
    setSelectedImage(null);
    setIsErroUpload(false);
  };

  const isDisplayBoxDashed = (): boolean => {
    return (
      !selectedImage || (selectedImage && !isErroUpload && isSelectedImageSaved)
    );
  };

  const getBackgroundSize = () => {
    return { backgroundSize: `${(imageValue * 100) / 10}%` }
  }

  const updateImageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const newValue = e.target.valueAsNumber
    setImageValue(newValue)
  }

  return (
    <div className={`box ${isDisplayBoxDashed() && "box-dashed"}`}>
      <div className="box-header">
        <GrClose size={20} onClick={returnToInitialState} />
      </div>
      <div className="drop-file-container">
        <div className="container-info-image">
          {selectedImage &&
            (isErroUpload ? (
              <div className="container-image container-image-error" {...getRootProps()}>
                <div className="file-image-icone">
                  <RiErrorWarningFill className="icone" />
                </div>
              </div>
            ) : (
              <div className="container-image" {...getRootProps()}>
                <img
                  src={selectedImage.preview}
                  className="file-image"
                  style={{ transform: `scale(${imageValue})` }}
                  alt="preview"
                ></img>
              </div>
            ))}

          <div
            className={`container-titles ${
              selectedImage && "container-title-with-image-filled"
            } ${isErroUpload && "container-title-with-image-error"}`}
          >
            {isErroUpload ? (
              <>
                <span className="file-title title-error" {...getRootProps()}>
                  Sorry, the upload failed.
                </span>
                <span className="file-subtitle subtitle-error" {...getRootProps()}>Try again</span>
              </>
            ) : (
              <>
                {selectedImage && !isSelectedImageSaved ? (
                  <div className="container-image-to-save">
                    <span>Crop</span>
                    <input 
                      type="range" 
                      max={10} 
                      value={imageValue}
                      onChange={updateImageValue} 
                      style={getBackgroundSize()} 
                    />
                  </div>
                ) : (
                  <>
                    <span className="file-title title-default" {...getRootProps()}>
                      <FaMountain />
                      <span>Organization Logo</span>
                    </span>

                    <span className="file-subtitle" {...getRootProps()}>
                      Drop the image here or click to browse.
                    </span>
                  </>
                )}
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
