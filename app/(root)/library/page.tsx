import { sampleBooks } from '@/app/constants'
import BookList from '@/components/BookList'


function page() {
  return (
    <div  className='w-full'>
        <BookList
        title ='All books'
        books={sampleBooks}
        />
    </div>
  )
}

export default page