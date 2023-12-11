

import { useSelector, useDispatch }                     from 'react-redux';
import {updateCategory, nextStep, previousStep}                       from '@/app/redux/action'
import externalData                                     from '@/app/data';
import { get,includes,map,isEmpty }                     from 'lodash';
import { FaCheck }                                      from "react-icons/fa6";
import { IoIosArrowRoundForward, IoIosArrowRoundBack }  from "react-icons/io";
import './index.scss';

const Category = () => {

  const dispatch = useDispatch();
  const dataCategories = get(externalData,'categories.data');
  const selectedcategory =  useSelector((state) =>  get(state,'FilterData.category',null));

    /**
   * @method
   * Dispatch updateData Action
   * @param {Int} year 
   */
    const handleUpdateCategory = (category) => {
      dispatch(updateCategory(get(category,'id')));
    };
    

  return (
    <div className='category-design'>
      <div className='step-three'>
        <div className='description'>
          <div className='step'>3.<IoIosArrowRoundForward /></div>
          <div>
            <h2 className='title'>Step 3: Define the Genre</h2>
            <p className='subtitle'>Explore and Select the Perfect Movie Category</p>
          </div>
        </div>
        <div className='container-options'>
          {
            map(dataCategories, category =>
              <div id={get(category, 'id')} className={`${includes(selectedcategory,category.id) ? 'selected': ""} option`} onClick={() => handleUpdateCategory(category)} >
                <span className='text-option'>{get(category, 'name')}</span>
                <span className='tick'>{includes(selectedcategory,category.id)? <FaCheck/> : ""}</span>
              </div>
            )
          }
        </div>
        <div className='step-container'>
            <div className='previous-step' onClick={() => dispatch(previousStep())}><IoIosArrowRoundBack/>Step 2</div>
            {
              !isEmpty(selectedcategory) && 
              <div className='next-step' onClick={() => dispatch(nextStep())}>Step 4<IoIosArrowRoundForward/></div>
            }
            </div>
      </div>
    </div>
  )
}

export default Category;

