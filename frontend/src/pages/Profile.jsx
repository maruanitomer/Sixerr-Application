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
        ordersAsSeller: [],
    }

    async componentDidMount() {
        const { user } = this.props

        socketService.on('order received', this.onNewOrder)
        await this.props.loadGigs() // TODO: CHANGE all waits to first go and then get all at the end....
        await this.props.loadOrders()
        const ordersAsSeller = this.props.orders.filter(order => user.myGigIds?.find(gigId => gigId === order.gig._id))
        ordersAsSeller.sort((order1, order2) => {
            return order2.createdAt - order1.createdAt
        })
        const myGigs = user.myGigIds ? await getGigs(user.myGigIds) : []

        const lastViewed = user.viewedGigIds ? await getGigs(user.viewedGigIds) : []
        this.setState(prevState =>
        ({
            ...prevState,
            myGigs,
            lastViewed,
            ordersAsSeller
        }))
    }

    componentWillUnmount() {
        socketService.off('order received', this.onNewOrder)
    }


    onNewOrder = async (newMsg) => {
        const { user } = this.props
        // TODO: INTERNAL FUNCTION FOR LOADING ORDERS
        await this.props.loadOrders()
        const ordersAsSeller = this.props.orders.filter(order => user.myGigIds?.find(gigId => gigId === order.gig._id))
        ordersAsSeller.sort((order1, order2) => {
            return order2.createdAt - order1.createdAt
        })
        this.setState(prevState =>
        ({
            ...prevState,
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

    get sellerTotalIncome() {
        const { ordersAsSeller } = this.state
        return ordersAsSeller.reduce((acc, order) => acc + order.totalPrice, 0)
    }

    render() {
        const { chart, memberSince, myGigs, ordersAsSeller } = this.state
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
                        <hr />
                        <div className="seller-scores">
                            <div className="seller-score flex space-between align-center">
                                <p>Response rate</p>
                                <div className="score-bar" style={_userScoreBarStyle(91)}></div>
                                <span>91%</span>
                            </div>
                            <div className="seller-score flex space-between align-center">
                                <p>Delivery time</p>
                                <div className="score-bar" style={_userScoreBarStyle(77)}></div>
                                <span>77%</span>
                            </div>
                            <div className="seller-score flex space-between align-center">
                                <p>Order Completion</p>
                                <div className="score-bar" style={_userScoreBarStyle(95)}></div>
                                <span>95%</span>
                            </div>
                        </div>
                        <hr />
                        <div className="seller-scores">
                            <div className="seller-earnings flex space-between align-center">
                                <p>Earnings In January</p>
                                <span>${totalIncome}</span>
                            </div>
                            <div className="seller-earnings flex space-between align-center">
                                <p>Response Time</p>
                                <span className="green">2Hrs</span>
                            </div>
                        </div>
                    </div>


                    {ordersAsSeller.length !== 0 && <div className="seller-orders">
                        <h1>Active Orders - <span>{ordersAsSeller.length} (${totalIncome})</span></h1>
                        <OrderList orders={ordersAsSeller.slice(0, 8)} onOrderStatusChanged={this.onOrderStatusChanged} />
                    </div>}
                    <section className="chart-wrapper">
                        <ProfileCharts income={totalIncome}
                        />
                    </section>
                </div>

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

function _userScoreBarStyle(score) {
    return { background: `linear-gradient(90deg, ${SIXERR_GREEN} ${score}%, rgb(181, 182, 186) ${score}.01%, rgb(200, 200, 200) 100%)` }
}
