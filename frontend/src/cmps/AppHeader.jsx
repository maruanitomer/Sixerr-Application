// import React, { Component } from 'react'
import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Login } from '../pages/Login'
import { logout } from '../store/actions/userActions'
import { socketService } from '../services/socketService'

const MODAL_TIME = 3000

class _AppHeader extends React.Component {

    state = {
        isLoginOpen: false,
        user: null,
        modal: {
            isOpen: true,
            msg: '',
            opacity: '0'
        }
    }

    componentDidMount() {
        const { user } = this.props
        socketService.on('chat addMsg', this.onNewMsg)
        socketService.on('order received', this.onOrderReceived)
        if (user) socketService.emit('chat topic', user._id)

    }


    componentWillUnmount() {
        socketService.off('chat addMsg', this.onNewMsg)
        // socketService.off('order received', this.onOrderReceived)
    }

    onToggleLogin = () => {
        const { user } = this.props
        this.setState({ isLoginOpen: !this.state.isLoginOpen })
        if (user) socketService.emit('chat topic', user._id)

    }

    onNewMsg = (newMsg) => {
        console.log('MESSAGE', newMsg)
        this.setState({ ...this.state, modal: { isOpen: true, opacity: '1', msg: newMsg.txt } }, this.hideModal)
    }

    onOrderReceived = (newMsg) => {
        console.log('MESSAGE', newMsg)
        this.setState({ ...this.state, modal: { isOpen: true, opacity: '1', msg: newMsg.txt } }, this.hideModal)
    }

    hideModal = () => {
        setTimeout(() => {
            this.setState({ ...this.state, modal: { isOpen: true, opacity: '0', msg: 'DEBUGGING IS SO MUCH FUUUUN' } })
        }, MODAL_TIME)
        setTimeout(() => {
            this.setState({ ...this.state, modal: { isOpen: true, opacity: '0', msg: '' } })
        }, MODAL_TIME + 1000)
    }

    onLogout = async () => {
        await this.props.logout()
        this.props.history.push('/gig')
    }

    render() {
        const { user } = this.props
        const { openChat, isRecievedMsg } = this.state
        const { isLoginOpen } = this.state
        const { modal } = this.state
        const modalStyle = { opacity: modal.opacity }

        return (
            <>
                <div className="site-header main-container">
                    <section className="app-header flex space-between align-center">
                        {/* <NavLink to="/"> */}
                        <h1 onClick={() => this.onNewMsg({ txt: 'DEBUGGING IS SO MUCH FUUUUN' })}>Sixerr<span>.</span></h1>
                        {/* </NavLink> */}
                        {isRecievedMsg && <div>1!!!</div>}
                        <ul className="header-nav clean-list flex align-center bold">
                            <NavLink className="fast-trans" to="/"><li>Home</li></NavLink>
                            <NavLink className="fast-trans" to="/gig"><li>Explore</li></NavLink>
                            {/* <NavLink onClick={this.onOpenChat} className="fast-trans" to="/chat"><li>Messages</li></NavLink> */}
                            {user && <NavLink className="fast-trans" to="#" onClick={this.onLogout}>
                                <li>Logout</li>
                            </NavLink>}
                            {!user &&
                                <NavLink className="" to="#" onClick={this.onToggleLogin}>
                                    <li>Login</li>
                                </NavLink>}
                            <NavLink to="/profile">
                                {/* {user && <h3>{user.username}</h3>} */}
                                {user && <li className="profile-img"><img src={user.imgUrl} alt="user" /></li>}
                            </NavLink>
                        </ul>

                    </section>
                    {this.state.modal.isOpen && <div className="msg-modal shadow" style={modalStyle}>
                        <h4>New Message</h4>
                        <p>{this.state.modal.msg}</p>
                    </div>}
                </div>
                {isLoginOpen && !user && <Login toggleLogin={this.onToggleLogin} />}
            </>
        )
    }
}

const mapGlobalStateToProps = (state) => {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    logout
}

export const AppHeader = connect(mapGlobalStateToProps, mapDispatchToProps)(withRouter(_AppHeader))