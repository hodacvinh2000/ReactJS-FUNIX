import * as ActionType from './ActionType';

export const Staffs = (state = {
        isLoading: true,
        errMess: null,
        staffs: []
    }, action) => {
    switch(action.type) {
        case ActionType.STAFFS_LOADING:
            return {...state, isLoading: true, errMess: null, staffs: []};
        case ActionType.ADD_STAFFS:
            return {...state, isLoading: false, errMess: null, staffs: action.payload};
        case ActionType.STAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, staffs: []};
        case ActionType.ADD_STAFF:
            var staff = action.payload;
            return {...state, staffs: state.staffs.concat(staff)};
        case ActionType.UPDATE_STAFF:
            return {...state, isLoading: false, errMess: null, staffs: action.payload}
        case ActionType.DELETE_STAFF:
            return {...state, isLoading: false, errMess: null, staffs: action.payload}
        default: 
            return state;
    }
}