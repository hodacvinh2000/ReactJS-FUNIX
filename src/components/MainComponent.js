import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import {STAFFS,DEPARTMENTS,ROLE} from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';
import StaffDetail from './StaffDetailComponent';
import DepartmentList from './DepartmentListComponent';
import Payroll from './PayrollComponent';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
        staffs: STAFFS,
        departments: DEPARTMENTS,
        role: ROLE,
        selectedStaff: null 
    }
  }

    render() {

      const StaffWithId = ({match}) => {
        return (
          <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
        );
      }

      return (
      <div className='App'>
          <Header />
          <Switch>
            <Route exact path="/home" component={() => <StaffList staffs={this.state.staffs} departments={this.state.departments} />} />
            <Route path="/staff/:staffId" component={StaffWithId} />
            <Route exact path="/departments" component={() => <DepartmentList departments={this.state.departments} />} />
            <Route exact path="/payroll" component={() => <Payroll staffs={this.state.staffs} />} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
      </div>
      );
    }
}

export default Main;
