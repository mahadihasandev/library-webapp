import React from 'react'

export default function Page() {
  return (

    <div className="min-h-screen w-full bg-[#0f172a] relative">
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
    }}
  />
    <main className=' flex flex-col items-center justify-center '>
        <h1 className='mt-52 font-bebas-neue text-5xl font-bold text-red-400'>
            Too much request, are you trying Dos or Ddos.
        </h1>
        <p className='text-red-400 text-2xl mt-10'>
            Take a chill pill then Try again later.
        </p>
    </main>
    </div>
  )
}
