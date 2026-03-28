import Link from 'next/link'
import React, { ReactNode } from 'react'
import { adminSideBarLinks } from '@/app/constants'

export default function layout({ children }: { children: ReactNode }) {
  return (
   <div className="min-h-screen w-full bg-white relative">
  {/*  Diagonal Cross Bottom Left Fade Grid Background */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
      backgroundSize: "40px 40px",
         WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
    }}
  />
  <main className='relative z-10 flex min-h-screen w-full flex-col md:flex-row'>
    <aside className='border-b border-slate-200 bg-white/95 p-4 backdrop-blur md:min-h-screen md:w-72 md:border-b-0 md:border-r'>
      <div className='mb-6'>
        <h2 className='text-xl font-bold text-slate-800'>Admin Panel</h2>
        <p className='text-sm text-slate-500'>Manage users and books</p>
      </div>
      <nav className='grid gap-2'>
        {adminSideBarLinks.map((item) => (
          <Link
            key={item.route}
            href={item.route}
            className='rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900'
          >
            {item.text}
          </Link>
        ))}
      </nav>
    </aside>
    <div className='w-full p-4 sm:p-6'>
      <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
        {children}
      </div>
    </div>

  </main>
</div>
  )
}
