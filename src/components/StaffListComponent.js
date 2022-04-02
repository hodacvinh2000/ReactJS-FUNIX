import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderStaff({staff}) {
    return(
        <Card>
            <Link to={`/staff/${staff.id}`} >
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle>{staff.name}</CardTitle>
            </Link>
        </Card>
    );
};

const StaffList = (props) => {
    const staff = props.staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 staff-card">
                <RenderStaff staff={staff} onClick={props.onClick} />
            </div>
        );
    });

    return (
        <div className="container-fluid">
            <h2>Nhân viên</h2>
            <hr/>
            <div className="row">
                {staff}
            </div>
        </div>
    );
};

export default  StaffList;