"use client";
import React, { useContext } from 'react';
// import { useAuth } from '../context/authContext';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AdminSet = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const isUserLoggedIn = true;



  //toggle bar
  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  }


    
    return (
        <>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-4'>
          <div className='flex item-center justify-start h-16'>



            <div className='hidden md:block'>
              <div className='ml-4 flex items-start space-x-4'>


                {isUserLoggedIn ?
                  (
                    <>

                     
                      <Link href='/register' className='dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                        Students
                      </Link>
                      <Link href='/set-question' className='dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                    {/* svg question */}
                    
                        Set Task
                      </Link>
                     

                     
                      <Link href='/profile'>
                        <Image
                          src="/amin.png"
                          width={37}
                          height={37}
                          alt='profile'
                        />
                      </Link>
                    </>
                  ) :
                  (
                    <>

                    
                    </>
                  )
                }

              </div>
            </div>
            {/* Mobile section goes here */}
        <div className='md:hidden flex items-center'>
        <Link href='/register' className='dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                        {/* svg  */}
                        
                        Students
                      </Link>
                      <Link href='/set-question' className='dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                    {/* svg for question */}

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                        Set Task
                      </Link>
                     

                     
                      <Link href='/profile'>
                        <Image
                          src="/amin.png"
                          width={37}
                          height={37}
                          alt='profile'
                        />
                      </Link>
            </div>
            {/* <div className='md:hidden flex items-center'>

              {isUserLoggedIn ? (
                <>

                  <Image
                    src="Logo.svg"
                    width={37}
                    height={37}
                    alt='profile'
                    className='inline-flex items-center justify-center p-2 rounded-md dark:text-white 
                                        dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset dark:focus:ring-white'
                    onClick={toggleNavbar}
                  />
                  {navbarOpen && (
                    <div className='relative right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end'>
                      <Link
                        href='/profile'
                        className='text-sm font-inter text-gray-700 hover:text-gray-500 font-medium'
                        onClick={toggleNavbar}
                      >
                        My profile
                      </Link>
                      <button type='button'
                      >
                        Sign Out
                      </button>
                    </div>)}

                </>
              ) : (
                <>
                 
                  <Link
                    href='/sign-in'
                    className='text-sm font-inter text-gray-700 hover:text-gray-500 font-medium'
                    onClick={toggleNavbar}
                  >
                    Sign In
                  </Link>
                </>
              )}
              <button
                className='
          inline-flex items-center justify-center p-2 rounded-md dark:text-white 
          dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset dark:focus:ring-white
        '
                onClick={toggleNavbar}
              >
                {navbarOpen ? (
                  <svg className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div> */}
          </div>
        </div>

        </>
    


    )
}

export default AdminSet