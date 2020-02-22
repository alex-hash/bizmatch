import React, { Component, useEffect } from 'react';
import { createAssesment } from '../http/projectService'
import StarRatingComponent from 'react-star-rating-component';
 
class StarRating extends React.Component {
  state = {};

  componentWillMount() {
    this.setState({
      rating: this.props.assesment,
    });
  }

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps.assesment !== this.props.assesment) {
      this.setState({
        rating: nextProps.assesment
      });
    }
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    createAssesment(this.props.project, {type:nextValue}).then();
   
  }
 
  render() {
    const { rating } = this.state;
    
    return (                
      <div>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

export default StarRating;
