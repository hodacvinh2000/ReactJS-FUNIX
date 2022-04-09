import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle } from 'reactstrap';
import { Input, FormGroup, Form, Button, Col, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback } from 'reactstrap';

function RenderStaff({staff}) {
    return(
        <Card className='text-center border border-secondary'>
            <Link to={`/staff/${staff.id}`} >
                <CardImg width="100%" src={staff.image} alt={staff.name} />
            </Link>
            <CardTitle className='pb-0'>{staff.name}</CardTitle>
        </Card>
    );
};

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            isModalOpen: false,
            newStaff: {
                name: '',
                doB: '',
                salaryScale: 1,
                startDate: '',
                department: null,
                annualLeave: 0,
                overTime: 0,
                image: '/assets/images/alberto.png',
            },
            touched: {
                name: false,
                doB: false,
                startDate: false
            }
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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
        const value = event.target.value;
        const name = event.target.name;
        let newStaff = this.state.newStaff;
        newStaff[name] = value;
        this.setState({newStaff:newStaff});
    }
    
    handleSubmit(event) {
        this.setState({
            touched: {
                name: true,
                doB: true,
                startDate: true
            }
        })
        if (this.state.newStaff.name != '' && this.state.newStaff.doB != '' && this.state.newStaff.startDate != '') {
            const newStaff = this.state.newStaff;
            let staffs = JSON.parse(localStorage.getItem('staffs'));
            let maxId = staffs.map((staff)=>{return staff.id}).reduce(function(a,b){
                return (a>b)?a:b;
            });
            newStaff['id'] = maxId + 1;
            newStaff['department'] = this.props.departments.filter((department)=> department.id === newStaff.department)[0];
            staffs.push(newStaff);
            this.setState({
                newStaff: {
                    name: '',
                    doB: '',
                    salaryScale: 1,
                    startDate: '',
                    department: '',
                    annualLeave: 0,
                    overTime: 0,
                    image: '/assets/images/alberto.png',
                }   
            })
            localStorage.setItem('staffs',JSON.stringify(staffs));
            this.props.parentCallback(staffs);
        }
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(name, doB, startDate) {
        const errors = {
            name: '',
            doB: '',
            startDate: ''
        };

        if (this.state.touched.name) {
            if (name.length == 0) errors.name = 'Yêu cầu nhập';
            else if (name.length < 2) errors.name = 'Yêu cầu ít nhất 2 ký tự';
            else if (name.length > 30) errors.name = 'Yêu cầu nhiều nhất 30 ký tự';
        }
        if (this.state.touched.doB && doB.length == 0)
            errors.doB = 'Yêu cầu nhập';
        if (this.state.touched.startDate && startDate.length == 0)
            errors.startDate = 'Yêu cầu nhập';

        return errors;
    }

    render() {

        let staffs = this.props.staffs;
        if (this.state.searchInput != "") {
            staffs = staffs.filter((staff) => staff.name.toLowerCase().search(this.state.searchInput.toLowerCase()) != -1);
        }
        const ListStaff = staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-2 mb-2">
                    <RenderStaff staff={staff} onClick={this.props.onClick} />
                </div>
            );
        })

        const errors = this.validate(this.state.newStaff.name,this.state.newStaff.doB,this.state.newStaff.startDate)
    
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
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Input type="text" id="name" name="name"
                                        value={this.state.newStaff.name} 
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Input type="date" id="doB" name="doB"
                                        value={this.state.newStaff.doB} 
                                        invalid={errors.doB !== ''}
                                        onBlur={this.handleBlur('doB')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Input type="date" id="startDate" name="startDate"
                                        value={this.state.newStaff.startDate}
                                        invalid={errors.startDate !== ''}
                                        onBlur={this.handleBlur('startDate')} 
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Input type="select" id="department" name="department"
                                        value={this.state.newStaff.department}
                                        onChange={this.handleInputChange} >
                                        {this.props.departments.map((department) => {
                                            return(
                                                <option value={department.id}>{department.name}</option>
                                            );
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Input type="text" id="salaryScale" name="salaryScale"
                                        value={this.state.newStaff.salaryScale} 
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Input type="text" id="annualLeave" name="annualLeave"
                                        value={this.state.newStaff.annualLeave} 
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Input type="text" id="overTime" name="overTime"
                                        value={this.state.newStaff.overTime} 
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
                <div className="row mb-2" style={{'text-align':'center'}}>
                {staffs.length > 0 ? ListStaff :
                    <h3 className='col-12 col-md-12 col-lg-12'>Không tìm thấy kết quả!</h3>
                }
                </div>
            </div>
        );
    }
};

export default  StaffList;