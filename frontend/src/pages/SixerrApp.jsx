import React from 'react'
import { connect } from 'react-redux'
import { GigList } from '../cmps/GigList.jsx';
import { loadGigs, setFilter, removeGig } from "../store/actions/gigActions.js";
import { updateUser } from "../store/actions/userActions.js";


class _SixerrApp extends React.Component {

    componentDidMount() {
        // this.props.loadGigs({tags: ['logo', 'graphic design']})
        // this.props.loadGigs({text: 'string'})
        // this.props.loadGigs(this.props.filterBy)
        this.loadGigs()
    }
    
    loadGigs = async () => {
        await this.props.loadGigs(this.props.filterBy)

    }
    onUserViewGig = (gigId) => {
        const user = {...this.props.user}
        if (user.viewedGigIds) {
            if (!user.viewedGigIds.find(viewedGigId => viewedGigId === gigId)) user.viewedGigIds.push(gigId)
        } else user.viewedGigIds = [gigId]
        this.props.updateUser(user)
    }

    componentWillUnmount() {
        this.props.setFilter({})
    }
    
    onDelete = () => { }

    onSetFilter = (filterBy) => {
        this.props.setFilter(filterBy)
        this.props.loadGigs(filterBy)
    }
    
    onFavoriteToggle = (ev, gigId) => { 
        ev.stopPropagation()
        const user = {...this.props.user}
        if (user.favoriteIds) {
            if (user.favoriteIds.find(favoriteId => favoriteId === gigId)) user.favoriteIds = user.favoriteIds.filter(favoriteId => favoriteId !== gigId)
            else user.favoriteIds.push(gigId)
        } else user.favoriteIds = [gigId]
        this.props.updateUser(user)
    }

    render() {
        const {user} = this.props
        return (
            <section className="sixerr-app main-container">
                {/* <div className="flex space-around align-center mrg-top mrg-bottom">
                    <GigFilter />
                </div> */}
                <GigList gigs={this.props.gigs} onUserViewGig={this.onUserViewGig} onFavoriteToggle={this.onFavoriteToggle} user={this.props.user} onDelete={this.onDelete} />
            </section>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
        filterBy: state.gigModule.filterBy,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadGigs,
    setFilter,
    removeGig,
    updateUser
}

export const SixerrApp = connect(mapStateToProps, mapDispatchToProps)(_SixerrApp)
