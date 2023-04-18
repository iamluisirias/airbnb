'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { categories } from '@/data/categories';

import Container from '../Container';
import CategoryBox from '../CategoryBox';

const Categories = () => {
  const params = useSearchParams();
  const currentCategory = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <div className='pt-4 flex items-center justify-between overflow-x-auto'>
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            description={category.description}
            icon={category.icon}
            selected={currentCategory === category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
