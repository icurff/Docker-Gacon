import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { MyNavbar } from "../components/MyNavbar";
import { MyFooter } from "../components/MyFooter";
import { Rating, RatingStar } from "flowbite-react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { FormatNumber } from "../utils/FormatNumber";
import { BookPanel } from "../components/BookPanel";
import { AllReview } from "../components/AllReview";
import { useBookStore } from "../customStores/useBookStore";
import { useFetchSpecificBook } from "../customHooks/Book/useFetchSpecificBook";
import { useFetchRelevantBooks } from "../customHooks/Book/useFetchRelevantBooks";
import { useAddBookToCartMutation } from "../customHooks/Cart/useAddBookToCartMutation";
import { useFetchBookRatings } from "../customHooks/Rating/useFetchBookRatings";
import { useFetchBookReviews } from "../customHooks/Review/useFetchBookReviews";

export function BookPage() {
  const { bookId } = useParams();
  const {
    book,
    setBook,
    relevantBooks,
    setRelevantBooks,
    ratingData,
    setRatingData,
    reviews,
    setReviews,
    quantity,
    setQuantity,
    incrementQuantity,
    decrementQuantity,
  } = useBookStore();

  const { data: fetchedBook } = useFetchSpecificBook(bookId);
  const { data: fetchedRelevantBooks } = useFetchRelevantBooks(bookId);
  const { data: fetchedRatingData } = useFetchBookRatings(bookId);
  const { data: fetchedReviews } = useFetchBookReviews(bookId);
  const { mutate: addBookToCart } = useAddBookToCartMutation();

  useEffect(() => {
    if (fetchedBook) setBook(fetchedBook);
    if (fetchedRelevantBooks) setRelevantBooks(fetchedRelevantBooks);
    if (fetchedRatingData) setRatingData(fetchedRatingData);
    if (fetchedReviews) setReviews(fetchedReviews?.reviews ?? []);
  }, [
    fetchedBook,
    fetchedRelevantBooks,
    fetchedRatingData,
    fetchedReviews,
    bookId,
  ]);

  function handleAddToCart() {
    const bookData = {
      bookId: book.id,
      quantity,
    };
    addBookToCart(bookData);
  }

  return (
    <>
      <MyNavbar />
      <div className="mx-8 my-5 flex justify-center">
        <div className="w-full">
          <div className="flex flex-col justify-center gap-5 lg:flex-row">
            <div className="lg:w-1/3">
              <div className="flex items-center justify-center rounded-xl border-2 border-black lg:sticky lg:top-5 dark:border-zinc-800">
                <div className="flex w-full flex-col p-5">
                  <div className="flex justify-center">
                    <img
                      src={book?.thumbnail}
                      alt={book?.title || "Book thumbnail"}
                      className="h-64 w-56 object-cover"
                    />
                  </div>
                  <h2 className="pt-3 text-2xl font-bold text-[#0A68FF]">
                    {FormatNumber(book?.price || 0)}
                  </h2>
                  <div className="flex flex-row">
                    <Rating size="md">
                      <RatingStar filled />
                    </Rating>
                    <span className="text-nowrap text-xl">
                      {parseFloat(ratingData?.average_rating || 0).toFixed(1)} /
                      5.0 ({ratingData?.total_ratings || 0} ratings)
                    </span>
                    {book?.availability ? (
                      <div className="ml-4 flex h-8 w-24 items-center justify-center rounded-full border-2 border-[#70b89c] text-[#70b89c]">
                        <span>Available</span>
                      </div>
                    ) : (
                      <div className="ml-4 flex h-8 w-24 items-center justify-center rounded-full border-2 border-[#c56f6f] text-[#c56f6f]">
                        <span>Out Stock</span>
                      </div>
                    )}
                  </div>
                  {/* Quantity */}
                  <div className="flex items-center justify-between pt-2">
                    <span>Quantity: </span>
                    <div className="relative flex max-w-[8rem] items-center">
                      <button
                        type="button"
                        className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        onClick={decrementQuantity}
                      >
                        <HiMinus className="h-5 w-5" />
                      </button>
                      <span className="block h-11 w-full border border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        onClick={incrementQuantity}
                      >
                        <HiPlus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {/* Add to Cart */}
                  <div className="flex pt-3">
                    <button
                      className={`w-full rounded-lg p-1 text-2xl font-bold text-white ${
                        book?.availability
                          ? "bg-[#0A68FF]"
                          : "cursor-not-allowed bg-gray-400"
                      }`}
                      onClick={handleAddToCart}
                      disabled={!book?.availability}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 lg:w-2/3">
              <div className="rounded-xl border-2 border-black dark:border-zinc-800">
                <div className="p-5">
                  <h1 className="text-5xl font-bold">{book?.title}</h1>
                  <p>Author: {book?.author}</p>
                  <p>Publisher: {book?.publisher}</p>
                  <p>Pages: {book?.pages}</p>
                  <p>Language: {book?.language}</p>
                  <p>Category: {book?.category}</p>
                </div>
              </div>
              <div className="rounded-xl border-2 border-black dark:border-zinc-800">
                <div className="p-5">
                  <h1 className="text-3xl font-bold">Description</h1>
                  <p>{book?.description || "Description not available."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {reviews && <AllReview />}
      {relevantBooks && relevantBooks.length > 0 && (
        <BookPanel
          title="Relevant Books"
          books={relevantBooks}
          viewMore={`/search?category=${book?.category}`}
        />
      )}
      <MyFooter />
    </>
  );
}
