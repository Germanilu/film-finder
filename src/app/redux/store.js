// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducers from '@/app/redux/reducer'; // Import the rootReducer from reducers.js

    


// Create store
const store = configureStore({
  reducer: rootReducers,
  // You can add middleware, dev tools configuration, etc. here
});

export { store, Provider as ReduxProvider }; // Export Provider as ReduxProvider
export default store; // Add default export for the store
