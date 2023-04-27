// Move all the logic from LisitngClient to this component (leaving the listingClient as a Server component and this one as a client componert)
import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabled: boolean;
  disabledDates: Date[];
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
}) => {
  return (
    <div className='bgwhite rounded-xl border border-neutral-200 overflow-hidden'>
      <div className='flex items-center gap-1 p-4'>
        <div className='text-2xl font-semibold '>$ {price}</div>
        <div className='font-light text-neutral-600'>night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />

      <div className='p-4'>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
      </div>

      <div className='p-4 flex items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
