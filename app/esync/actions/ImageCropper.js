// components/ImageCropper.js

import React, { useEffect, useRef } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

const ImageCropper = ({ imageSrc, onCrop }) => {
  const cropperRef = useRef(null);

  useEffect(() => {
    const cropper = new Cropper(cropperRef.current, {
      aspectRatio: 1, // Adjust as needed
      viewMode: 2,
      autoCropArea: 1,
      minCropBoxWidth: 350,
      minCropBoxHeight: 350,
      crop: (e) => {
        console.log(e.detail.x);
      },
      ready: () => {
        // Do something when cropper is ready
      },
    });

    return () => {
      // Cleanup the cropper instance on component unmount
      cropper.destroy();
    };
  }, []); // Only run the effect on mount

  const handleCrop = () => {
    const croppedDataUrl = cropperRef.current.cropper
      .getCroppedCanvas()
      .toDataURL();
    onCrop(croppedDataUrl);
  };

  return (
    <div>
      <img
        className="w-20 h-5"
        ref={cropperRef}
        src={imageSrc}
        alt="Crop Preview"
      />
      <button onClick={handleCrop}>Crop</button>
    </div>
  );
};

export default ImageCropper;
