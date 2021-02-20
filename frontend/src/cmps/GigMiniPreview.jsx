import { Link } from 'react-router-dom'
import ClearIcon from '@material-ui/icons/Clear';
// import Favorite from '@material-ui/icons/Favorite';

export function GigMiniPreview({ gig, onUserViewGig, onFavoriteToggle, user, removeViewed }) {
    return (
        <li onClick={() => { onUserViewGig(gig._id) }} className="mini-preview">
            <div className="preview-inner">
                {removeViewed && <ClearIcon className="clear-icon pointer" onClick={(ev) => {
                    ev.stopPropagation()
                    removeViewed(gig._id)
                }} />}

                <Link to={`/gig/${gig._id}`}>
                    <div className="preview-img">
                        <img src={gig.imgUrls[0]} alt="" />
                    </div>
                    <div className="preview-title">
                        <h6>{gig.title}</h6>
                    </div>
                </Link>
            </div>
        </li >
    )
}