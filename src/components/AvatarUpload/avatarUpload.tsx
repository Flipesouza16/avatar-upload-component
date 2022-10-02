import React, { useCallback, useState } from "react";
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
  zoomValue?: number;
};

type AcceptedFilesModel = (args: ImageModel[]) => void;

const AvatarUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageModel | null>();
  const [zoomImageValue, setZoomImageValue] = useState<number>(1);
  const [isSelectedImageSaved, setIsSelectedImageSaved] =
    useState<boolean>(false);
  const [isErroUpload, setIsErroUpload] = useState<boolean>(false);

  const onDrop = useCallback<AcceptedFilesModel>((acceptedFiles) => {
    returnToInitialState()
    
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
    setIsSelectedImageSaved(false);
    setZoomImageValue(1)
  };

  const isInitialState = (): boolean => {
    return (
      !selectedImage || (selectedImage && !isErroUpload && isSelectedImageSaved)
    );
  };

  const updateZoomImageValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.valueAsNumber;
    if (newValue >= 1) {
      setZoomImageValue(newValue);
    }
  };

  const saveImage = (): void => {
    if (selectedImage) {
      const imageToSave = selectedImage;
      imageToSave.zoomValue = zoomImageValue;
      setIsSelectedImageSaved(true);
      setSelectedImage(imageToSave);
    }
  };

  return (
    <div className={`box ${isInitialState() && "box-dashed"}`}>
      {!isInitialState() && (
        <div className="box-header">
          <GrClose size={20} onClick={returnToInitialState} />
        </div>
      )}
      <div className="drop-file-container">
        <div className="container-info-image">
          {selectedImage &&
            (isErroUpload ? (
              <div
                className="container-image container-image-error"
              >
                <div className="file-image-icone">
                  <RiErrorWarningFill className="icone" />
                </div>
              </div>
            ) : (
              <div className="container-image">
                <img
                  src={selectedImage.preview}
                  className="file-image"
                  style={{ transform: `scale(${zoomImageValue})` }}
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
                <span
                  className="file-subtitle subtitle-error"
                  {...getRootProps()}
                >
                  Try again
                </span>
              </>
            ) : (
              <>
                {selectedImage && !isSelectedImageSaved ? (
                  <div className="container-image-to-save">
                    <span>Crop</span>
                    <input
                      type="range"
                      max={10}
                      value={zoomImageValue}
                      onChange={updateZoomImageValue}
                    />
                    <button className="button-save" onClick={saveImage}>
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      className="file-title title-default"
                      {...getRootProps()}
                    >
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
