import React from 'react'
import { sampleBooks } from '@/app/constants'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import BookList from './BookList'

function Books() {
    const params = useParams()
    
    
    const book = sampleBooks.find((b) => b.id.toString() === params.id)

    
    if (!book) {
        return <div className="p-10 text-center">Book not found</div>
    }

    return (
        <div className="flex flex-col items-center 
        p-4 sm:p-6 w-full mx-auto">
            
            <h1 className="mb-6 text-center text-3xl font-bold text-white sm:mb-8 sm:text-5xl md:text-6xl">
                {book.title}
            </h1>

            {/* Big Book Image */}
            <div className="relative mb-8 aspect-[2/3] w-full max-w-[260px] overflow-hidden rounded-lg shadow-2xl sm:max-w-md">
                <Image 
                    src={book.coverUrl} 
                    alt={book.title}
                    height={500}
                    width={500}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Book Details */}
            <div className="max-w-2xl space-y-4 text-center">
                <p className="text-lg italic text-gray-100 sm:text-xl">By {book.author}</p>
                <p className="text-base leading-relaxed text-light-300 sm:text-lg">
                    {book.description}
                </p>
                
                <div className="mt-6">
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                        {book.genre}
                    </span>
                </div>

                
            </div>
            <BookList
                title ='Least Books'
                books={sampleBooks}
                />
        </div>
    )
}

export default Books