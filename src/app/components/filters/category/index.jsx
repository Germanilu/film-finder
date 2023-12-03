

import { useSelector, useDispatch }         from 'react-redux';
import {updateCategory}                     from '@/app/redux/action'
import externalData                         from '@/app/data';
import { get,includes,pull,map, lowerCase } from 'lodash';
import { IoIosArrowRoundForward }       from "react-icons/io";
import './index.scss';

const Category = ({filterData,setFilterData}) => {

  const dispatch = useDispatch();

  const dataCategories = get(externalData,'categories.data');

    /**
   * @method
   * Dispatch updateData Action
   * @param {Int} year 
   */
    const handleUpdateCategory = () => {
      const {category}        = filterData;
      dispatch(updateCategory(category));
    };
    
  /**
   * @method
   * Check in filterData state, if include id in category Array will removed, otherwise will add to it.
   * @param {event} event 
   */
  const addCheckbox = (event) => {
    const {category} = filterData;
    if(includes(category,event.target.defaultValue)){
      pull(category,event.target.defaultValue)
    }
    else if(!includes(category,event.target.defaultValue)){
        const categoryArray = category.concat(event.target.defaultValue)
        setFilterData({
            ...filterData,
            category:categoryArray
        })
    }
  }

  return (
    <div className='category-design'>
      <div className='step-one'>
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
              <div id={get(category, 'id')} className={`option`} >
                <p className="box-square">{get(category, 'option')}</p>
                <span className='text-option'>{get(category, 'name')}</span>
              </div>
            )
          }
        </div>
        {/* {
          selectedcategory &&
          <div className='next-step' onClick={() => dispatch(nextStep())}>Step 2<IoIosArrowRoundForward /></div>
        } */}
      </div>
    </div>
  )
}

export default Category;

