// import StarRateIcon from '@material-ui/icons/StarRate';
// import StarHalfIcon from '@material-ui/icons/StarHalf';


export function ReviewStats({ htmlStars, gig, getStars, getBiggestStarRate, calculateAvgHalfRating }) {

    const avgRate = getStars()
    const oneStarPercentage = avgRate.oneStarCount / gig.reviews.length*100
    const twoStarPercentage = avgRate.twoStarCount / gig.reviews.length*100
    const threeStarPercentage = avgRate.threeStarCount / gig.reviews.length*100
    const fourStarPercentage = avgRate.fourStarCount / gig.reviews.length*100
    const fiveStarPercentage = avgRate.fiveStarCount / gig.reviews.length*100
    const biggestStarRtae = getBiggestStarRate()

    const createStarsAreey = () => {
        var starsArr = []
        for (var i = 0; i < biggestStarRtae; i++) {
            starsArr.push(<svg key={i * 10} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>)
        }
        return starsArr
    }
    const starsArr = createStarsAreey()

    return (
        <>
            <div className="review-stats-header flex">
                <h2>{gig.reviews.length} Reviews</h2>
                <div className="stars-container">
                    {starsArr.map((star) => {
                        return star
                    })}
                    <span>{starsArr.length}</span>
                </div>
            </div>
            <section className="review-stats-container " >
                <div className="left-side-stats">
                    <div className="progressses-ctonainer">
                        <span className={`${avgRate.fiveStarCount === 0 ? ' less-visability' : ''}`}>5 Stars</span>
                        <div className="progress-bar-container">
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${fiveStarPercentage}%` }} >
                            </div>
                        </div>
                        <p className={`${avgRate.fiveStarCount === 0 ? ' less-visability' : ''}${biggestStarRtae === 5 ? ' bold' : ''}`}>{avgRate.fiveStarCount}</p>
                    </div>
                    <div className="progressses-ctonainer">
                        <span className={`${avgRate.fourStarCount === 0 ? ' less-visability' : ''}`}>4 Stars</span>
                        <div className="progress-bar-container">
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${fourStarPercentage}%` }} >
                            </div>
                        </div>
                        <p className={`${avgRate.fourStarCount === 0 ? ' less-visability' : ''}${biggestStarRtae === 4 ? ' bold' : ''}`}>{avgRate.fourStarCount}</p>
                    </div>
                    <div className="progressses-ctonainer">
                        <span className={`${avgRate.threeStarCount === 0 ? ' less-visability' : ''}`}>3 Stars</span>
                        <div className={`progress-bar-container ${avgRate.threeStarCount === 0 ? ' less-visability' : ''}`}>
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${threeStarPercentage}%` }} >
                            </div>
                        </div>
                        <p className={`${avgRate.threeStarCount === 0 ? ' less-visability' : ''}${biggestStarRtae === 3 ? ' bold' : ''}`}>{avgRate.threeStarCount}</p>
                    </div>
                    <div className="progressses-ctonainer">
                        <span className={`${avgRate.twoStarCount === 0 ? ' less-visability' : ''}`}>2 Stars</span>
                        <div className={`progress-bar-container ${avgRate.twoStarCount === 0 ? ' less-visability' : ''}`}>
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${twoStarPercentage}%` }} >
                            </div>
                        </div>
                        <p className={`${avgRate.twoStarCount === 0 ? ' less-visability' : ''}${biggestStarRtae === 2 ? ' bold' : ''}`}>{avgRate.twoStarCount}</p>
                    </div>
                    <div className="progressses-ctonainer">
                        <span className={`${avgRate.oneStarCount === 0 ? ' less-visability' : ''}`}>1 Stars</span>
                        <div className="progress-bar-container">
                            <div className="fit-progressbar-background" style={{ backgroundColor: 'orange', width: `${oneStarPercentage}%` }} >
                            </div>
                        </div>
                        <p className={`${avgRate.oneStarCount === 0 ? ' less-visability' : ''}${biggestStarRtae === 1 ? ' bold' : ''}`}>{avgRate.oneStarCount}</p>
                    </div>
                </div>
                <div className="right-side-stats">
                    <div>
                        <h6>Rating Breakdown</h6>
                    </div>
                    <div className="overview-content">
                        <span>Seller communication level</span>
                    </div>
                    <div className="overview-content">
                        <span>Recommend to a friend</span>
                    </div  >
                    <div className=" overview-content flex space-between">
                        <span>Service as described</span>
                    </div>
                </div>
                <div className="stars flex column">
                    <div>
                        <span>{calculateAvgHalfRating()}</span>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                        </div>
                    </div>
                    <div>
                        <span>{calculateAvgHalfRating()}</span>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                        </div>
                    </div>
                    <div >
                        <span >{calculateAvgHalfRating()}</span>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}