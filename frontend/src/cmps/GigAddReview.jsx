import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/utilService.js'
import { addGig, updateGig, loadGig } from '../store/actions/gigActions'
import { HoverRating } from '../cmps/HoverRating.jsx'


class _GigAddReview extends Component {


    state = {
        gig: null,
        user: null,
        review: '',
    }

    componentDidMount() {
        const { gig } = this.props
        const { user } = this.props
        const review = this.createReviewTemplate(gig, user)
        this.setState({ gig, user, review })
    }

    createReviewTemplate = (gig, user) => {
        const by = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
        const id = utilService.makeId()
        const review = { id, rating: '', txt: '', createdAt: null, purchasedAt: null, by }
        return review
        //gig.reviews[0].seller => gig.owner
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => {
            return {
                review: {
                    ...prevState.review,
                    [field]: value
                }
            }
        })
    }
    handleRate = (rate) => {
        const { review } = { ...this.state }
        review.rating = rate
        this.setState({ review })
    }

    onAddReview = () => {
        const { review } = this.state
        const { gig } = this.state
        let reviewToAdd = { ...review }
        // todo: add purchase date when we have data
        if(review.txt === '') return
        const purchasedAt = "purchase At"
        const date = Date.now()
        reviewToAdd.createdAt = date
        reviewToAdd.purchasedAt = purchasedAt
        gig.reviews.unshift(reviewToAdd)
        this.props.updateGig(gig).then(() => {
            this.setState({ review: null })
        })

    }

    render() {
        const { mobileStarStats } = this.props
        const { review } = this.state
        if (!review) return <div></div>
        return (
            <>
                <section className="add-review-wrapper">
                    {!mobileStarStats && <HoverRating className="stars-rate" handleRate={this.handleRate} val={review.rating} />}
                    <div className="text-area-container">
                        <textarea rows="6" cols="60" type="text" name="txt" placeholder='enter review...' value={review.txt} onChange={this.handleChange} required />
                    </div>
                    <div className="rate-mobile-view-container">
                        {mobileStarStats && <HoverRating className="stars-rate" handleRate={this.handleRate} val={review.rating} required />}
                    </div>
                    <div className="add-review-container">
                        <button className="add-review" onClick={() => this.onAddReview()}>Add Review</button>
                    </div>
                </section>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    addGig,
    updateGig,
    loadGig,
}

export const GigAddReview = connect(mapStateToProps, mapDispatchToProps)(_GigAddReview)