
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
            step: state.FilterData.step +1,
            year: action.year,
          }
        };

        case 'UPDATE_FILTER_DATA_REVIEW_RATING':
          return {
            ...state,
            FilterData:{
              ...state.FilterData,
              step: state.FilterData.step +1,
              reviewRating: action.reviewRating,
            }
          };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  