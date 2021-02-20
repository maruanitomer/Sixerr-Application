import React from 'react'

export class GigFilter extends React.Component {
    state = {
        filterBy: {
            text: ''
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }
    
    render() {
        const { text } = this.state.filterBy
        return (
            <div className='gig-filter'>
                <h1>Filter:</h1>
                    <input type="text" name='text' value={text} onChange={this.handleChange} />
            </div>
        )
    }
}

