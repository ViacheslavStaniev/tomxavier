'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';
import Image from "next/image";

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex w-[100%] px-[20px] sm:px-[28px] items-center">
      <div className='w-[24px] sm:w-0'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 18H4M20 12H4M20 6H4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex w-[100%] sm:w-[50%] justify-center sm:justify-start">
        {/* <Link href="/" className={s.logo} aria-label="Logo">
          <Logo />
        </Link> */}
        <Image
          src={"/logo1.png"}
          alt="Image Description" // Add an alt text for accessibility
          width={45.75}
          height={24}
          className="w-0 sm:w-[45.75px]"
        />
        <nav className="ml-3 lg:block">
          <Link href="/" className={s.link}>
            Texto en auto
          </Link>
          {/* {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )} */}
        </nav>
      </div>
      <div className="flex sm:w-[50%] justify-end invisible sm:visible">
        {/* {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )} */}
        <Link href="/signin">
          <button className='w-[28px] h-[28px] rounded-full bg-[rgb(204,229,232)]'>
            <p className='text-[14px] text-[rgb(0,125,142)]'>C</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
