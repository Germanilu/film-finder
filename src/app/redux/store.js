import { configureStore }     from '@reduxjs/toolkit';
import { Provider }           from 'react-redux';
import rootReducers           from '@/app/redux/reducer'; 

const store = configureStore({
  reducer: rootReducers,
});

export { store, Provider as ReduxProvider }; 
