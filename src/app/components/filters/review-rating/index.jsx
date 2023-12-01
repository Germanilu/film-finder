import {  useEffect, useState } from 'react';
import {  useDispatch }     from 'react-redux';
import {updateReviewRating, previouseStep}                     from '@/app/redux/action'
import { Rating } from 'react-simple-star-rating'
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import './index.scss';


const ReviewRating = () => {

   const dispatch = useDispatch();
   const [ratingValue, setRatingValue] = useState(0);
   const [continueButton,setContinueButton] = useState(false);


   /**
    * @method
    * Set the ratingValue state and allow to next step
    * 
    * @param {int} rate Rate selected from Rating component
    */
   const handleRating = (rate) => {
    setRatingValue(rate * 2);
    setContinueButton(true)
  }
  

    return (
        <div className='review-rating-design'>
          <div className='step-two'>
            <div className='description'>
              <div className='step'>2.<IoIosArrowRoundForward /></div>
              <div>
                <h2 className='title'>Step 2: Rate the Excitement</h2>
                <p className='subtitle'>Pick the Average Rating for Your Movie Experience</p>
              </div>
            </div>
            <div className='star-rating-container'>
                <Rating
                transition
                showTooltip
                allowFraction
                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} 
                onClick={handleRating}
                />
            </div>
            <div className='step-container'>
            <div className='previouse-step' onClick={() => dispatch(previouseStep())}><IoIosArrowRoundBack/>Step 1</div>
            {
              continueButton && 
              <div className='next-step' onClick={() => dispatch(updateReviewRating(ratingValue))}>Step 3<IoIosArrowRoundForward/></div>
            }
            </div>
          </div>
        </div>
    )
}

export default ReviewRating;

