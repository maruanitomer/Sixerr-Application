//size1 =39.4189375rem
//size2 = width: 45rem;
//size3 = 30

import { ShortReviewPreview } from './ShortReviewPreview'
export function ShortReviewList({ gig, reviews,currShortReviewIdx,shortReviewSize  }) {
    if (!gig) return <div>loading</div>
    return (
        <section className="short-review slide flex" style={{ transform: `translateX(${currShortReviewIdx * shortReviewSize}rem)`}} >
            {reviews.map((review, idx) => <ShortReviewPreview key={`${review.id}`} reviews={reviews} idx={idx} />)}
        </section>
    )
}
