'use-client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import qs from 'query-string';

interface CategoryBoxProps {
  label: string;
  description: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  description,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    // Defining an empty object that will be a query
    let currentQuery = {};

    // If there's params in the search
    if (params) {
      // define the query as a string made of the params object
      currentQuery = qs.parse(params.toString());
    }

    // Then, we define a new object that will be all the query content plus the category selected
    const updatedQuery: any = { ...currentQuery, category: label };

    // But if the category in params is the same as the actual label, then delete the category from the updated query
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    // The url will have the form of url+query
    const url = qs.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );

    // We push to that direction
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? 'border-neutral-800 text-neutral-800'
          : 'border-transparent text-neutral-500'
      }`}
    >
      <Icon size={26} />

      <div className='font-medium text-sm'>{label}</div>
    </div>
  );
};

export default CategoryBox;
