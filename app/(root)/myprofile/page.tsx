
import { sampleBooks } from '@/app/constants'
import { signOut } from '@/nextauth'
import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'


export default function page() {
  
  return (
    <div className='space-y-8'>
        <div>
          <h1 className='text-3xl font-semibold text-white sm:text-4xl'>My Profile</h1>
          <p className='mt-2 text-light-100'>Manage your account and review borrowed books.</p>
        </div>
        <form action={async ()=>{
            'use server'
            await signOut()
            redirect('/signin')


        }}
        className='mb-6'>
          <div className='flex justify-start sm:justify-end'>
            <Button className='w-full px-6 py-4 text-lg font-bold sm:w-auto sm:px-10 sm:py-6 sm:text-xl bg-red-300 font-ibm-plex-sans'>
                Logout
            </Button>
            </div>
        </form>
        <BookList title='Borrowed Books' books={sampleBooks}/>
    </div>
  )
}
