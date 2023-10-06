import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';


interface ImageUploadProps {
  handleImage: (file: File) => void;
  imageFile: string | undefined
}

const ImageUpload: React.FC<ImageUploadProps> = ({ handleImage, imageFile }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (imageFile === undefined) {
        setSelectedFile(null)
        setImageUrl(null)
      }
    }, 1500)
  }, [imageFile])

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

  const maxSize = 1024 * 1024; // 1MB in bytes
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxSize,
    maxFiles: 1,
  });

  const formatFileSize= (bytes: number): string=> {
    if (bytes === 0) return '0 MB';
  
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const decimalPlaces = 2;
    const k = 1024;
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPlaces)) + ' ' + units[i];
  }

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {formatFileSize(file.size)}
      <ul>
        {errors.map(e => (<li key={e.code}>File Size is Larger than 1MB</li>)
        )}
      </ul>
    </li>
  ));

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Upload an image(Max size 1MB)</label>
      <div className="mb-2" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="border rounded-md p-4 bg-gray-100 cursor-pointer">
          {selectedFile ? (
            <img src={imageUrl || ''} alt="Preview" className="max-w-full h-auto" />
          ) : (
            <>
              <p>Drag and drop an image here, or click to select one</p>
              <em>(Only *.jpeg and *.png images will be accepted, Max size 1MB)</em>
              <aside>
                <ul>{fileRejectionItems}</ul>
              </aside>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
