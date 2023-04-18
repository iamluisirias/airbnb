'use client';

import Image from 'next/image';

interface AvatarProps {
  image?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {
  return (
    <Image
      src={`${image || '/images/placeholder.jpg'}`}
      className='rounded-full'
      height={30}
      width={30}
      alt='Avatar'
    />
  );
};

export default Avatar;
