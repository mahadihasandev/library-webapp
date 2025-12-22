import React, { Children } from 'react'

export default function layout() {
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
  <main className='flex min-h-screen w-full flex-row'>
    <p>Sidebar</p>
    <div className='admin-container'>
        <p></p>
    </div>

  </main>
</div>
  )
}
