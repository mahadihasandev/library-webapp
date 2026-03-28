import React from 'react'

export default function page() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-slate-900 sm:text-3xl'>Dashboard</h1>
        <p className='mt-1 text-sm text-slate-600'>Quick overview of library operations.</p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
          <p className='text-sm text-slate-500'>Total Members</p>
          <p className='mt-2 text-2xl font-bold text-slate-900'>1,284</p>
        </div>
        <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
          <p className='text-sm text-slate-500'>Books Available</p>
          <p className='mt-2 text-2xl font-bold text-slate-900'>8,942</p>
        </div>
        <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
          <p className='text-sm text-slate-500'>Borrowed Today</p>
          <p className='mt-2 text-2xl font-bold text-slate-900'>178</p>
        </div>
        <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
          <p className='text-sm text-slate-500'>Pending Requests</p>
          <p className='mt-2 text-2xl font-bold text-slate-900'>23</p>
        </div>
      </div>
    </div>
  )
}
