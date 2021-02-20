
import { ReviewPreview } from './ReviewPreview.jsx'

export default function ReviewList({ gig, user, onToggleHelfull, isHelful}) {
    const reviews = gig.reviews
    return (
        <>
            <section id="reviews" className="gig-review-list flex column">
                {reviews.map(review => <ReviewPreview key={review.id} review={review} user={user} onToggleHelfull={onToggleHelfull} isHelful={isHelful} ></ReviewPreview>)}
            </section>
        </>
    )
}
