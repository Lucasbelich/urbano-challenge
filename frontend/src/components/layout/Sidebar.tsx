import { BookOpen, Home, LogOut, Users } from 'react-feather';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import urbanoLogo from '../../assets/images/urbano-logo-white.png';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/AuthService';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  className: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const history = useHistory();

  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
    setAuthenticatedUser(null);
    history.push('/login');
  };

  return (
    <div
      className={
        'bg-sidemenu-bg bg-cover bg-right bg-no-repeat sidebar ' + className
      }
    >
      <Link
        to="/"
        className="no-underline text-black flex justify-center items-center"
      >
        <img src={urbanoLogo} alt="logo" className="h-16" />
      </Link>
      <nav className="mt-24 flex flex-col gap-7 flex-grow">
        <SidebarItem to="/">
          <Home /> Dashboard
        </SidebarItem>
        <SidebarItem to="/courses">
          <BookOpen /> Courses
        </SidebarItem>
        {authenticatedUser.role === 'admin' ? (
          <SidebarItem to="/users">
            <Users /> Users
          </SidebarItem>
        ) : null}
      </nav>
      <div className="flex flex-col gap-3 items-center mt-auto">
        <div className="flex gap-3 mt-auto">
          <button
            className="text-red-500 rounded-md p-3 transition-colors flex gap-3 justify-center items-center font-semibold focus:outline-none"
            onClick={handleLogout}
          >
            Es
          </button>
          <button
            className="text-red-500 rounded-md p-3 transition-colors flex gap-3 justify-center items-center font-semibold focus:outline-none"
            onClick={handleLogout}
          >
            En
          </button>
        </div>
        <button
          className="text-red-500 bg-primaryWhite hover:bg-whiteHover rounded-md py-3 px-8 transition-colors flex gap-3 justify-center items-center font-semibold focus:outline-none"
          onClick={handleLogout}
        >
          <LogOut /> Logout
        </button>
      </div>
    </div>
  );
}
