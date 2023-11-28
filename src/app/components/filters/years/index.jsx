
import { useEffect, useState } from 'react';
import { useSelector, useDispatch }     from 'react-redux';
import {updateYear}                     from '@/app/redux/action'

import './index.scss';
const Years = ({handleInputChange,filterData}) => {

    const dispatch = useDispatch();
    const FilterData = useSelector((state) => state.FilterData);

    const [selected,setSelected] = useState()

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
      
useEffect(() => {
  console.log("aqui",selected)
})
    return (
        <div className='years-design'>
          <div className='step-one'>
            <div className='description'>
              <div>1. -</div>
              <div>
                <h2 className='title'>Step 1: Set the Stage</h2>
                <p className='subtitle'>Select the Release Date of Your Cinematic Journey</p>
              </div>
            </div>
            <div className='options-container'>
              <div className='option'>
                <div className="box-square">A</div>
                <span className='text-option'>1 year</span>
              </div>
              {/* <label for="year">Quieres ver una peli, pero de hace cuantos años?</label>
              <input type='text' id='year' name='year'  onChange={handleInputChange}></input>
              <button type="button" onClick={calculateYear}>click</button> */}
            </div>

            <div  key={252525}className='options-container' onClick={(e) => setSelected(e)}>
              <div className='option'>
                <div className="box-square">B</div>
                <span className='text-option'>+2 years</span>
              </div>
              {/* <label for="year">Quieres ver una peli, pero de hace cuantos años?</label>
              <input type='text' id='year' name='year'  onChange={handleInputChange}></input>
              <button type="button" onClick={calculateYear}>click</button> */}
            </div>
          </div>
        </div>
    )
}

export default Years;

