
import {  useDispatch, useSelector }                    from 'react-redux';
import {updateReviewRating, previouseStep,nextStep}     from '@/app/redux/action'
import { get}                                           from 'lodash';
import { Rating }                                       from 'react-simple-star-rating'
import { IoIosArrowRoundForward, IoIosArrowRoundBack }  from "react-icons/io";
import { 
  PiNumberSquareZeroFill , 
  PiNumberSquareOneFill , 
  PiNumberSquareTwoFill ,
  PiNumberSquareThreeFill ,
  PiNumberSquareFourFill ,
  PiNumberSquareFiveFill , 
  PiNumberSquareSixFill , 
  PiNumberSquareSevenFill , 
  PiNumberSquareEightFill , 
  PiNumberSquareNineFill , 

}  from "react-icons/pi";

import './index.scss';


const ReviewRating = () => {

   const dispatch = useDispatch();

   const selectedRating =  useSelector((state) =>  get(state,'FilterData.reviewRating',null));

   /**
    * @method
    * Set the ratingValue and dispatch redux action
    * 
    * @param {int} rate Rate selected from Rating component
    */
   const handleRating = (rate) => {
    const correctRate = rate -1
    dispatch(updateReviewRating(correctRate))
  }

  const customIcons = [
    {icon: <PiNumberSquareZeroFill  size={50}/> },
    {icon: <PiNumberSquareOneFill size={50}/> },
    {icon: <PiNumberSquareTwoFill size={50}/> },
    {icon: <PiNumberSquareThreeFill size={50}/> },
    {icon: <PiNumberSquareFourFill size={50}/> },
    {icon: <PiNumberSquareFiveFill size={50}/> },
    {icon: <PiNumberSquareSixFill size={50}/> },
    {icon: <PiNumberSquareSevenFill size={50}/> },
    {icon: <PiNumberSquareEightFill size={50}/> },
    {icon: <PiNumberSquareNineFill size={50}/> },
  ]
  

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
                iconsCount={10}
                transition
                customIcons={customIcons}
                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} 
                onClick={handleRating}
                />
            </div>
            <div className='step-container'>
            <div className='previouse-step' onClick={() => dispatch(previouseStep())}><IoIosArrowRoundBack/>Step 1</div>
            {
              selectedRating && 
              <div className='next-step' onClick={() => dispatch(nextStep())}>Step 3<IoIosArrowRoundForward/></div>
            }
            </div>
          </div>
        </div>
    )
}

export default ReviewRating;

