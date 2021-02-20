import React, { Component } from 'react'
import ChatBox from 'react-chat-plugin';
import { socketService } from '../services/socketService'


export class Chat extends Component {
    state = {
        user: null,
        messages: [],
    };

    componentDidMount() {
        const { user } = this.props
        this.setState({ user })
    }


    //from app header : 
    onNewMsg = (newMsg) => {
        const user = newMsg.from
        this.setState({ isRecievedMsg: true, user}).then(() => {
            this.handleOnSendMessage(newMsg.txt)
        })
        socketService.emit('chat newMsg', { to: newMsg.from._id, from: user, txt: 'cannot wait to get it' })
        //To do:
        // isRecievedMsg = true
    }

    handleOnSendMessage = (message) => {
        const { user } = this.state;
        const username = user.username
        const avatarUrl = user.imgUrl
        const id = user._id
        this.setState({
            messages: this.state.messages.concat({
                author: {
                    username,
                    id,
                    avatarUrl,
                },
                text: message,
                timestamp: +new Date(),
                type: 'text',
            }),
        });
    };

    render() {
        const { user } = this.state
        if (!user) return <div>log in you stupid!</div>
        return (
            <ChatBox
                messages={this.state.messages}
                userId={user._id}
                onSendMessage={this.handleOnSendMessage}
                width={'500px'}
                height={'500px'}
            />
        )
    }
}

