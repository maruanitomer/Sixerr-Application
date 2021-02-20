import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'

export default function DetailsNav() {
    return (
        <nav className="details-nav flex main-layout">
            <AnchorLink className="link-details-nav" href='#description' onClick >Description</AnchorLink>
            <AnchorLink className="link-details-nav" href='#about-seller'>About The Seller</AnchorLink>
            <AnchorLink className="link-details-nav" href='#reviews'>Reviews</AnchorLink>
        </nav>
    )
}