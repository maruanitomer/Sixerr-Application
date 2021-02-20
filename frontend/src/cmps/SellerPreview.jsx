


export function SellerPreview({ gig, seller, getStars, getBiggestStarRate, calculateAvgHalfRating }) {


    const createStarsArey = () => {
        var starsArr = []
        for (var i = 0; i < biggestStarRtae; i++) {
            starsArr.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>)
        }
        return starsArr
    }


    const biggestStarRtae = getBiggestStarRate()
    const starsArr = createStarsArey()

    return (
        <>
            <section id="about-seller" className="about-seller-container flex column">
                <h2>About The Seller</h2>
                <div className="content flex">
                    <div className="seller-img-container">
                        <img src={seller.imgUrl} alt="" />
                    </div>
                    <div className="content flex column">
                        <span className="seller-fullname">{seller.fullname}</span>
                        <div className="stars-container flex  align center">
                            {starsArr.map((star) => {
                                return star
                            })}
                            <span>{biggestStarRtae} ({gig.reviews.length})</span>
                        </div>
                        <button>Contact Me</button>
                    </div>
                </div>
            </section>
            <section className="seller-stats flex column">
                <div className="user-stats flex">
                    <div className="flex column">
                        <span>From</span>
                        <span className="bold">United States</span>
                        <span>Avg. response time</span>
                        <span className="bold">3 hours</span>
                    </div>
                    <div className="flex column">
                        <span >Member since</span>
                        <span className="bold">Aug 2020</span>
                        <span>Last deilivery</span>
                        <span className="bold">About 12 hours</span>
                    </div>
                </div>
                {/* <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nihil. Temporibus quidem aperiam voluptates aliquid nostrum, ratione laboriosam commodi culpa eligendi? Autem cum corporis quia asperiores deleniti maiores consequuntur expedita?</p>
                </div> */}
            </section>
        </>
    )
}
