
import { useSelector, useDispatch }                     from 'react-redux';
import {updateActors, nextStep, previousStep}                       from '@/app/redux/action'
import externalData                                     from '@/app/data';
import { get,includes,map,isEmpty }                     from 'lodash';
import { FaCheck }                                      from "react-icons/fa6";
import { IoIosArrowRoundForward, IoIosArrowRoundBack }  from "react-icons/io";
import './index.scss';


const Actors = () => {

  const dispatch = useDispatch();
  //Get actors from external file and sort in alphabetic order
  const dataActors = (get(externalData,'actors.data')).sort((a, b) => a.name.localeCompare(b.name));
  const selectedactors =  useSelector((state) =>  get(state,'FilterData.actors',null));

  /**
   * @method
   * Dispatch updateData Action
   * @param {Int} year 
   */
  const handleUpdateActor = (actor) => {
    dispatch(updateActors(get(actor,'id')));
  };
      

  

  return (
  <div className='actor-design'>
    <div className='step-three'>
      <div className='description'>
        <div className='step'>4.<IoIosArrowRoundForward /></div>
        <div>
          <h2 className='title'>Step 4: Choose Actors</h2>
          <p className='subtitle'>Handpick the Stars for Your Movie Night</p>
        </div>
      </div>
      <div className='container-options'>
        {
          map(dataActors, actor =>
            <div id={get(actor, 'id')} className={`${includes(selectedactors,actor.id) ? 'selected': ""} option`} onClick={() => handleUpdateActor(actor)} >
              <span className='text-option'>{get(actor, 'name')}</span>
              <span className='tick'>{includes(selectedactors,actor.id)? <FaCheck/> : ""}</span>
            </div>
          )
        }
      </div>
      <div className='step-container'>
          <div className='previous-step' onClick={() => dispatch(previousStep())}><IoIosArrowRoundBack/>Step 3</div>
          {
            !isEmpty(selectedactors) && 
            <div className='next-step' onClick={() => dispatch(nextStep())}>Step 4<IoIosArrowRoundForward/></div>
          }
          </div>
    </div>
  </div>
  )
}

export default Actors;

