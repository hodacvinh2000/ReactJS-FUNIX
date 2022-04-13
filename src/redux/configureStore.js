import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes'; 
import { Commnents } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders'; 

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers ({
            dishes: Dishes,
            comments: Commnents,
            promotions: Promotions,
            leaders: Leaders
        })
    );
    
    return store;
};