import { Camper } from "@/types/camper";

type ReviewsProps = {
  camper: Camper;
};

export default function Reviews({ camper }: ReviewsProps) {
  if (!camper || !camper.reviews) return null;

  return (
    <div className="max-w-[631px] py-3">
      {/* Reviews list */}
      <div className="flex flex-col gap-10">
        {camper.reviews.map((review) => (
          <div key={review.reviewer_name}>
            {/* Name + stars */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-15 h-15 rounded-full bg-(--badges) flex items-center justify-center font-semibold text-[24px] leading-[1.33] text-(--button)">
                {review.reviewer_name[0]}
              </div>

              <div>
                <p className="font-medium text-[16px] leading-normal mb-1">
                  {review.reviewer_name}
                </p>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.reviewer_rating
                          ? "fill-yellow-400"
                          : "fill-(--gray-light)"
                      }`}
                    >
                      <use href="/icons.svg#icon-star" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="font-normal text-[16px] leading-normal text-(--text)">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
