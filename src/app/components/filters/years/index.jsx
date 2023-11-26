

import { useSelector, useDispatch } from 'react-redux';
import updateData from '@/app/redux/action'

const Years = ({handleInputChange,filterData}) => {
    debugger

    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    
    const handleUpdateData = () => {
        // Dispatch the 'UPDATE_DATA' action with new data
        dispatch(updateData('New Data from Component'));
      };
    
    return (
        <div>
            <label for="inputDate">Quieres ver una peli, pero de hace cuantos años?</label>
            <input type='text' id='inputDate' name='inputDate'  onChange={handleInputChange}></input>
            <button type="button" onClick={handleUpdateData}>click</button>
        </div>
    )
}

export default Years;

