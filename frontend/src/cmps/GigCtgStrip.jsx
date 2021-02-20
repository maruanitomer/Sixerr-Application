import React from 'react';
import { withRouter } from 'react-router-dom'

class _GigCtgList extends React.Component {

    onTagClick = (tag) => {
        this.props.setFilter({ tags: [tag] })
        this.props.history.push('/gig')
    }
    render() {

        const { ctgs, title } = this.props

        return (
            <section className="gig-ctg-list" >
                <h2>{title}</h2>
                <ul className="gig-ctg-wrap clean-list">

                    {ctgs.map(ctg =>
                        <li className="pointer" key={ctg.imgUrl} onClick={() => this.onTagClick(ctg.tag)}>
                            <h5>{ctg.cta}</h5>
                            <h3>{ctg.title}</h3>
                            <img src={ctg.imgUrl} alt="category" />
                        </li>)}
                </ul>
            </section>
        )
    }
}

export const GigCtgList = withRouter(_GigCtgList)