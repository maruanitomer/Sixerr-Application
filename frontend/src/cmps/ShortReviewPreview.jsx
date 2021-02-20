import Avatar from '@material-ui/core/Avatar';
import {
    IconFlagUS,
}
    from 'material-ui-flags';

export function ShortReviewPreview({ reviews, idx }) {

    if (!reviews[idx].by) return <div></div>
    return (
        <>
            <div className="short-content">
                <div className="content-wrapper flex">
                    <div className="avatar-container">
                        <Avatar src={reviews[idx].by.imgUrl} />
                    </div>
                    <div className="content flex align-center">
                        <h6>{reviews[idx].by.fullname}</h6>
                        <IconFlagUS className="country-icon" />
                        <span className="country-name">united states</span>
                        <svg className="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                        <span className="rating">{reviews[idx].rating}</span>
                    </div>
                </div>
                <p >{reviews[idx].txt}</p>
            </div>
        </>
    )
}


    