

import { useSelector, useDispatch }     from 'react-redux';
import {updateReviewRating}             from '@/app/redux/action'

const ReviewRating = ({handleInputChange,filterData}) => {

    const dispatch = useDispatch();
    const FilterData = useSelector((state) => state.FilterData);

    /**
     * @method
     * Dispatch updateData Action
     * @param {Int} year 
     */
    const handleUpdateReviewRating = () => {
        const {reviewRating}        = filterData;
        dispatch(updateReviewRating(reviewRating));
        };

    return (
        <div>
            <label for="reviewRating">Por Arriba de que media de valoraciones quieres la pelicula?</label>
            <input type='text' id='reviewRating' name='reviewRating'   onChange={handleInputChange}></input>
            <button type="button" onClick={handleUpdateReviewRating}>click</button>
        </div>
    )
}

export default ReviewRating;

