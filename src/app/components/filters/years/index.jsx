import {  useState } from 'react';
import {  useDispatch }     from 'react-redux';
import {updateYear}                     from '@/app/redux/action'
import externalData                         from '@/app/data';
import { get,map} from 'lodash';
import './index.scss';
const Years = () => {

    const dispatch = useDispatch();


   

    /**
     * @method
     * Calculate correct year ( actualYear - year)
     * 
     * @returns {Sting} Selected Year
     */
    const calculateYear = (e) => {
        const selectedValue = e.currentTarget.getAttribute('data-custom-value')
        const actualYear    = 2023;
        return actualYear - parseInt(selectedValue)
      }
    

    /**
     * @method
     * Dispatch updateData Action with year selected
     * 
     * @param {HTMLElement} e 
     */  
    const nextStep = (e) => {
      const year = calculateYear(e);
      dispatch(updateYear(year))
    }
      
    const dataYears = get(externalData,'years.data');

    console.log(dataYears)
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
            <div className='container-options'>
            {
              map(dataYears,data => 
                <div id={get(data,'id')} data-custom-value={get(data,'value')} className='option' onClick={(e) => nextStep(e)}>
                  <p className="box-square">{get(data,'option')}</p>
                  <span className='text-option'>{get(data,'text')}</span>
                </div>
              )
            }
            </div>
          </div>
        </div>
    )
}

export default Years;

