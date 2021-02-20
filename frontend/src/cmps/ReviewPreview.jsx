import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';



import {
    IconFlagUS,

} from 'material-ui-flags';


export function ReviewPreview({ review, user, onToggleHelfull, isHelful }) {
    if (!review || !review.by) return <div></div>
    return (
        <>
            <section className="review-card flex">
                <div>
                    <div className="avatar-container">
                        <Avatar className="avatar" src={review.by.imgUrl} />
                    </div>
                </div>
                <div className="review-info">
                    <div>
                        <div className="info flex align-center">
                            <h5>{review.by.fullname}</h5>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                            <span className="rating">{review.rating}</span>
                        </div>
                        <div className="country">
                            <IconFlagUS className="icon" />
                            <span className="country-name" >united states</span>
                        </div>
                    </div>
                    {/* todo : add country and flags */}
                    <p>{review.txt}</p>
                    <p className="published-at">Published 20 Days Ago</p>
                    <div className={`icons flex`} >
                        
                        <ThumbUpAltIcon className="helpful" onClick={() => onToggleHelfull()} />
                        <span className={`helpful-name ${isHelful ? ' liked' : ''}`}>Helpful</span>
                        <ThumbDownAltIcon className={`thumb-down ${isHelful ? ' liked' : ''}`} />
                        <span>Not Helpful</span>
                    </div>
                </div>
            </section>
        </>
    )
}
