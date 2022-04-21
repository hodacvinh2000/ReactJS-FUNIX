import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Staffs } from './staffs';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Departments } from './departments';
import { StaffsOfDepartment } from './staffsOfDepartment';
import { StaffsSalary } from './staffsSalary';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers ({
            staffs: Staffs,
            departments: Departments,
            staffsOfDepartment: StaffsOfDepartment,
            staffsSalary: StaffsSalary
        }),
        applyMiddleware(thunk, logger)
    );
    
    return store;
};