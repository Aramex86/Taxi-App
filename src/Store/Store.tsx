import {createStore,compose,applyMiddleware} from 'redux';

import OrderReducer from './Reducers/OrderReducer';

import thunk from 'redux-thunk'

const rootReducer = OrderReducer;



type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>


//@ts-ignore
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

//@ts-ignore
window.___store__ = store

export default store;