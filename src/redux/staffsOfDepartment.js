import * as ActionType from './ActionType';

export const StaffsOfDepartment = (state = {
        isLoading: true,
        errMess: null,
        staffs: []
    }, action) => {
    switch(action.type) {
        case ActionType.STAFFS_OF_DEPARTMENT_LOADING:
            return {...state, isLoading: true, errMess: null, staffs: []};
            
        case ActionType.ADD_STAFFS_OF_DEPARTMENT:
            return {...state, isLoading: false, errMess: null, staffs: action.payload};

        case ActionType.STAFFS_OF_DEPARTMENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, staffs: []};
        
        default: 
            return state;
    }
}