import {  useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import {  useDispatch }     from 'react-redux';
import {updateYear}                     from '@/app/redux/action'
import externalData                         from '@/app/data';
import { get,map} from 'lodash';
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import './index.scss';
const Years = () => {

   const dispatch = useDispatch();
   const [selected,setSelected] = useState("");
   const [continueButton,setContinueButton] = useState(false);
   const [date,setDate] = useState('');

   const yearState = 2023- useSelector((state) =>  state.FilterData.year);
  
    /**
     * @method
     * Calculate correct year ( actualYear - year)
     * 
     * @returns {Sting} Selected Year
     */
    const calculateYear = (year) => {
        const actualYear    = 2023;
        return actualYear - parseInt(year)
      }
    
      useEffect(() => {
        console.log("Selected:", selected)
        
        console.log(yearState)
        if(yearState){
          setSelected(yearState)
          setContinueButton(true)

        }
        
        console.log("now Selected:", selected)
      })

    /**
     * @method
     * Set correct data for each state
     * 
     * @param {Object} year 
     */  
    const nextStep = (year) => {
      debugger
      setSelected(year.id)
      setContinueButton(true)
      setDate(calculateYear(get(year,'value')))
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
              map(dataYears,year => 
                <div id={get(year,'id')} className={`${selected == get(year,'id') ? "selected":"" } option`} onClick={() => nextStep(year)}>
                  <p className="box-square">{get(year,'option')}</p>
                  <span className='text-option'>{get(year,'text')}</span>
                  <span className='tick'>{selected == get(year,'id')? <FaCheck/> : ""}</span>
                </div>
              )
            }
            </div>
            {
              continueButton && 
              <div className='next-step' onClick={() => dispatch(updateYear(date))}>Step 2<IoIosArrowRoundForward/></div>
            }
          </div>
        </div>
    )
}

export default Years;

