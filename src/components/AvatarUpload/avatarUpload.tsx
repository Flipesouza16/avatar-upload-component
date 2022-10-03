import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaMountain } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { RiErrorWarningFill } from "react-icons/ri";
import { PropsModel, ImageModel } from "./avatarUpload-type";
import "./avatarUploadStyles.scss";

type AcceptedFilesModel = (args: File[]) => void;

const AvatarUpload: React.FC<PropsModel<ImageModel>> = ({ onChange, defaultImage }) => {
  const [selectedImage, setSelectedImage] = useState<ImageModel | null>();
  const [zoomImageValue, setZoomImageValue] = useState<number>(1);
  const [isSelectedImageSaved, setIsSelectedImageSaved] =
    useState<boolean>(false);
  const [isErroUpload, setIsErroUpload] = useState<boolean>(false);
  
  useEffect(() => {
    if(defaultImage) {
      checkIfFileIsValid(defaultImage)
      setSelectedImage(defaultImage);
    }
  }, [defaultImage])

  const selectImage = (image: File): void => {
    const newImage: ImageModel = Object.assign(image, {
      preview: URL.createObjectURL(image),
    });

    setSelectedImage(newImage);
  };

  const onDrop = useCallback<AcceptedFilesModel>((acceptedFiles) => {
    returnToInitialState();

    acceptedFiles.forEach((file) => {
      checkIfFileIsValid(file)
      selectImage(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const checkIfFileIsValid = (file: File | ImageModel | undefined) => {
    if (file?.type && !file.type.includes("image")) {
      setIsErroUpload(true);
    } else {
      setIsErroUpload(false);
    }
  }

  const returnToInitialState = (): void => {
    setSelectedImage(null);
    setIsErroUpload(false);
    setIsSelectedImageSaved(false);
    setZoomImageValue(1);
  };

  const isInitialState = (): boolean => {
    return (
      !selectedImage || (selectedImage && !isErroUpload && isSelectedImageSaved)
    );
  };

  const updateZoomImageValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
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

      if (onChange) {
        onChange(selectedImage);
      }
    }
  };

  return (
    <div data-testid="avatar-upload" className={`box ${isInitialState() && "box-dashed"}`}>
      {!isInitialState() && (
        <div data-testid="close-button" className="box-header">
          <GrClose data-testid="close-button-click" size={20} onClick={returnToInitialState} />
        </div>
      )}
      <div data-testid="drop-file-container" className="drop-file-container">
        <div className="container-info-image">
          {selectedImage &&
            (isErroUpload ? (
              <div className="container-image container-image-error">
                <div className="file-image-icone">
                  <RiErrorWarningFill className="icone" />
                </div>
              </div>
            ) : (
              <div className="container-image">
                <img
                  data-testid="avatar-image"
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
                      data-testid="slider"
                      type="range"
                      max={10}
                      value={zoomImageValue}
                      onChange={updateZoomImageValue}
                    />
                    <button data-testid="button-save" className="button-save" onClick={saveImage}>
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

      <input data-testid="input-value" type="file" {...getInputProps()} />
    </div>
  );
};

export default AvatarUpload;
