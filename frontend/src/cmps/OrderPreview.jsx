import ScheduleIcon from '@material-ui/icons/Schedule'
import { CSSTransition } from 'react-transition-group'

export function OrderPreview({ order, onOrderStatusChanged }) {

    function getOrderProps() {
        switch (order.status) {
            case 'pending':
                return {
                    statusStyle: { backgroundColor: 'rgb(245, 41, 75)' },
                    statusMsg: 'Buyer is waiting for your response',
                    ctaButtonText: 'Approve Order',
                    nextStatus: 'approved'
                }
            case 'approved':
                return {
                    statusStyle: { backgroundColor: 'rgb(254, 190, 45)' },
                    statusMsg: 'This gig is in progress',
                    ctaButtonText: 'Deliver Now',
                    nextStatus: 'completed'
                }
            case 'completed':
                return {
                    statusStyle: { backgroundColor: 'rgb(43, 190, 118)' },
                    statusMsg: 'Gig is complete - High Six!',
                    ctaButtonText: 'Archive Gig',
                    nextStatus: 'archived'
                }
            case 'archived':
                return {
                    statusStyle: { backgroundColor: 'rgb(200, 200, 200)' },
                    statusMsg: 'Dust... everywhere...',
                    ctaButtonText: 'Start Over',
                    nextStatus: 'pending'
                }
            default:
                return {
                    statusStyle: { backgroundColor: 'rgb(255, 0, 0)' },
                    statusMsg: 'Something went wrong. Contact sys-op',
                    ctaButtonText: 'Bug Found!',
                    nextStatus: 'pending'
                }
        }
    }

    function setOrderStatus() {
        order.status = getOrderProps().nextStatus
        onOrderStatusChanged(order)
    }

    return (
        <>
            <li className="order-item">
                <div className="item-color" style={getOrderProps().statusStyle}></div>
                <div className="order-top">
                    <div className="order-img">
                        <img src={order.gig.imgUrl} alt="" />
                    </div>
                    <div className="order-buyer-wrapper flex align-center">

                        <img src={order.buyer.imgUrl} />
                        <div className="order-buyer">
                            <p><span>{order.buyer.fullname}</span></p>
                            <p className="green">View Order</p>
                        </div>
                    </div>
                    <div className="order-price flex">
                        <p className="light-grey">Price</p>
                        <p className="light-grey">${order.totalPrice}</p>
                    </div>
                    <div className="order-date flex">
                        <p className="light-grey">Delivery Time</p>
                        <div className="flex align-center light-grey">
                            <ScheduleIcon className="clock" />
                            <p>{_getDueTime(order.createdAt)}</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="order-bottom flex space-between align-center">
                    <div className="order-status flex align-center">
                        <CSSTransition timeout={500} classNames="alert">

                            <span style={getOrderProps().statusStyle}>{order.status}</span>
                        </CSSTransition>
                        <p className="light-grey">{getOrderProps().statusMsg}</p>
                    </div>
                    <button onClick={setOrderStatus}>{getOrderProps().ctaButtonText}</button>
                </div>
            </li >
        </>
    )
}

function _getDueTime(orderTimeStamp) {
    const gigDeliveryDays = 3
    const DAY = 24 * 60 * 60 * 1000
    const HOUR = 60 * 60 * 1000

    let timeToComplete = ((orderTimeStamp + gigDeliveryDays * DAY) - Date.now())
    const daysDue = Math.floor(timeToComplete / DAY)
    timeToComplete -= daysDue * DAY
    const hoursDue = Math.floor(timeToComplete / HOUR)

    return `${daysDue} Days, ${hoursDue} Hrs`

}
