"use client";
import { IoBookOutline } from "react-icons/io5";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";
export default function BookOverview({
    id,
    title,
    author,
    genre ,
    rating ,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    videoUrl,
    summary,
}:Book) {
  return (
    <section className='book-overview'>
        <div className="flex flex-1 flex-col gap-5">
            <h1>{title}</h1>
            <div className="book-info">
              <p>
                By <span className="font-semibold text-light-200">{author}</span>
              </p>
              <p>
                Category : <span className="font-semibold text-light-200">{genre}</span>
              </p>

              <div className="flex flex-row gap-1">
                <Star color="#ffd500" />
                <p>{rating}</p>
              </div>
            </div>
             <div className="book-copies">
              <p>
                Total Books : <span>{totalCopies}</span>
              </p>
              <p>
                Available books : <span>{availableCopies}</span>
              </p>
             </div>
             <p className="book-description">
              {description}
             </p>
             <Button className="book-overview_btn">
              <IoBookOutline/><p className="font-bebas-neue text-xl text-dark-100">Borrow Book</p>
             </Button>
        </div>
        <div className="relative flex flex-1 justify-center">
          <div className="relative">
              <BookCover
              variant='wide'
              className='z-10'
              coverColor={coverColor}
              coverImg={coverUrl}
              />
              <div className="absolute left-20 top-10 rotate-12 opacity-50 max-sm:hidden">
                <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImg={coverUrl}
            />
              </div>
          </div>

        </div>
    </section>
  )
}
