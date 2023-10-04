import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';


interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  handleImage :(file :File) => void;
  restImage? :(restImageUrl :Function) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload,handleImage}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    handleImage(file)
    previewImage(file);
  };

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Upload an image(Size should be with in 1Mb)</label>
      <div className="mb-2" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="border rounded-md p-4 bg-gray-100 cursor-pointer">
          {selectedFile ? (
            <img src={imageUrl || ''} alt="Preview" className="max-w-full h-auto" />
          ) : (
            <p>Drag and drop an image here, or click to select one</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
