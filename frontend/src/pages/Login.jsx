import { Component } from 'react';
import { connect } from 'react-redux'

import { login, logout, addUser } from "../store/actions/userActions.js"

class _Login extends Component {

    state = {
        msg: '',
        isSignUp: false,
        loginCred: {
            username: '',
            password: ''
        },
        signupCred: {
            username: '',
            password: '',
            fullname: ''
        }
    }

    componentWillUnmount() {
        this.setState(
            {
                loginCred: { username: '', password: '' }
            })
    }

    loginHandleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            loginCred: {
                ...prevState.loginCred,
                [name]: value
            }
        }))
    }

    signupHandleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }))
    }

    toggleIsNewUser = (ev) => {
        ev.stopPropagation()
        this.setState({ isSignUp: !this.state.isSignUp })
    }

    captureModalClick = (ev) => {
        ev.stopPropagation()
    }

    doLogin = async ev => {
        ev.preventDefault()
        ev.stopPropagation()
        const userCreds = this.state.loginCred
        if (!userCreds.username || !userCreds.password) {
            return this.setState({ loginCred: { username: '', password: '' }, msg: 'Please enter user/password' })
        }
        try {
            await this.props.login(userCreds)
            this.props.toggleLogin()

        } catch (err) {
            console.log('ERR', err)
            this.setState(prevState => ({
                loginCred: {
                    ...prevState.loginCred,
                    password: ''
                },
                msg: 'Wrong username or password'
            }))
        }
    }

    doLogout = () => {
        this.props.logout()
    }

    doSignup = async ev => {
        ev.preventDefault()
        ev.stopPropagation()
        const { username, password, fullname } = this.state.signupCred

        if (!username || !password || !fullname) {
            return this.setState({ msg: 'All inputs are required' })
        }
        try {
            await this.props.addUser({ username, password, fullname })
            this.props.toggleLogin()
        }
        catch (err) {
            console.log('ERR', err)
            this.setState(prevState => ({
                signupCred: {
                    ...prevState.signupCred,
                    password: ''
                },
                msg: 'Could not sign up please try again'
            }))
        }
    }

    render() {

        const { isSignUp, msg } = this.state

        let signupSection = (
            <>
                <h1>Join Sixerr</h1>
                <form className="frm" onSubmit={this.doSignup}>
                    <input
                        type="text"
                        name="fullname"
                        value={this.state.signupCred.fullname}
                        onChange={this.signupHandleChange}
                        placeholder="Full name"
                    />
                    <input
                        type="text"
                        name="username"
                        value={this.state.signupCred.username}
                        onChange={this.signupHandleChange}
                        placeholder="Username"
                    />
                    <input
                        name="password"
                        type="password"
                        value={this.state.signupCred.password}
                        onChange={this.signupHandleChange}
                        placeholder="Password"
                    />
                    <button>Continue</button>
                    <hr />
                    <h4>Already a member? <span onClick={this.toggleIsNewUser}>Sign In</span></h4>
                </form>
            </>
        )
        let loginSection = (
            <>
                <h1>Sign In to Sixerr</h1>
                <form className="frm" onSubmit={this.doLogin}>
                    <input
                        type="text"
                        name="username"
                        value={this.state.loginCred.username}
                        onChange={this.loginHandleChange}
                        placeholder="Username"
                        autoFocus
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={this.state.loginCred.password}
                        onChange={this.loginHandleChange}
                        placeholder="Password"
                    />
                    <br />
                    <button className="rounded">Continue</button>
                    <hr />
                    <h4>Not a member yet? <span onClick={this.toggleIsNewUser}>Join Now</span></h4>
                </form>
            </>
        )


        return (
            <div className="main-screen" onClick={this.props.toggleLogin}>
                <div className="login main-layout shadow rounded" onClick={this.captureModalClick}>
                    {msg && <p>{msg}</p>}
                    {/* {loggedInUser && (
                        <div>
                            <h3>
                                Welcome {loggedInUser.fullname}
                                <button onClick={this.doLogout}>Logout</button>
                            </h3>
                        </div>
                    )} */}
                    {isSignUp && signupSection}
                    {!isSignUp && loginSection}

                </div>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    login,
    logout,
    addUser,
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)




