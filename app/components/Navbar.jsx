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

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const isUserLoggedIn = true;



  //toggle bar
  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  }


    // const [user] = useAuthState(auth);
    // const router = useRouter()
    // // const userSession = sessionStorage.getItem('user');
    
    // console.log({ user })

    // if (!user && !userSession) {
    //     router.push('/sign-up')
    // }
    // const { user, setUser } = useAuth();
    // console.log(user)
    return (
        <>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-4'>
          <div className='flex items-center justify-between h-16'>

            <span className="flex-shrink-0">
              <Link href="/logo">
                <Image
                  src="/logo.svg"
                  width={37}
                  height={37}
                  alt="School Connect logo"
                  className="inline-block mr-2 dark:text-gray-500" // Apply dark mode styling
                />
                <span className="font-bold dark:text-gray-900">SchoolConnect</span>
              </Link>
            </span>


            <div className='hidden md:block'>
              <div className='ml-4 flex items-center space-x-4'>


                {isUserLoggedIn ?
                  (
                    <>

                      <Link href='/' className='hover:dark border-solid border-2 border-teal-600 dark:text-gray-800 hover:bg-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium'>
                        Home
                      </Link>
                      <Link href='/contact' className='dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                        Contact
                        </Link>
                     
                      <Link href='/about' className='dark:text-gray-800 border-solid border-2 border-teal-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                        About
                      </Link>

                    
                    </>
                  ) :
                  (
                    <>

                      {/* {providers &&
                                                Object.values(providers).map((provider) =>
                                                (
                                                    <button
                                                        type='button'
                                                        key={provider.name}
                                                        onClick={() => signIn(provider.id)}
                                                        className='dark:text-green-400'
                                                    >
                                                        Sign In
                                                    </button>
                                                ))} */}
                    </>
                  )
                }

              </div>
            </div>
            {/* Mobile section goes here */}
            <div className='md:hidden flex items-center'>

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
                  {/* {providers &&
                          Object.values(providers).map((provider) =>
                          (
                            <button
                              type='button'
                              key={provider.name}
                              onClick={() => signIn(provider.id)}
                              className='dark:text-green-400'
                            >
                              Sign In
                            </button>
                          ))} */}
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
            </div>
          </div>
        </div>

        </>
    //     <div className='h-20 w-full border-b-2 flex items-center justify-between
    // '>


    //         <ul className='flex backdrop:'>
    //             <li className='p-2 cursor-pointer active'>
    //                 <a className='nav-link' href='#'>Home <span className='sr-only'>(current)</span></a>
    //             </li>
    //             <li className='p-2 cursor-pointer '>
    //                 <a className='nav-link' href='#'>About</a>
    //             </li>
    //             <li className='p-2 cursor-pointer '>
    //                 <a className='nav-link' href='#'>Profile</a>
    //             </li>
    //         </ul>
    //         <ul className='flex'>
    //             <Link href='/sign-in'>
    //                 <li className='p-2 cursor-pointer'

    //                 >Sign In

    //                 </li>
    //             </Link>
    //             <Link href='sign-up'>
    //             <li className='p-2 cursor-pointer'>
    //                 Sign up
    //             </li>
    //             </Link>
    //         </ul>
    //     </div>


    )
}

export default Navbar