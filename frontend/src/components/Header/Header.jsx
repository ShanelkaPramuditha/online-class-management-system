import { Link } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';
import SignOut from '../SignOut';
import { IoMdNotificationsOutline } from 'react-icons/io';

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import { AuthorizedUser } from '../../hooks/auth';
import { AvatarImg, SetNavbarItems } from './SetHeader';

const Header = () => {
   const { isAuthenticated } = AuthorizedUser();
   const navbarItems = SetNavbarItems();

   return (
      <div className="fixed top-0 left-0 w-full navbar bg-cold-gray h-[70px] text-base-content z-50 shadow-[0px_4px_10px_-10px_rgba(0,0,0,0.8)]">
         {/* Navbar Title */}
         <div className="flex-none">
            <Link to="/" className="font-light font-Rowdies text-base">
               MADURA KODITHUWAKKU
            </Link>
         </div>
         {/* NavBar List */}
         <div className="place-content-center w-full">
            <ul className="menu menu-horizontal px-3 gap-4">
               {navbarItems?.map((item, index) => (
                  <li key={index}>
                     <Link className="rounded-full border py-0" to={item.path}>
                        {item.name}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
         {/* Theme Changer */}
         <div className="flex items-stretch mr-5 gap-2">
            <div>
               <ThemeSwitch />
            </div>
            <div className="hidden">
               <IoMdNotificationsOutline size={24} />
            </div>
            {/* User Icon Dropdown */}
            <SignIn /> {/* Sign In Pop Up function */}
            <SignUp /> {/* Sign Up Pop Up function */}
            <SignOut /> {/* Sign Out Pop Up function */}
            <div className="flex-none gap-2">
               <div className="dropdown dropdown-end">
                  {/* User Icon */}
                  <div
                     // onClick={profileIconMenuHandler}
                     tabIndex={0}
                     role="button"
                     className="avatar">
                     <div>
                        <AvatarImg />
                     </div>
                  </div>

                  {/* User Icon DropDown */}
                  {isAuthenticated ? (
                     <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[white] rounded-box w-40">
                        <li>
                           <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                           <Link
                              onClick={() =>
                                 document.getElementById('sign-out').showModal()
                              }
                              className="justify-between">
                              Sign Out
                           </Link>
                        </li>
                     </ul>
                  ) : (
                     <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[white] rounded-box w-40">
                        <li>
                           <Link
                              onClick={() =>
                                 document.getElementById('sign-in').showModal()
                              }
                              className="justify-between">
                              Sign In
                           </Link>
                        </li>
                        <li>
                           <Link
                              onClick={() =>
                                 document.getElementById('sign-up').showModal()
                              }
                              className="justify-between">
                              Sign Up
                           </Link>
                        </li>
                     </ul>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
