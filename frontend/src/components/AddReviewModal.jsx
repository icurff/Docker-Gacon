import { Modal, Button, Textarea } from "flowbite-react";
import { useSubmitReviewMutation } from "../customHooks/Review/useSubmitReviewMutation";
import { useState, useEffect } from "react";
import { useBookStore } from "../customStores/useBookStore";
import { Rating, RatingStar } from "flowbite-react";

export function AddReviewModal({ show, onClose }) {
  const { book } = useBookStore();
  const { mutate: submitReview } = useSubmitReviewMutation();
  const [reviewContent, setReviewContent] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(5);

  const handleSubmit = () => {
    const reviewData = {
      bookId: book.id,
      content: reviewContent,
      rating: userRating,
    };
    submitReview(reviewData);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setReviewContent("");
    setUserRating(5);
    setHoverRating(0);
  };

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  useEffect(() => {
    if (!show) {
      resetForm(); // Reset form when modal closes
    }
  }, [show]);

  return (
    <Modal show={show} popup onClose={onClose}>
      <Modal.Header>Add Book Review</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-center">
            <Rating size="md">
              {[1, 2, 3, 4, 5].map((star) => (
                <RatingStar
                  key={star}
                  filled={hoverRating >= star || userRating >= star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(userRating)}
                  onClick={() => handleRatingChange(star)}
                />
              ))}
            </Rating>
          </div>

          <Textarea
            id="comment"
            placeholder="Leave a review..."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            rows={6}
          />
          <div className="mt-3 flex justify-end">
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={!reviewContent}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
