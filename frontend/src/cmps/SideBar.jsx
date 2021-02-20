import React from 'react'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import LoopIcon from '@material-ui/icons/Loop';
import DoneIcon from '@material-ui/icons/Done';
import { Link } from 'react-router-dom'

export default function SideBar({ gig, onGigOrder }) {
    const pack = gig.packages[0]
    const packPrice = pack.price.toFixed(2)
    return (
        <>
            <div className="sidebar">
                <div className="package-content">
                    <div>
                        <h3 className="flex space-between">
                            {'Package Price'}
                <span>${packPrice}</span>
                        </h3>
                        <p>{pack.desc}</p>
                    </div>
                    <div >
                        <div className={`icons flex`}>
                            <QueryBuilderIcon className="clock" />
                            <p className="delivery">{pack.deliveryDays} Days Delivery</p>
                            <LoopIcon className="loop" />
                            <p className="revisions">{pack.revisionsCount} Revisions</p>
                        </div>
                        <ul className="features clean-list ">
                            {pack.features.map(feature => {
                                return <div key={feature} className="flex">
                                    <DoneIcon fontSize="small" className="include" />
                                    <li>{feature}</li>
                                </div>
                            })}
                        </ul>
                    </div>
                    <div className="btns-container flex justify-center">
                        <Link to={`/gig/checkout/${gig._id}`}><button className="continue">Continue<span>{' '}</span>(${packPrice})</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
               
