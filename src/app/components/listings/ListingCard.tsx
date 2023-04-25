'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import { Reservation } from '@prisma/client';
import { SafeUser, SafeListing } from '../../types';

import useCountries from '../../hooks/useCountries';

import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  onAction,
}) => {
  // hooks
  const router = useRouter();
  const { getByValue } = useCountries();

  // Getting the full location object
  const location = getByValue(data.locationValue);

  // Functions
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, actionId, onAction]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      className='group cursor-pointer'
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
          <Image
            src={data.imageSrc}
            fill
            alt='Listing'
            className='object-cover h-full w-full group-hover:scale-110 transition'
          />

          <div className='absolute top-3 right-3'>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className='text-lg font-semibold'>
          {location?.region}, {location?.label}
        </div>

        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>

        <div className='flex items-center gap-1'>
          <div className='font-semibold'>$ {price}</div>
          {!reservation && <div className='font-light'>{` night`}</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
