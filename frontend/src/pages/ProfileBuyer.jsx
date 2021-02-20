import React from 'react';
import { connect } from 'react-redux'

import { updateUser, onImageChange } from "../store/actions/userActions.js";
import { loadGigs, getGigs } from "../store/actions/gigActions.js";
import { loadOrders, updateOrder } from "../store/actions/orderActions.js";
import { GigList } from '../cmps/GigList.jsx';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { OrderList } from '../cmps/OrderList.jsx';
import { socketService } from '../services/socketService.js';
import { ProfileCharts } from '../cmps/ProfileCharts.jsx';

const SIXERR_GREEN = 'rgb(43, 190, 118)'
class _Profile extends React.Component {

    state = {
        from: 'IL',
        memberSince: '2021',
        lastViewed: [],
        myGigs: [],
        // suggestedGigs: [],
        // favoriteGigs: [],
        // ordersAsBuyer: [],
        ordersAsSeller: [],
    }

    async componentDidMount() {
        const { user } = this.props

        socketService.on('order received', this.onNewOrder)
        // const gigList = user.viewedGigIds ? user.viewedGigIds : []
        // user.favoriteIds?.forEach(favId => { if (!gigList.find(id => id === favId)) gigList.push(favId) })
        // await this.props.loadGigs({ owner: user._id, gigList })
        // console.log('GIGS', this.props.gigs)
        await this.props.loadGigs() // TODO: CHANGE all waits to first go and then get all at the end....
        await this.props.loadOrders()
        // const ordersAsBuyer = this.props.orders.filter(order => order.buyer._id === user._id)
        const ordersAsSeller = this.props.orders.filter(order => user.myGigIds?.some(gigId => gigId === order.gig._id))
        const myGigs = user.myGigIds ? await getGigs(user.myGigIds) : []

        const lastViewed = user.viewedGigIds ? await getGigs(user.viewedGigIds) : []
        const favoriteGigs = user.favoriteIds ? await getGigs(user.favoriteIds) : []
        this.setState(prevState =>
        ({
            ...prevState,
            myGigs,
            suggestedGigs: this.props.gigs.filter((gig, idx) => !(idx % 3)),
            lastViewed,
            favoriteGigs,
            ordersAsBuyer,
            ordersAsSeller
        }))
    }

    componentWillUnmount() {
        socketService.off('order received', this.onNewOrder)
        // clearTimeout(this.timeout)
    }

    onNewOrder = async (newMsg) => {
        const { user } = this.props
        // TODO: INTERNAL FUNCTION FOR LOADING ORDERS
        await this.props.loadOrders()
        const ordersAsBuyer = this.props.orders.filter(order => order.buyer._id === user._id)
        const ordersAsSeller = this.props.orders.filter(order => user.myGigIds?.find(gigId => gigId === order.gig._id))
        this.setState(prevState =>
        ({
            ...prevState,
            ordersAsBuyer,
            ordersAsSeller
        }))
        const msg = 'thank you'
        console.log('NEWWWWWW', newMsg)
        socketService.emit('chat newMsg', { to: newMsg.from._id, from: user, txt: msg })
    }

    handleInput = ({ target }) => {
        const value = target.innerText
        this.setState(prevState => ({ ...prevState, fullname: value }))
    }

    onUploadImg = (ev) => {
        this.props.onImageChange(ev)
    }

    onSave = (field, value) => {
        const user = { ...this.props.user }
        user[field] = value
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

    onRemoveViewed = (gigId) => {
        const user = { ...this.props.user }
        user.viewedGigIds = user.viewedGigIds.filter(viewedGigId => viewedGigId !== gigId)
        this.props.updateUser(user)
        const lastViewed = this.state.lastViewed.filter(gig => gig._id !== gigId)
        this.setState({ lastViewed })
    }

    onOrderStatusChanged = (order) => {
        this.props.updateOrder(order)
    }
    setStatus = (status) => {

    }

    get sellerTotalIncome() {
        const { ordersAsSeller } = this.state
        return ordersAsSeller.reduce((acc, order) => acc + order.totalPrice, 0)
    }

    render() {
        const { chart, from, memberSince, lastViewed, suggestedGigs, favoriteGigs, myGigs, ordersAsBuyer, ordersAsSeller } = this.state
        const totalIncome = this.sellerTotalIncome

        const { user } = this.props
        if (!user) return <div>Loading...</div>
        return (
            <section className="profile main-container mrg-top">
                <div className="top-section">
                    <div className="about-user flex column">
                        <label className="img-upload pointer" htmlFor="uploadImg">
                            <img src={user.imgUrl} />
                            <input onChange={this.onUploadImg} type="file" id="uploadImg" hidden />
                            <PhotoCameraIcon className="camera-icon" />
                        </label>
                        {/* <EditableElement field={'fullname'} save={this.onSave} type={'h1'} text={user.fullname} /> */}
                        <h1>{user.fullname}</h1>

                        <p>Level 2 Seller</p>
                        <p>Member since {memberSince}</p>
                        <button>Send Message</button>
                    </div>


                    {ordersAsSeller.length !== 0 && <div className="seller-orders">
                        <h1>Active Orders - <span>{ordersAsSeller.length} (${totalIncome})</span></h1>
                        <OrderList orders={ordersAsSeller} onOrderStatusChanged={this.onOrderStatusChanged} />
                    </div>}
                </div>

                <section className="chart-wrapper">
                    <ProfileCharts
                    />
                </section>
                <div className="my-gigs">
                    <h1>My Gigs</h1>
                    {myGigs.length === 0 &&
                        <div className="start-selling flex align-center">
                            <h2>You do not have any gigs yet.</h2>
                            <button onClick={() => this.props.history.push('/gig/edit')}>
                                Start Selling
                            </button>
                        </div>}
                    <GigList gigs={myGigs} onDelete={this.onDelete} onUserViewGig={() => { }} onFavoriteToggle={this.onFavoriteToggle} user={user} />
                </div>



            </section>
        )
    }
}


const mapGlobalStateToProps = (state) => {
    return {
        user: state.userModule.user,
        gigs: state.gigModule.gigs,
        orders: state.orderModule.orders
    }
}
const mapDispatchToProps = {
    onImageChange,
    updateUser,
    loadGigs,
    loadOrders,
    updateOrder
}

export const Profile = connect(mapGlobalStateToProps, mapDispatchToProps)(_Profile)


{/* {ordersAsSeller.length !== 0 && <div className="seller-orders">
                    <h1>Orders from me</h1>
                    <OrderList orders={ordersAsSeller} onOrderStatusChanged={this.onOrderStatusChanged} />
                </div>}

                {ordersAsBuyer.length !== 0 &&
                        <div className="buyer-orders">
                            <h1>My Orders</h1>
                            <OrderList orders={ordersAsBuyer} />
                        </div>}

                {lastViewed.length !== 0 &&
                    <div className="recently-viewed flex column">
                        <h1>Last viewed</h1>
                        <GigList gigs={lastViewed} onDelete={this.onDelete} onUserViewGig={() => { }} onFavoriteToggle={this.onFavoriteToggle} user={user} removeViewed={this.onRemoveViewed} />
                    </div>}
                <h1>Favorites</h1>
                <GigList gigs={favoriteGigs} onDelete={this.onDelete} onUserViewGig={() => { }} onFavoriteToggle={this.onFavoriteToggle} user={user} />
                <h1>Suggested</h1>
                <GigList gigs={suggestedGigs} onDelete={this.onDelete} onUserViewGig={() => { }} onFavoriteToggle={this.onFavoriteToggle} user={user} isSmallPreview={true} /> */}
