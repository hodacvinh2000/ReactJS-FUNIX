import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import {STAFFS,DEPARTMENTS,ROLE} from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';
import StaffDetail from './StaffDetailComponent';
import DepartmentList from './DepartmentListComponent';
import Payroll from './PayrollComponent';
import { Input, FormGroup } from 'reactstrap';
import $ from 'jquery';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
        staffs: STAFFS,
        departments: DEPARTMENTS,
        role: ROLE,
        selectedStaff: null,
        selectedDepartment: "all",
        searchInput: "",
    }
  }

  onDepartmentChange(id) {
    this.setState({selectedDepartment: id});
  }
  
  onSearchInputChange(keyword) {
    this.setState({searchInput: keyword});
  }

    render() {

      const StaffWithId = ({match}) => {
        return (
          <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
        );
      }

      const ListStaff = () => {
        let staffs = this.state.staffs;
        if (this.state.selectedDepartment === "all" && this.state.searchInput != "") {
          staffs = staffs.filter((staff) => staff.name.search(this.state.searchInput) != -1);
        }
        if (this.state.selectedDepartment != "all") {
          staffs = staffs.filter((staff) => staff.department.id === this.state.selectedDepartment);
          if (this.state.searchInput != "") {
            staffs = staffs.filter((staff) => staff.name.search(this.state.searchInput) != -1);
          }
        }
        if (staffs.length > 0) {
          return (
            <StaffList staffs={staffs} departments={this.state.departments} />
          );
        }
        else {
          return (
            <div className='row mb-2' style={{'text-align':'center'}}>
              <h3 className='col-12 col-md-12 col-lg-12'>Không tìm thấy kết quả!</h3>
            </div>
          );
        }
      }

      const department = this.state.departments.map((department) => {
        return (
            <option value={department.id}>
                {department.name}
            </option>
        );
    })

      return (
      <div className='App'>
          <Header />
          <Switch>
            <Route exact path="/staff" >
              <div className="container-fluid pl-5 pr-5">
                <div className="row mt-2">
                    <h2 className="col-4 col-md-4 col-lg-4">Nhân viên</h2>
                    <FormGroup className="col-2 col-md-2 col-lg-2">
                        <Input type="select" id="department" onChange={() => this.onDepartmentChange($('#department').val())}>
                            <option value="all" selected>All</option>
                            {department}
                        </Input>
                    </FormGroup>
                    <FormGroup className="col-6 col-md-6 col-lg-6">
                        <Input id="search-staff" placeholder="Search..." onChange={() => this.onSearchInputChange($('#search-staff').val())} />
                    </FormGroup>
                </div>
                <hr/>
                <ListStaff />
              </div>
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
