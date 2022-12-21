import React, { useEffect, useRef, useState } from "react";
import "./ImageUpload.css";
const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickedRef = useRef();
  const addImage = async (data) => {
    try {
      const res = await axios.post(
        "https://dev-api.basekwt.com/uploads/image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickedRef.current.click();
  };
  const pickedHandler = (event) => {
    let PickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      PickedFile = event.target.files[0];
      setFile(PickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    console.log(PickedFile);
    const data = new FormData();
    data.append("image", PickedFile);
    addImage(data);
  };
  return (
    <div className="form-control">
      <input
        ref={filePickedRef}
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jepg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview ">
          {previewUrl && <img src={previewUrl} alt="preview" />}

          {!previewUrl && <p className="hint">please pick an image</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          Pick Image
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
