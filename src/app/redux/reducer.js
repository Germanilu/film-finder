import { includes}                       from 'lodash';


const initialState = {
  FilterData: {
    step: 0,
    category:[],
    actors:[]
  }
  };
 
  const rootReducer = (state = initialState, action) => {

    switch (action.type) {
      case 'UPDATE_FILTER_DATA_YEAR':
        return {
          ...state,
          FilterData:{
            ...state.FilterData,
            year: {
              id: action.year.id,
              year: action.year.year
            } 
          }
        };

        case 'UPDATE_FILTER_DATA_REVIEW_RATING':
          return {
            ...state,
            FilterData:{
              ...state.FilterData,
              reviewRating: action.reviewRating,
            }
          };

        case 'UPDATE_FILTER_DATA_CATEGORY':
          if(includes(state.FilterData.category,action.id)){
            return {
              ...state,
              FilterData:{
                ...state.FilterData,
                category:  state.FilterData.category.filter((id) => id !== action.id)
              }
            }
          }
          return {
            ...state,
            FilterData:{
              ...state.FilterData,
              category: [...state.FilterData.category, action.id]
            }
          };

        case 'UPDATE_FILTER_DATA_ACTORS':
          if(includes(state.FilterData.actors,action.id)){
            return {
              ...state,
              FilterData:{
                ...state.FilterData,
                actors:  state.FilterData.actors.filter((id) => id !== action.id)
              }
            }
          }
          return {
            ...state,
            FilterData:{
              ...state.FilterData,
              actors: [...state.FilterData.actors, action.id]
            }
          };
        case 'NEXT_STEP':
        return {
          ...state,
          FilterData:{
            ...state.FilterData,
            step: state.FilterData.step +1,
          }
        };
          
        case 'PREVIOUS_STEP':
          return {
            ...state,
            FilterData:{
              ...state.FilterData,
              step: state.FilterData.step -1,
            }
          };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  