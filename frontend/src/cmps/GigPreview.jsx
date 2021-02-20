import { Link } from 'react-router-dom'
import Favorite from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';

export function GigPreview({ gig, onUserViewGig, onFavoriteToggle, user, removeViewed }) {
    return (
        <li onClick={() => { onUserViewGig(gig._id) }} className="preview-item">
            <div className="preview-inner">
                {removeViewed && <ClearIcon className="clear-icon pointer" onClick={(ev) => {
                    ev.stopPropagation()
                    removeViewed(gig._id)
                }} />}

                <Link to={`/gig/${gig._id}`}>
                    <div className="preview-img">
                        <img src={gig.imgUrls[0]} alt="gig preview" />
                    </div>
                </Link>
                <Link to="#">
                    <div className="gig-owner flex">
                        <img src={gig.owner.imgUrl} alt="gig owner"/>
                        <div className="gig-owner-text flex">
                            <p>{gig.owner.fullname}</p>
                            <p>Level {_getRandomSellerRating()} seller</p>
                        </div>
                    </div>
                </Link>
                <Link to={`/gig/${gig._id}`}>
                    <div className="preview-title">
                        <h2>{gig.title}</h2>
                    </div>
                    <div className="gig-rating flex align-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                        <span>{_getRandomRating()}</span>
                        <span className="gig-voters">({_getRandomVotesCount()})</span>
                    </div>
                </Link>
                <div className="preview-bottom flex space-between">
                    <Favorite onClick={(ev) => { onFavoriteToggle(ev, gig._id) }} className={`heart pointer ${_isLiked(user?.favoriteIds, gig._id)}`} />
                    {/* {removeViewed && <button onClick={() => { removeViewed(gig._id) }}>delete viewed</button>} */}
                    <h3>Starting at <span>${gig.packages[0].price}</span></h3>
                </div>
            </div>
        </li >
    )
}

function _getRandomRating() {
    return Math.round(Math.random() * 12 + 38) / 10
}

function _getRandomSellerRating() {
    return Math.round(Math.random() * 2 + 1)
}

function _getRandomVotesCount() {
    return Math.round(Math.random() * 230 + 30)
}

function _isLiked(favoriteIds, gigId) {
    if (!favoriteIds) return ''
    return favoriteIds.find(favoriteId => favoriteId === gigId) ? 'liked' : ''
}