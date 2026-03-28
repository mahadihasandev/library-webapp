
import Header from '@/components/Header'
import React, { ReactNode } from 'react'
import { auth } from '@/nextauth'
import { redirect } from 'next/navigation'
import { after } from 'next/server'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'


export default async function layout({ children }: { children: ReactNode }) {

  const session=await auth()
    if(!session) redirect("/signin")
     after(async()=>{
      if(!session?.user?.id) return
 

      
      await db
      .update(users)
      .set({lastActivityDate:new Date().toISOString().slice(0,10)})
      .where(eq(users.id,session?.user?.id))
    })



  return (
     <main >
           
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
      <div className="root-container relative left-0 right-0 z-20 pb-8">
      <div className="mx-auto max-w-7xl">
        <Header session={session}/>

        <div className="mt-8 pb-12 sm:mt-12 sm:pb-16">
          {children}
          </div>
      </div>
  </div>
</div>
    </main>
  )
}
