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
        staffs: JSON.parse(localStorage.getItem('staffs')),
        departments: DEPARTMENTS,
        role: ROLE,
        selectedStaff: null,
    }
    console.log(this.state.staffs);
    // localStorage.clear();
  }

  callbackFunction = (childData) => {
    this.setState({
      staffs: childData
    })
  }
  
    render() {

      const StaffWithId = ({match}) => {
        return (
          <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
        );
      };

      return (
      <div className='App'>
          <Header />
          <Switch>
            <Route exact path="/staff" component={() => <StaffList staffs={this.state.staffs} departments={this.state.departments} parentCallback={this.callbackFunction}/>}>
            </Route>
            <Route path="/staff/:staffId" component={StaffWithId} />
            <Route exact path="/department" component={() => <DepartmentList departments={this.state.departments} />} />
            <Route exact path="/payroll" component={() => <Payroll staffs={this.state.staffs.sort((a,b) => { return a.salaryScale - b.salaryScale })} onChange={(id) => this.onDepartmentChange(id)}/>} />
            <Redirect to="/staff" />
          </Switch>
          <Footer />
      </div>
      );
    }
}

export default Main;
