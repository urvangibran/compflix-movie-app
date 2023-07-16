import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const Movie = ({ item, status }) => {
  const [like, setLike] = useState(false);
  const [setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInformation, setShowInformation] = useState(false)
  const { user } = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else
      alert('You can save the movie when you are logged in');
  };

  const openInformation = () => {
    setShowInformation(true);
  };

  const closeInformation = () => {
    setShowInformation(false);
  };

  const getMovieDetail = () => {
    // console.log("item", item)
    // console.log("title", status)
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div onClick={getMovieDetail} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
      <img
        className='w-full h-auto block'
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className='absolute top-4 left-4 text-gray-300' />
          ) : (
            <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
          )}
        </p>
        {showModal && (
          <div className='fixed inset-0 grid place-items-center z-50' onClick={closeModal}>
            <div className='bg-white rounded-lg shadow-lg w-[300px] ' onClick={stopPropagation}>
              <div className='relative rounded-lg'>
                <img
                  alt={item?.title}
                  className='rounded-t-lg'
                />
                <button
                  className='absolute bg-gray-300 top-2 right-2 md:top-4 md:right-4 p-2 rounded-full text-gray-500 hover:text-gray-700 active:scale-90'
                  onClick={closeModal}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
              <div className='p-4 max-w-xs flex flex-col'>
                <h2 className='text-xl font-bold mb-2 text-black'>{item?.title}</h2>
                <p className='text-gray-600 text-sm'>
                  <span className='font-bold'>Release Date:</span> {item?.release_date}
                </p>
                <p className='text-gray-600 text-sm'>
                  <span className='font-bold'>Popularity:</span> {item?.popularity}
                </p>
                <p className='text-gray-600 text-sm'>
                  <span className='font-bold'>Rating:</span> {item?.vote_average}
                  <span> from {item?.vote_count} review</span>
                </p>
                <button onClick={openInformation} className='bg-black text-white rounded-md py-2 px-4 mt-4 hover:bg-gray-900 active:scale-95 '>
                  <span>{status === 'UpComing' ? 'Book Now' : 'Watch Movie'}</span>
                </button>
                {showInformation && (
                  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow text-black">
                      <p className="text-lg">Sorry, this page is under development due to workmanship limitations <br /> <span className='relative left-[29%] '>Thank you for your understanding</span></p>
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
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Movie;
