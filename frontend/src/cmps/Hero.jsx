import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadGigs, setFilter } from "../store/actions/gigActions.js";
import { updateUser } from "../store/actions/userActions.js";
import SearchIcon from '@material-ui/icons/Search';
import { SvgStar } from './SvgStar.jsx';

class _Hero extends React.Component {

    state = {

        filterBy: {
            text: ''
        },

        currHeroIdx: 0,
        heros: [
            {
                imgUrl: '/assets/img/hero/woman1.jpg',
                username: 'Paige Rank',
                occupation: 'SEO Expert',
            },
            {
                imgUrl: '/assets/img/hero/man-microphone.jpg',
                whoAmI: 'man',
                username: 'Zach Brater',
                occupation: 'Narrator'
            },
            {
                imgUrl: '/assets/img/hero/woman-editing.jpg',
                username: 'Puka Bat David',
                occupation: 'Mixing Engineer'
            },
            {
                imgUrl: '/assets/img/hero/man-producer.jpg',
                username: '60 cent',
                occupation: 'Producer',
            }
        ],

    }

    heroInterval

    componentDidMount() {
        this.heroInterval = setInterval(this.nextHero, 5000)
        this.props.loadGigs()
    }

    componentWillUnmount() {
        clearInterval(this.heroInterval)
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.onSetFilter(this.state.filterBy)
        })
    }

    onSetFilter = (filterBy) => {
        this.props.setFilter(filterBy)
    }

    onSearch = () => {
        this.props.history.push('/gig')
    }

    onUserViewGig = (gigId) => {
        const user = { ...this.props.user }
        if (user.viewedGigIds) {
            if (!user.viewedGigIds.find(viewedGigId => viewedGigId === gigId)) user.viewedGigIds.push(gigId)
        } else user.viewedGigIds = [gigId]
        this.props.updateUser(user)
    }

    nextHero = () => {
        const herosCount = this.state.heros.length
        const nextHero = (this.state.currHeroIdx === herosCount - 1) ?
            0 : this.state.currHeroIdx + 1
        this.setState({ currHeroIdx: nextHero })
    }

    render() {
        const { heros, currHeroIdx } = this.state
        const hero = heros[currHeroIdx]

        return (
            <>
                <section className="hero">
                    <img src={hero.imgUrl} alt="hero" />
                    {/* <div className="vilian"> */}
                    <div className="main-container hero-content">
                        <div className="hero-cta">
                            <h1>Find the perfect <span>freelance</span> for your business</h1>
                            <div className="hero-search">
                                {/* <SearchIcon className="search-icon" /> */}
                                <form>
                                    <input value={this.state.filterBy.text}
                                        type="search"
                                        name="text"
                                        autoComplete="off"
                                        placeholder={`Try "building mobile app"`}
                                        onChange={this.handleChange} />
                                    <button onClick={this.onSearch}>Search</button>
                                </form>
                            </div>
                        </div>
                        <div className="hero-snippet">
                            <div className="stars">
                                <SvgStar />
                                <SvgStar />
                                <SvgStar />
                                <SvgStar />
                                <SvgStar />
                            </div>
                            <span>{hero.username}</span>, {hero.occupation}
                        </div>
                    </div>

                    {/* </div> */}
                </section>
            </>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        gigs: state.gigModule.gigs,
        // user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadGigs,
    updateUser,
    setFilter
    // updateGig
}

export const Hero = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Hero))