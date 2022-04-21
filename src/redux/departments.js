import * as ActionType from './ActionType';

export const Departments = (state = {
    isLoading: true,
    errMess: null,
    departments: []
    }, action) => {
    switch(action.type) {
        case ActionType.DEPARTMENTS_FAILED:
            return {...state, isLoading: true, errMess: null, departments: []};
            
        case ActionType.ADD_DEPARTMENTS:
            return {...state, isLoading: false, errMess: null, departments: action.payload};

        case ActionType.DEPARTMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, departments: []};
        
        default: 
            return state;
    }
}
