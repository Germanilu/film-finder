

import { useSelector, useDispatch } from 'react-redux';
import {updateYear} from '@/app/redux/action'

const Years = ({handleInputChange,filterData}) => {


    const dispatch = useDispatch();
    const FilterData = useSelector((state) => state.FilterData);
    


    /**
     * Calculate correct year ( actualYear - year)
     * And call handleUpdateData to dispatch redux action
     * 
     * @returns handleUpdateData(filteredYear)
     */
    const calculateYear = () => {
        const {year}        = filterData;
        const actualYear    = 2023;
        return handleupdateYear(actualYear - parseInt(year));
      }
    
    /**
     * @method
     * Dispatch updateData Action
     * @param {Int} year 
     */
    const handleupdateYear = (year) => {
        dispatch(updateYear(year));
      };

    return (
        <div>
            <label for="year">Quieres ver una peli, pero de hace cuantos años?</label>
            <input type='text' id='year' name='year'  onChange={handleInputChange}></input>
            <button type="button" onClick={calculateYear}>click</button>
        {FilterData.year}
        </div>
    )
}

export default Years;

