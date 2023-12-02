
const initialState = {
  FilterData: {
    step: 0,
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
          return {
            ...state,
            FilterData:{
              ...state.FilterData,
              step: state.FilterData.step +1,
              category: action.category,
            }
          };

        case 'UPDATE_FILTER_DATA_ACTORS':
          return {
            ...state,
            FilterData:{
              ...state.FilterData,
              step: state.FilterData.step +1,
              actors: action.actors,
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
          
        case 'PREVIOUSE_STEP':
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
  