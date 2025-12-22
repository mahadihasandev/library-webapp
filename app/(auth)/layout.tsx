import { auth } from '@/nextauth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { IoBookOutline } from 'react-icons/io5'

export default async function layout({children}:{children:ReactNode}) {
  const session=await auth()
  if(session) redirect("/")
  return (
    <main className=''>
        <div className="min-h-screen w-full bg-[#020617] relative">
      {/* Magenta Orb Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />
          <div className="auth-container ">
            <section className="auth-form ">
                <div className='auth-box'>
                    <div className='flex flex-row gap-3'>
                        <IoBookOutline className="text-white text-5xl"/>
                        <h1 className='text-2xl font-semibold text-white'>BookWorm</h1>
                    </div>
                    <div>
                      <h3>email: admin@gmail.com <br /> password: admin123</h3>
                        {children}
                    </div>
                    
                </div>
            </section> 

            <section className='auth-illustration'>
              <Image 
              src='/images/auth-illustration.jpg'
              alt='auth illustration'
              height={1000}
              width={1000}
              className='size-full object-cover'
              loading="eager"
              />
              
            </section>        
      </div>
    </div>
    </main>
  )
}
