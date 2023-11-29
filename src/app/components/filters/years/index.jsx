import {  useState } from 'react';
import {  useDispatch }     from 'react-redux';
import {updateYear}                     from '@/app/redux/action'
import externalData                         from '@/app/data';
import { get,map} from 'lodash';
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import './index.scss';
const Years = () => {

    const dispatch = useDispatch();
   const [selected,setSelected] = useState()

  
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
      setSelected(e.currentTarget.id)
      const year = calculateYear(e);
      // setTimeout(() => {
      //   dispatch(updateYear(year))
      // }, 3000);
    }
      
    const dataYears = get(externalData,'years.data');

    return (
        <div className='years-design'>
          <div className='step-one'>
            <div className='description'>
              <div className='step'>1.<IoIosArrowRoundForward /></div>
              <div>
                <h2 className='title'>Step 1: Set the Stage</h2>
                <p className='subtitle'>Select the Release Date of Your Cinematic Journey</p>
              </div>
            </div>
            <div className='container-options'>
            {
              map(dataYears,data => 
                <div id={get(data,'id')} data-custom-value={get(data,'value')} className={`${selected == get(data,'id') ? "selected":"" } option`} onClick={(e) => nextStep(e)}>
                  <p className="box-square">{get(data,'option')}</p>
                  <span className='text-option'>{get(data,'text')}</span>
                  <span className='tick'>{selected == get(data,'id')? <FaCheck/> : ""}</span>
                </div>
              )
            }
            </div>
          </div>
        </div>
    )
}

export default Years;

