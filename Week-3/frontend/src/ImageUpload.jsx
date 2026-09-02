import { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setUploadedImage("");
    setMessage("");
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      setMessage(response.data.message);

      setUploadedImage(
        `http://localhost:5000${response.data.imageUrl}`
      );
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Image upload failed");
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Image Upload</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Local Preview */}
      {preview && (
        <div style={{ marginTop: "15px" }}>
          <p>Preview:</p>

          <img
            src={preview}
            alt="Selected preview"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <br />

      <button type="button" onClick={handleUpload}>
        Upload Image
      </button>

      {message && (
        <p style={{ marginTop: "10px" }}>
          {message}
        </p>
      )}

      {/* Uploaded Image from Backend */}
      {uploadedImage && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image:</h3>

          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;