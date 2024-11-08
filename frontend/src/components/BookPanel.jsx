import React from "react";
import { useNavigate } from "react-router-dom";
import { FormatNumber } from "../utils/FormatNumber";
import { MySection } from "./MySection";
export function BookPanel({ title, viewMore, books }) {
  const navigate = useNavigate();

  function handleCardClick(cardId) {
    navigate(`/books/${cardId}`);
  }
  return (
    <MySection>
      <div className="flex justify-between p-5">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={() => {
            navigate(viewMore);
          }}
          className="text-xl font-bold text-[#0a68ff]"
        >
          View More
        </button>
      </div>
      <div className="">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {books.map((book, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-200 lg:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => handleCardClick(book.id)}
            >
              <div className="flex w-full justify-center p-4 md:w-1/2">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="h-48 w-full rounded-lg object-cover"
                ></img>
              </div>
              <div className="w-full p-4 md:w-1/2 md:py-4 md:pr-4">
                <p className="w-full truncate text-lg font-bold text-gray-900 dark:text-white">
                  {book.title}
                </p>
                <p className="font-normal text-gray-700 dark:text-white">
                  {book.author}
                </p>
                <p className="font-bold text-[#0a68ff]">
                  {FormatNumber(book.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MySection>
  );
}
