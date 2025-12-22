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
        p-5 w-full mx-auto">
            
            <h1 className="text-4xl text-white md:text-6xl font-bold mb-8 text-center">
                {book.title}
            </h1>

            {/* Big Book Image */}
            <div className="relative w-full mx-52 aspect-[2/3] max-w-md shadow-2xl rounded-lg overflow-hidden mb-8">
                <Image 
                    src={book.coverUrl} 
                    alt={book.title}
                    height={500}
                    width={500}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Book Details */}
            <div className="text-center space-y-4">
                <p className="text-xl text-gray-100 italic">By {book.author}</p>
                <p className="text-lg leading-relaxed text-light-300">
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