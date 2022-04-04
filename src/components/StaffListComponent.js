import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle } from 'reactstrap';

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

const StaffList = (props) => {
    const staff = props.staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-2 mb-2">
                <RenderStaff staff={staff} onClick={props.onClick} />
            </div>
        );
    });

    return (
        <div className="row mb-2">
            {staff}
        </div>
    );
};

export default  StaffList;