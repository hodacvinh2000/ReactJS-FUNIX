import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import DepartmentList from './DepartmentListComponent';
import Payroll from './PayrollComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    role: state.role,
  }
}

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      staffs: this.props.staffs,
    }
  }

  callbackFunction = (childData) => {
    this.setState({
      staffs: childData,
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
            <Route exact path="/staff" component={() => <StaffList staffs={this.state.staffs} departments={this.props.departments} parentCallback={this.callbackFunction}/>}>
            </Route>
            <Route path="/staff/:staffId" component={StaffWithId} />
            <Route exact path="/department" component={() => <DepartmentList departments={this.props.departments} />} />
            <Route exact path="/payroll" component={() => <Payroll staffs={this.state.staffs.sort((a,b) => { return a.salaryScale - b.salaryScale })} onChange={(id) => this.onDepartmentChange(id)}/>} />
            <Redirect to="/staff" />
          </Switch>
          <Footer />
      </div>
      );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
