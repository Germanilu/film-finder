import { useSelector }                  from 'react-redux';
import { useDispatch }                  from 'react-redux';
import { updateYear,nextStep}           from '@/app/redux/action'
import externalData                     from '@/app/data';
import { get,map}                       from 'lodash';
import { FaCheck }                      from "react-icons/fa6";
import { IoIosArrowRoundForward }       from "react-icons/io";

import './index.scss';

const Years = () => {

   const dispatch = useDispatch();


   const selectedYear =  useSelector((state) =>  get(state,'FilterData.year.year',null));
   const selectedYearId =  useSelector((state) =>  get(state,'FilterData.year.id',null));
   
   const dataYears = get(externalData,'years.data');
  
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

  /**
  * @method
  * Prepare variables and dispatch action
  * 
  * @param {Object} year 
  */  
  const updateYearSelected = (year) => {

    const variables = {
      id: get(year,'id'),
      year: calculateYear(get(year,'value'))
    };

    dispatch(updateYear(variables));
  }
      

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
            <div id={get(year,'id')} className={`${selectedYearId == get(year,'id') ? "selected":"" } option`} onClick={() => updateYearSelected(year)}>
              <p className="box-square">{get(year,'option')}</p>
              <span className='text-option'>{get(year,'text')}</span>
              <span className='tick'>{selectedYearId == get(year,'id')? <FaCheck/> : ""}</span>
            </div>
          )
        }
        </div>
        {
          selectedYear && 
          <div className='next-step' onClick={() => dispatch(nextStep())}>Step 2<IoIosArrowRoundForward/></div>
        }
      </div>
    </div>
  )
}

export default Years;

