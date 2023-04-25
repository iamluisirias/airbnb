import Image from 'next/image';

import useCountries from '@/app/hooks/useCountries';

import Heading from '../Heading';
import HeartButton from '../HeartButton';

import { SafeUser } from '@/app/types';

interface ListingHeaderProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHeader;
