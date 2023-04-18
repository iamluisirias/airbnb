'use client';

// Components
import Container from '../Container';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Search from './Search';

// types from db
import { SafeUser } from '@/app/types';
import Categories from './Categories';

interface NavBarProps {
  currentUser?: SafeUser | null;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  );
};

export default NavBar;
