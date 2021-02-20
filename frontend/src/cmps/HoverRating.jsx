import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export class HoverRating extends React.Component {

  state = {
    value: 0,
    hover: -1
  }

  setValue = (newValue) => {
    this.setState({ value: newValue }, () => { this.props.handleRate(newValue) })
  }
  setHover = (newHover) => {
  }
  render() {
    return (
      <div style={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
        // margin: '10px 0px'
      }}>
        <Rating
          name="hover-feedback"
          value={this.state.value}
          precision={0.5}
          onChange={(event, newValue) => {
            this.setValue(newValue);
          }}
          onChangeActive={(newHover) => {
            this.setHover(newHover);
          }}
        />
        {this.value !== null && <Box ml={2}>{labels[this.hover !== -1 ? this.hover : this.value]}</Box>}
      </div>
    )

  }
}
