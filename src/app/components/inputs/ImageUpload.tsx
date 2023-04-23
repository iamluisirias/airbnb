'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  // Functions
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='l5u0ihy6' // This is defined in cloudinary
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='relative flex flex-col justify-center items-center gap-4 p-20 text-neutral-600 cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300'
          >
            <TbPhotoPlus size={50} />
            <div>Click to upload</div>
            {value && (
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  src={value}
                  alt='Upload'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
