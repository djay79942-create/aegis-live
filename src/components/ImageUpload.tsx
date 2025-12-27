import { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "incident_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmj7urrzd/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setUrl(data.secure_url);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={uploadImage}>Upload</button>

      {url && (
        <div>
          <p>Uploaded Image:</p>
          <img src={url} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
