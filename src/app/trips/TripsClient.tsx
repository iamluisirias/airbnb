'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

import { SafeReservation, SafeUser } from '../types';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  // Functions
  // On cancel reservation
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title='Trips'
        subtitle='Where you have been and where you are going'
      />
      <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel Reservations'
            currentUser={currentUser}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
