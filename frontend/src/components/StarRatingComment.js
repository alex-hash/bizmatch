import React from 'react';
import { createCommentAssesment } from '../http/projectService';
import StarRatingComponent from 'react-star-rating-component';
import Swal from 'sweetalert2';

class StarRating extends React.Component {
  state = {};

  componentWillMount() {
    this.setState({
      rating: this.props.assesment
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
    this.setState({ rating: nextValue });
    createCommentAssesment(this.props.comment, { type: nextValue }).then().catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('currentUser');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tú token de sesión ha expirado'
        }).then(() => {
          window.location.href = '/';
        });
      } else if (error.response.status === 400) {
        window.location.href = '/404';
      }
    });
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <StarRatingComponent name={this.props.comment} starCount={5} value={rating} onStarClick={this.onStarClick.bind(this)} />
      </div>
    );
  }
}

export default StarRating;
