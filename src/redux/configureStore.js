import { createStore } from 'redux';
import { Reducer, initialState } from './reduce';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );
    
    return store;
};