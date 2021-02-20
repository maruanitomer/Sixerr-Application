import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';


export class CarouslePreview extends Component {
    state = {
        items: []
    }
    componentDidMount() {
        this.createItems()
    }
    createItems = () => {
        //Note for ori - see that you send imgUrls as a paremter or call it like that !
        const { imgUrls } = this.props
        let items = []
        imgUrls.map((src,idx) => {
            const item = {id:idx,src}
            items.push(item)
        })
        this.setState({items})
    }
    render() {
        const { items } = this.state;
        return (
            <Carousel>
                {items.map(item => <div key={item.id}><img src={`${item.title}`}/></div>)}
            </Carousel>
        )
    }
}