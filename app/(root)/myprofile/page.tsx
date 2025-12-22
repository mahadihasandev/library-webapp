
import { sampleBooks } from '@/app/constants'
import { signOut } from '@/nextauth'
import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'


export default function page() {
  
  return (
    <div>
        <form action={async ()=>{
            'use server'
            await signOut()
            redirect('/signin')


        }}
        className='mb-10 '>
          <div className='ml-[86%]'>
            <Button className='px-10 py-6 bg-red-300 text-2xl font-ibm-plex-sans font-bold'>
                Logout
            </Button>
            </div>
        </form>
        <BookList title='Borrowed Books' books={sampleBooks}/>
    </div>
  )
}
