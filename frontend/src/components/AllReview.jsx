import { AddReviewModal } from "../components/AddReviewModal";
import { useEffect, useState } from "react";
import { useBookStore } from "../customStores/useBookStore";
import { Rating, RatingStar } from "flowbite-react";
export function AllReview() {
  const { reviews } = useBookStore();
  const [isAddReviewModalOpen, setAddReviewModalOpen] = useState(false);
  function showAddReviewModal() {
    setAddReviewModalOpen(true);
  }

  return (
    <>
      <div className="mx-8 my-5 flex justify-center">
        <div className="w-full">
          <div className="flex flex-col rounded-xl border-2 border-black bg-white p-5 dark:bg-zinc-800">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-bold">Reviews</h1>
              <button
                className="rounded-xl bg-[#0A68FF] p-1 font-bold text-white"
                onClick={showAddReviewModal}
              >
                <span className="p-2">Submit Review </span>
              </button>
            </div>

            <hr className="my-5 h-px border-0 bg-black"></hr>

            {reviews.map((review, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="my-3 flex flex-row">
                  <div className="flex items-center">
                    <img
                      src={review.userAvatar}
                      alt="avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-2 flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-bold">{review.userEmail}</span>
                        <Rating className="ml-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <RatingStar
                              key={star}
                              filled={review?.rating >= star}
                            />
                          ))}
                        </Rating>
                      </div>

                      <span className="my-1">{review.content}</span>
                      <span className="text-xs text-gray-500">
                        {review.created_at}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add Review Modal */}
      <AddReviewModal
        show={isAddReviewModalOpen}
        onClose={() => setAddReviewModalOpen(false)}
      />
    </>
  );
}
