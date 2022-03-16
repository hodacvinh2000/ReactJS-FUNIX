import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat'; 

class StaffList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null,
        };
    }

    onStaffSelected(staff) {
        this.setState({selectedStaff: staff});
    }

    renderStaff(staff) {
        if (staff != null) {
            return (
                <div className='col-12 col-md-6 col-lg-6 staff'>
                    <Card  className="card-body">
                        <CardBody>
                            <CardText className="staff-name">Họ và tên: {staff.name}</CardText>
                            <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                            <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                            <CardText>Phòng ban: {staff.department.name}</CardText>
                            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    render() {

        const staff = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className={this.props.StaffListClass}>
                    <Card onClick={() => this.onStaffSelected(staff)}>
                        <CardTitle className="card-title">{staff.name}</CardTitle>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    {staff}
                </div>
                {this.state.selectedStaff == null && <p className="more-info">Bấm vào tên nhân viên để xem thông tin.</p>}
                <div className="row">
                    {this.renderStaff(this.state.selectedStaff)}
                </div>
            </div>
        );
    } 
}

export default  StaffList;