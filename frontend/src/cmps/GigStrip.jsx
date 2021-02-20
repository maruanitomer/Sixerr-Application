import React from 'react'

import { GigPreview } from "./GigPreview"

export class GigStrip extends React.Component {

    state = {
        gigs: [],
    }

    componentDidMount() {
        const { tags } = this.props
        if (!tags) return
        const gigsByTag = this.props.gigs.filter(gig => {
            return gig.tags.includes(tags[0])
        })
        this.setState({ gigs: gigsByTag })
    }

    getGigsForDisplay = () => {
        const { tags } = this.props
        if (!tags) return this.props.gigs
        const gigsByTag = this.props.gigs.filter(gig => {
            return gig.tags.includes(tags[0])
        })
        return gigsByTag
    }
    render() {
        const bgStyle = { backgroundColor: this.props.bgColor }
        const gigs = this.getGigsForDisplay() || []

        return (
            <section className="gig-strip" style={bgStyle}>
                <div className="head flex space-between">
                    <h2 className="strip-title">{this.props.title}</h2>
                    <a className="see-all pointer">See all &gt;</a>
                </div>
                <ul className="strip-wrap clean-list">
                    {gigs.map(gig =>
                        <GigPreview key={gig._id}
                            gig={gig}
                            onUserViewGig={this.props.onUserViewGig}
                            onFavoriteToggle={this.props.onFavoriteToggle}
                            user={this.props.user}
                        />
                    )}
                </ul>
            </section>
        )
    }
}