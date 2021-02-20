import { GigMiniPreview } from "./GigMiniPreview"
import { GigPreview } from "./GigPreview"

export function GigList({ gigs, onUserViewGig, onFavoriteToggle, user, removeViewed, isSmallPreview }) {

    return (
        <section className="gig-list">
            <ul className="previews-wrap clean-list">
                {isSmallPreview &&
                     gigs.map(gig => <GigMiniPreview key={gig._id} gig={gig}></GigMiniPreview>) }
                {!isSmallPreview &&
                    gigs.map(gig => <GigPreview key={gig._id} gig={gig} onUserViewGig={onUserViewGig} onFavoriteToggle={onFavoriteToggle} user={user} removeViewed={removeViewed}></GigPreview>)}
            </ul>
        </section>
    )
}