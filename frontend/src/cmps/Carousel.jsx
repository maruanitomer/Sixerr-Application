import React from 'react';
import Carousel from 'react-material-ui-carousel'

export class CarouselImgs extends React.Component {
    state = {
        items:null,
        itemsLength:0,
    }

    componentDidMount() {
        const itemsLength = this.props.imgUrls.length
        const itemsArr = this.createItems(itemsLength)
        this.setState({items:itemsArr,itemsLength})
    }

    createItems = (length) =>{
        if(length<=0) return null
        const items = []
        for (var i =0 ; i<length; i++){
            items.push( {
                idx:i,
            },)
        }
        return items
    }   
    
    Item = (i) => {
        const imgs = this.props.imgUrls
        const img= <img alt="" src={`${imgs[i.item.idx]}` } />
        return (
            img
        )
    }

    render() {
        const {items} = this.state
        if(!items || !items.length) return <div></div>
        return (
            <Carousel>
                {
                    items.map((item, i) => <this.Item key={i} item={item} />)
                }
            </Carousel>
        )
    }
}
