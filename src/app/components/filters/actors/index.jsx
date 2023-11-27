

import { useDispatch }                        from 'react-redux';
import {updateActors}                         from '@/app/redux/action'
import actors                                 from '@/app/data';
import { get,includes,pull,map, lowerCase }   from 'lodash';

const Actors = ({filterData,setFilterData}) => {

    const dispatch = useDispatch();

  /**
   * @method
   * Dispatch updateData Action
   * @param {Int} year 
   */
    const handleUpdateActors = () => {
      const {actors}        = filterData;
      dispatch(updateActors(actors));
    };
      
  /**
   * @method
   * Check in filterData state, if include id in category Array will removed, otherwise will add to it.
   * @param {event} event 
   */
  const addCheckbox = (event) => {
    const {actors} = filterData;
    if(includes(actors,event.target.defaultValue)){
      pull(actors,event.target.defaultValue)
    }
    else if(!includes(actors,event.target.defaultValue)){
        const ActorsArray = actors.concat(event.target.defaultValue)
        setFilterData({
            ...filterData,
            actors:ActorsArray
        })
    }
  }

  return (
      <div>
        <label>Choose your actors of interests:</label>
      {
        map(get(actors,'actors.data'), actor => 
          <li>
            <input type="checkbox" id={lowerCase(get(actor,'name'))} name={lowerCase(get(actor,'name'))} value={get(actor,'id')} onClick={(addCheckbox)}/>
            <label for={lowerCase(get(actor,'name'))}>{get(actor,'name')}</label>
          </li>  
      )
      }
        <button type="button" onClick={handleUpdateActors}>click</button>
      </div>
  )
}

export default Actors;

