import React, { Component } from 'react';
import { Navbar, NavbarBrand, Input, FormGroup } from 'reactstrap';
import StaffList from './components/StaffListComponent';
import $ from 'jquery';
import './App.css';
import { DISHES } from './shared/dishes';
import {STAFFS, DEPARTMENTS, ROLE} from './shared/staffs';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      staffs: STAFFS,
      departments: DEPARTMENTS,
      staffListClass: 'col-12 col-md-4 col-lg-4 staff',
    };
  }

  onNumOfColumnSelected(num) {
    if (num == 2) {
      this.setState({staffListClass: 'col-12 col-md-6 col-lg-6 staff'});
    }
    else if (num == 3) {
        this.setState({staffListClass: 'col-12 col-md-4 col-lg-4 staff'});
    }
    else if (num == 6) {
        this.setState({staffListClass: 'col-12 col-md-2 col-lg-2 staff'});
    }
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary" className='navbar'>
          <div className="container">
            <NavbarBrand href='/' className='navbar-title'>Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
            <FormGroup className='navbar-form'>
            <Input
              id="num-of-column"
              name="select"
              type="select"
              className='numofcolumn'
              onChange={() => this.onNumOfColumnSelected($('#num-of-column').val())}
            >
              <option>
                2
              </option>
              <option selected>
                3
              </option>
              <option>
                6
              </option>
            </Input>
          </FormGroup>
          </div>
        </Navbar>
        <StaffList staffs={this.state.staffs} departments={this.state.departments} StaffListClass={this.state.staffListClass}/>
      </div>
    );
  }
}

export default App;
