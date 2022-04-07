import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import {STAFFS,DEPARTMENTS,ROLE} from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';
import StaffDetail from './StaffDetailComponent';
import DepartmentList from './DepartmentListComponent';
import Payroll from './PayrollComponent';
import { Input, FormGroup, Form, Button, Col, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback } from 'reactstrap';

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
        isModalOpen: false,
        name: '',
        doB: '',
        telnum: '',
        email: '',
        agree: false,
        contactType: 'Tel.',
        message: '',
        detailStaff: {

        }
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onDepartmentChange(id) {
    this.setState({selectedDepartment: id});
  }
  
  onSearchInputChange(keyword) {
    this.setState({searchInput: keyword});
  }

  handleSearch(event) {
    event.preventDefault();
    let keyword = event.target.search.value;
    this.onSearchInputChange(keyword);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleInputChange(event) {
    const value = event.target.value
    const name = event.target.name;
    this.setState({
      [name]:value
    })
}

handleSubmit(event) {
    console.log('Current State is: ' + JSON.stringify(this.state));
    alert('Current State is: ' + JSON.stringify(this.state));
    event.preventDefault();
}

    render() {

      const StaffWithId = ({match}) => {
        return (
          <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
        );
      };

      const ListStaff = () => {
        let staffs = this.state.staffs;
        if (this.state.searchInput != "") {
          staffs = staffs.filter((staff) => staff.name.toLowerCase().search(this.state.searchInput.toLowerCase()) != -1);
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
      };

      const StaffPage = () => {
        return (
          <div className="container-fluid pl-5 pr-5">
            <div className="row mt-2">
                <h2 className="col-3 col-md-3 col-lg-3">Nhân viên</h2>
                <div className='col-3 col-md-3 col-lg-3'>
                  <button className="btn btn-secondary" onClick={this.toggleModal}> <i className='fa fa-plus'></i> </button>
                </div>
                <Form className="col-6 col-md-6 col-lg-6" onSubmit={this.handleSearch}>
                  <Row className="form-group">
                    <Col md={9}>
                      <Input type="text" id="search" name="search" />
                    </Col>
                    <Col md={3}>
                      <Button type="submit" color="primary">Tìm</Button>
                    </Col>
                  </Row>
                </Form>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                          <Label htmlFor="name" md={2}>Tên</Label>
                          <Col md={10}>
                              <Input type="text" id="name" name="name"
                                  value={this.state.name} 
                                  onChange={this.handleInputChange} />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label htmlFor="doB" md={2}>Ngày sinh</Label>
                          <Col md={10}>
                              <Input type="date" id="doB" name="doB"
                                  value={this.state.doB} 
                                  onChange={this.handleInputChange} />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                          <Col md={10}>
                              <Input type="tel" id="telnum" name="telnum" placeholder="Contact Tel."
                                  value={this.state.telnum} 
                                  onChange={this.handleInputChange} />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label htmlFor="email" md={2}>Email</Label>
                          <Col md={10}>
                              <Input type="email" id="email" name="email" placeholder="Email"
                                  value={this.state.email} 
                                  onChange={this.handleInputChange} />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col md={{size: 6, offset: 2}}>
                              <FormGroup check>
                                  <Label check>
                                      <Input type="checkbox"
                                          name="agree"
                                          checked={this.state.agree} 
                                          onChange={this.handleInputChange} /> {' '}
                                      <strong>May we contact you?</strong>
                                  </Label>
                              </FormGroup>
                          </Col>
                          <Col md={{size: 3, offset: 1}}>
                              <Input type="select" name="contactType"
                                      value={this.state.contactType} 
                                      onChange={this.handleInputChange} >
                                  <option>Tel.</option>
                                  <option>Email</option>
                              </Input>
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Label htmlFor="message" md={2}>Your Feedback</Label>
                          <Col md={10}>
                              <Input type="textarea" id="message" name="message" rows="12"
                                  value={this.state.message} 
                                  onChange={this.handleInputChange} />
                          </Col>
                      </FormGroup>
                      <FormGroup row>
                          <Col md={{size:10,offset:2}}>
                              <Button type="submit" color="primary">Send Feedback</Button>
                          </Col>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
            </div>
            <hr/>
            <ListStaff />
          </div>
        );
      }

      return (
      <div className='App'>
          <Header />
          <Switch>
            <Route exact path="/staff" component={StaffPage}>
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
