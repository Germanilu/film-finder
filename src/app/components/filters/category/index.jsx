

import { useSelector, useDispatch } from 'react-redux';
import {updateCategory} from '@/app/redux/action'
import externalData from '@/app/data';
import { get,includes,pull,map, lowerCase } from 'lodash';
const Category = ({filterData,setFilterData}) => {


    const dispatch = useDispatch();

    
    
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
        <div>
             <label>Choose your Category interests:</label>
        
        {
          map(get(externalData,'categories.data'), category => {
       
            return(
              <li>
                  <input type="checkbox" id={lowerCase(get(category,'name'))} name={lowerCase(get(category,'name'))} value={get(category,'id')} onClick={(addCheckbox)}/>
                  <label for={lowerCase(get(category,'name'))}>{get(category,'name')}</label>
              </li>  
            )
        })
    }
             <button type="button" onClick={handleUpdateCategory}>click</button>
        </div>
    )
}

export default Category;

