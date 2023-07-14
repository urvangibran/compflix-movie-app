import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showInformation, setShowInformation] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const openInformation = () => {
    setShowInformation(true);
  };

  const closeInformation = () => {
    setShowInformation(false);
  };

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const confirmLogout = () => {
    handleLogout();
    closeConfirmation();
  };

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>
          COMPFLIX
        </h1>
      </Link>
      <div className="flex items-center space-x-2 md:space-x-10 text-white">
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink cursor-pointer hover:bg-[#c2c2c2] hover:opacity-70 hover:text-black rounded-md py-1 px-2 ">Home</li>
          <li className="headerLink cursor-pointer hover:bg-[#c2c2c2] hover:opacity-70 hover:text-black rounded-md py-1 px-2 ">TV Shows</li>
          <li className="headerLink cursor-pointer hover:bg-[#c2c2c2] hover:opacity-70 hover:text-black rounded-md py-1 px-2 ">Movies</li>
          <li className="headerLink cursor-pointer hover:bg-[#c2c2c2] hover:opacity-70 hover:text-black rounded-md py-1 px-2 ">New & Popular</li>
          <li className="headerLink cursor-pointer hover:bg-[#c2c2c2] hover:opacity-70 hover:text-black rounded-md py-1 px-2 ">My List</li>
        </ul>
      </div>
      {user?.email ? (
        <div>
          <button
            className='text-white pr-4'
            onClick={openInformation}
          >
            Account
          </button>
          {showInformation && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded shadow">
                <p className="text-lg">Sorry, the account page is under development due to workmanship limitations <br /> <span className='relative left-[29%] '>Thank you for your understanding</span></p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closeInformation}
                    className="px-4 py-2 bg-red-600 text-white text-center rounded mr-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={openConfirmation}
            className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
          >
            Logout
          </button>
          {showConfirmation && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded shadow">
                <p className="text-lg">Are you sure you want to logout?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closeConfirmation}
                    className="px-4 py-2 bg-red-600 text-white rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link to='/login'>
            <button className='text-white mr-2 cursor-pointer hover:bg-[#c2c2c2] hover:opacity-70 hover:text-black rounded-md py-1 px-2'>Sign In</button>
          </Link>
          <Link to='/signup'>
            <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white hover:bg-red-800 active:scale-95 '>
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
