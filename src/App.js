import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import StaffList from './components/StaffListComponent';
import './App.css';
import { DISHES } from './shared/dishes';
import {STAFFS, DEPARTMENTS, ROLE} from './shared/staffs';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      staffs: STAFFS,
      departments: DEPARTMENTS
    };
  }
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href='/' className='navbar-title'>Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <StaffList staffs={this.state.staffs} departments={this.state.departments}/>
      </div>
    );
  }
}

export default App;
