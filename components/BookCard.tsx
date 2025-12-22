import Link from 'next/link'
import React from 'react'
import BookCover from './BookCover'
import { cn } from '@/lib/utils'
import { CalendarDays } from 'lucide-react'


export default function BookCard({id,title,genre,coverUrl,coverColor,isLoanedBook=false}:Book) {
  return (
    <div>
        <li className={cn(isLoanedBook&& "xs:w-52 w-full")}>
            <Link href={`/books/${id}`} 
            className={cn(isLoanedBook&&'w-full flex flex-col items-center rounded-lg')}>
            <BookCover coverColor={coverColor} coverImg={coverUrl}/>
            <div className={cn('mt-4',!isLoanedBook&& 'xs:max-w-40 max-w-28')}>
                <p className='book-title'>{title}</p>
                <p className='book-genre'>{genre}</p>
            </div>
            {
                isLoanedBook&&(
                    <div className='mt-3 w-full'>
                        <div className='book-loaned'>
                            <CalendarDays color="#03a9fc" className='object-container'/>
                            <p className='text-light-100'>11 days</p>
                        </div>
                       
                    </div>
                )
            }
            </Link>
        </li>
    </div>
  )
}
