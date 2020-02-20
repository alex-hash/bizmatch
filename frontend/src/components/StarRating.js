import React, { Component, useEffect } from 'react';
import { createAssesment } from '../http/projectService'
import StarRatingComponent from 'react-star-rating-component';
 
class StarRating extends React.Component {
  constructor() {
    super();
 
    this.state = {
      rating: 1
    };
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
