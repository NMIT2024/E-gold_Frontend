import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/Auth';
import profileReducer from './reducers/Profile';
import fieldReducer from './reducers/Field';
import inwardReducer from './reducers/Inward';
import RedeemReducer from './reducers/Redemption';
import purchaseReducer from './reducers/Purchase';

const store = configureStore({
  reducer: {
    userInfo: authReducer,
    profile: profileReducer,
    field: fieldReducer,
    inwardDetails: inwardReducer,
    redemptionData: RedeemReducer,
    goldRateDetail: purchaseReducer
  }
});

export default store
