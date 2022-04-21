import React, {Component, useEffect} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import DepartmentList from './DepartmentListComponent';
import Payroll from './PayrollComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { fetchStaffs, fetchDepartments, fetchStaffsSalary } from '../redux/ActionCreator';
import {connect} from 'react-redux';
import StaffsOfDepartComponent from './StaffsOfDepartComponent';
import { TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsOfDepartment: state.staffsOfDepartment,
    staffsSalary: state.staffsSalary
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments: () => {dispatch(fetchDepartments())},
  fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())}
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }
  
    render() {

      const StaffWithId = ({match}) => {
        const staff = this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0];
        return (
          <StaffDetail staff={staff}
            department={this.props.departments.departments.filter((department) => department.id === staff.departmentId)[0]}
            staffLoading={this.props.staffs.isLoading}
            staffErrMess={this.props.staffs.errMess}
            departmentLoading={this.props.departments.isLoading}
            departmentErrMess={this.props.departments.errMess} />
        );
      };

      const StaffsOfDeparment = ({match}) => {
        return (
          <StaffsOfDepartComponent 
            departmentId = {match.params.departmentId}
            department = {this.props.departments.departments.find(department => department.id === match.params.departmentId)}
          />
        );
      }

      return (
      <div className='App'>
          <Header />
            <Switch>
              <Route exact path="/staffs" component={() => <StaffList staffs={this.props.staffs.staffs} 
                  departments={this.props.departments.departments}
                  staffsLoading={this.props.staffs.isLoading}
                  staffsErrMess={this.props.staffs.errMess}
                  departmentsLoading={this.props.departments.isLoading}
                  departmentsErrMess={this.props.departments.errMess} />}>
              </Route>
              <Route path="/staffs/:staffId" component={StaffWithId} />
              <Route path='/departments/:departmentId'>{StaffsOfDeparment}</Route>
              <Route exact path="/departments" component={() => <DepartmentList departments={this.props.departments.departments}
                isLoading={this.props.departments.isLoading}
                errMess={this.props.departments.errMess} />} />
              <Route exact path="/staffsSalary" component={() => <Payroll staffsSalary={this.props.staffsSalary.staffsSalary.sort((a,b) => { return a.salaryScale - b.salaryScale })} />} />
              <Redirect to="/staffs" />
            </Switch>
          <Footer />
      </div>
      );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
