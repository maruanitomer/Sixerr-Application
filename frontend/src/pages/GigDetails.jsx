import React from 'react'
import { connect } from 'react-redux'
import { GigAddReview } from '../cmps/GigAddReview.jsx'
import { SellerPreview } from '../cmps/SellerPreview'
import { addGig, loadGig, updateGig, removeGig, loadGigs, setFilter } from '../store/actions/gigActions'
import { orderGig } from '../store/actions/orderActions'
import StarRateIcon from '@material-ui/icons/StarRate'
import SideBar from '../cmps/SideBar.jsx'
import ReviewList from '../cmps/ReviewList.jsx'
import { GigImgLightBox } from '../cmps/GigImgLightBox'
import { EditableElement } from '../cmps/EditableElement.jsx'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { SellerOverview } from '../cmps/SellerOverview'
import { ReviewStats } from '../cmps/ReviewStats.jsx'
import { ShortReviewList } from '../cmps/ShortReviewList.jsx'
import { ImgGallery } from '../cmps/ImgGallery.jsx'
import { CarouselImgs } from '../cmps/Carousel.jsx'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { socketService } from '../services/socketService.js'
import RichTextEditor from '../cmps/RichTextEditor.jsx'
import Loader from 'react-loader-spinner'
import { GigStrip } from '../cmps/GigStrip.jsx';
import { updateUser } from "../store/actions/userActions.js";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



class _GigDetails extends React.Component {

    state = {
        gig: null,
        isGigOwner: true,
        isTitleEditble: false,
        isDescEditble: false,
        numImgChoosen: 0,
        isLightBoxOpen: false,
        currImg: "",
        currShortReviewIdx: 0,
        shortReviewSize: 39.4189375,
        isFullSizeScreen: true,
        htmlDesc: '',
        suggestedGigs: [],
        mobileStarStats: false,
        isHelful: false,
    }

    async componentDidMount() {
        const gigId = this.props.match.params.gigId
        const gig = await loadGig(gigId)
        this.props.loadGigs()
        const { numImgChoosen } = this.state
        const currImg = gig.imgUrls[numImgChoosen]
        if (currImg) this.setState({ gig, currImg })
        this.onSetSizes()
        this.setState({ gig })
    }

    onSetSizes = () => {
        let isFullSizeScreen = true;
        let shortReviewSize;
        let mobileStarStats = false;
        const windowWitdh = window.innerWidth
        if (windowWitdh > 1200) shortReviewSize = 33.4375;
        if (windowWitdh < 1040 && windowWitdh >= 860) shortReviewSize = 33.4375
        if (windowWitdh < 860) shortReviewSize = 30
        if (windowWitdh <= 860) isFullSizeScreen = false
        if (windowWitdh <= 700) { } mobileStarStats = true;
        if (windowWitdh <= 945 && windowWitdh > 900) shortReviewSize = 29.2375
        this.setState({ shortReviewSize, isFullSizeScreen, mobileStarStats })
    }

    onToggleImgLightbox = () => {
        const { isLightBoxOpen } = this.state
        const { numImgChoosen } = this.state
        const currImg = this.state.gig.imgUrls[numImgChoosen]
        this.setState({ isLightBoxOpen: !isLightBoxOpen, currImg })
    }

    toggleIsTitleEditble = (isTitleEditble) => {
        isTitleEditble = !isTitleEditble
        this.setState({ isTitleEditble })
    }

    toggleIsDescEditble = (isDescEditble) => {
        // isDescEditble = !isDescEditble
        isDescEditble = !this.state.isDescEditble
        this.setState({ isDescEditble })
    }

    onEdit = (ev) => {
        ev.preventDefault()
        const { isTitleEditble, isDescEditble } = this.state
        if (isTitleEditble) this.toggleIsTitleEditble(isTitleEditble)
        if (isDescEditble) this.toggleIsDescEditble(isDescEditble)
        const { gig } = this.state
        this.props.addGig(gig).then(() => {
            console.log('adeed sucessfully');
        })
    }

    onChooseImg = (imgIdx) => {
        this.setState({ numImgChoosen: imgIdx })
    }

    onNextShortReview = () => {
        let { currShortReviewIdx } = this.state
        const { reviews } = this.state.gig
        if (currShortReviewIdx === 0) currShortReviewIdx = -reviews.length
        currShortReviewIdx++
        this.setState({ currShortReviewIdx })
    }

    onPrevShortReview = () => {
        let { currShortReviewIdx } = this.state
        const { reviews } = this.state.gig
        if (currShortReviewIdx === -(reviews.length - 1)) currShortReviewIdx = 1
        currShortReviewIdx--
        this.setState({ currShortReviewIdx })
    }

    onNextPageLightBox = (ev) => {
        ev.stopPropagation()
        let { numImgChoosen } = this.state
        const { gig } = this.state
        numImgChoosen++
        if (numImgChoosen === gig.imgUrls.length) numImgChoosen = 0
        const currImg = gig.imgUrls[numImgChoosen]
        this.setState({ numImgChoosen, currImg })
    }

    onPrevPageLightBox = (ev) => {
        ev.stopPropagation()
        let { numImgChoosen } = this.state
        const { gig } = this.state
        numImgChoosen--
        if (numImgChoosen === -1) numImgChoosen = gig.imgUrls.length - 1
        const currImg = gig.imgUrls[numImgChoosen]
        this.setState({ numImgChoosen, currImg })
    }

    getAvgRate = () => {
        if (!this.state.gig) return
        const { reviews } = this.state.gig
        const sumRate = reviews.reduce((acc, review) => {
            return acc += review.rating
        }, 0)
        let avg = Math.floor(sumRate / reviews.length)
        let stars = []
        if (avg > 5) avg = 5
        for (var i = 0; i < avg; i++) {
            stars.push(<StarRateIcon key={`${i}`} className="seller-star" ></StarRateIcon>)
        }
        return stars
    }

    onSave = (field, value) => {
        const gig = { ...this.state.gig }
        gig[field] = value
        this.props.updateGig(gig).then(() => {
            console.log('updated successfuuly');
        })
    }


    onRemoveGig = () => {
        const { gig } = this.state
        this.props.removeGig(gig._id).then(() => {
            this.props.history.push('/gig');
            console.log('remove succefully');
        })
    }

    onUserViewGig = (gigId) => {
        const user = { ...this.props.user }
        if (user.viewedGigIds) {
            if (!user.viewedGigIds.find(viewedGigId => viewedGigId === gigId)) user.viewedGigIds.push(gigId)
        } else user.viewedGigIds = [gigId]
        this.props.updateUser(user)
    }

    onFavoriteToggle = (ev, gigId) => {
        ev.stopPropagation()
        const user = { ...this.props.user }
        if (user.favoriteIds) {
            if (user.favoriteIds.find(favoriteId => favoriteId === gigId)) user.favoriteIds = user.favoriteIds.filter(favoriteId => favoriteId !== gigId)
            else user.favoriteIds.push(gigId)
        } else user.favoriteIds = [gigId]
        this.props.updateUser(user)
    }
    onSaveHtml = (htmlDesc) => {
        this.setState({ htmlDesc })
        this.toggleIsDescEditble()
    }

    onToggleHelfull = () => {
        let { isHelful } = this.state
        this.setState({ isHelful: !isHelful })
    }

    getStars = () => {
        const { gig } = this.state
        const { reviews } = gig
        let totalStarsRate = 0, fiveStarCount = 0, fourStarCount = 0, threeStarCount = 0, twoStarCount = 0, oneStarCount = 0
        reviews.map((review) => {
            var rating = parseFloat(review.rating)
            if (!rating) rating = 0
            if (rating > 4 && rating <= 5) fiveStarCount++
            if (rating <= 4 && rating > 3) fourStarCount++
            if (rating <= 3 && rating > 2) threeStarCount++
            if (rating <= 2 && rating > 1) twoStarCount++
            if (rating <= 1 && rating >= 0) oneStarCount++
            return totalStarsRate += rating
        })
        totalStarsRate = totalStarsRate / gig.reviews.length
        const avgRate = { oneStarCount, twoStarCount, threeStarCount, fourStarCount, fiveStarCount, totalStarsRate }
        return avgRate
    }

    calculateAvgHalfRating = () => {
        const avgRate = this.getStars()
        let totalStarsRate = avgRate.totalStarsRate
        if (totalStarsRate <= 5 && totalStarsRate >= 4.5) totalStarsRate = 5
        if (totalStarsRate < 4.5 && totalStarsRate >= 4) totalStarsRate = 4.5
        if (totalStarsRate < 4 && totalStarsRate >= 3.5) totalStarsRate = 4
        if (totalStarsRate < 3.5 && totalStarsRate >= 3) totalStarsRate = 3.5
        if (totalStarsRate < 3 && totalStarsRate >= 2.5) totalStarsRate = 3
        if (totalStarsRate < 2.5 && totalStarsRate >= 2) totalStarsRate = 2.5
        if (totalStarsRate < 2 && totalStarsRate >= 1.5) totalStarsRate = 2
        if (totalStarsRate < 1.5 && totalStarsRate >= 1) totalStarsRate = 1.5
        if (totalStarsRate < 1 && totalStarsRate >= 0.5) totalStarsRate = 1
        if (totalStarsRate < 0.5 && totalStarsRate >= 0) totalStarsRate = 0.5
        if (totalStarsRate < 0) return ''
        return totalStarsRate
    }
    getBiggestStarRate = () => {
        const avgRate = this.getStars()
        const oneStarPercentage = avgRate.oneStarCount
        const twoStarPercentage = avgRate.twoStarCount
        const threeStarPercentage = avgRate.threeStarCount
        const fourStarPercentage = avgRate.fourStarCount
        const fiveStarPercentage = avgRate.fiveStarCount
        const maxRateStarNumber = Math.max(oneStarPercentage, twoStarPercentage, threeStarPercentage, fourStarPercentage, fiveStarPercentage)
        if (maxRateStarNumber === fiveStarPercentage) return 5
        if (maxRateStarNumber === fourStarPercentage) return 4
        if (maxRateStarNumber === threeStarPercentage) return 3
        if (maxRateStarNumber === twoStarPercentage) return 2
        if (maxRateStarNumber === oneStarPercentage) return 1
        return -1
    }




    render() {
        const { gig, numImgChoosen, isTitleEditble, isGigOwner, isDescEditble, isLightBoxOpen, isFullSizeScreen, shortReviewSize, isHelful } = this.state
        const { user } = this.props
        const { currImg } = this.state
        const htmlStars = this.getAvgRate()
        if (!gig) return <Loader className="flex justify-center" type="ThreeDots" height={80} width={80} color={`#2bbe76`} />
        return (
            <>
                {isLightBoxOpen && <GigImgLightBox gig={gig} onToggleImgLightbox={this.onToggleImgLightbox} currImg={currImg} onNextPageLightBox={this.onNextPageLightBox} onPrevPageLightBox={this.onPrevPageLightBox} />}
                <section className="details-wrapper main-container">
                    {/* <div className="details-wrapper main-layout"> */}
                    <div className="gig-details">
                        <div className="main-details">
                            <EditableElement field={'title'} type={'h1'} text={gig.title} save={this.onSave} editable={isTitleEditble} />
                            {isTitleEditble && <button onClick={this.onEdit}>Save</button>}
                            <SellerOverview gig={gig} htmlStars={htmlStars} getBiggestStarRate={this.getBiggestStarRate} calculateAvgHalfRating={this.calculateAvgHalfRating} getStars={this.getStars} />
                            {!isFullSizeScreen && <div className="carousle-container" >
                                <CarouselImgs imgUrls={gig.imgUrls} />
                            </div>}
                            {isFullSizeScreen && <ImgGallery gig={gig} numImgChoosen={numImgChoosen} onChooseImg={this.onChooseImg} onToggleImgLightbox={this.onToggleImgLightbox} />}
                            <div className="responsive-side-bar-container">
                                {!isFullSizeScreen && <SideBar gig={gig} onGigOrder={this.onGigOrder} />}
                            </div>
                            <div className="short-review-header flex space-between">
                                <h2 >What people loved about this seller</h2>
                                <AnchorLink href='#reviews'>See all reviews</AnchorLink>
                            </div>
                            {gig.reviews && <div className="short-review-main">
                                <ShortReviewList shortReviewSize={shortReviewSize} currShortReviewIdx={this.state.currShortReviewIdx} gig={gig} reviews={gig.reviews} />
                                {gig.reviews.length > 1 && <ChevronLeftIcon className="slide-left-review" onClick={() => this.onNextShortReview()} />}
                                {gig.reviews.length > 1 && <ChevronRightIcon className="slide-right-review" onClick={() => this.onPrevShortReview()} />}
                            </div>}
                            <div id="description" className="desc">
                                <h2>About This Gig</h2>
                                <div className="about flex">

                                    {isGigOwner && <EditableElement dangerouslySetInnerHTML={{ __html: `${this.state.htmlDesc}` }} className="gig-desc" field={'desc'} type={'h4'} text={gig.desc} save={this.onSave} editable={isDescEditble} />}
                                    {!isDescEditble && <div dangerouslySetInnerHTML={{ __html: `${this.state.htmlDesc}` }}>
                                    </div>}
                                    {isDescEditble &&
                                        <RichTextEditor desc={'<h1>tomer<h1>'} onSaveHtml={this.onSaveHtml} />
                                    }
                                </div>
                                {/* {!isDescEditble && < button onClick={this.toggleIsDescEditble}>edit</button>} */}
                            </div>
                            <SellerPreview seller={gig.owner} gig={gig} getBiggestStarRate={this.getBiggestStarRate} calculateAvgHalfRating={this.calculateAvgHalfRating} getStars={this.getStars} />
                            <div>
                                <div className="suggestd-list-wrapper ">
                                    <GigStrip title={'Suggested For You'}
                                        className="suggested-strip-scroll-list"
                                        gigs={this.props.gigs}
                                        onUserViewGig={this.onUserViewGig}
                                        onFavoriteToggle={this.onFavoriteToggle}
                                        user={this.props.user}
                                        onDelete={this.onDelete} />
                                </div>
                            </div>
                            <ReviewStats gig={gig} htmlStars={htmlStars} getBiggestStarRate={this.getBiggestStarRate} calculateAvgHalfRating={this.calculateAvgHalfRating} getStars={this.getStars} />
                            {user && <GigAddReview gig={gig} user={user} onAddReview={this.onAddReview} mobileStarStats={this.state.mobileStarStats} />}
                            <div className="review-list-wrapper">
                                <ReviewList gig={gig} user={user} onToggleHelfull={this.onToggleHelfull} isHelful={isHelful} />
                            </div>
                        </div>
                        {isFullSizeScreen && <SideBar gig={gig} onGigOrder={this.onGigOrder} />}
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
    removeGig,
    orderGig,
    setFilter,
    updateUser,
    loadGigs

}

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)


