import React, { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
import { paymentPlans } from './../../../redux/actions/paymentActions';
import './css/style.css';

const UserForm = props => {
    const { user, paymentPlans_ } = props;

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            window.scrollTo(0, 0);
            props.paymentPlans();
        }
    });

    const convertDate = (inputFormat) => {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var d = new Date(inputFormat);
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        if (isNaN(day) || isNaN(month) || isNaN(year)) return "Invalid date";
        return `${monthNames[month]} ${day}, ${year}`
    }

    const getPaymentPlanName = (planId) => {
        const plan = paymentPlans_.find(plan => plan.id === planId);
        return plan ? plan.name : 'No Payment Plan';
    }

    return (
        <div className="child-detail" style={{ paddingLeft: '1rem' }}>
            <h3 style={{ marginBottom: 30, marginTop: 30 }} className='font4'>
                Other Details
                    </h3>
            <p><label>Email:</label>
                {user.email}
            </p>
            {user.enrolledCourses && (
                user.enrolledCourses.map((course, index) => {
                    return (<div key={index}>
                        <h5>{course.courseId.name}</h5>
                        {course.paymentIsActive ?
                            <div>
                                <p><label>Subscription:</label>
                                    <span>
                                        {course.transaction ?
                                            getPaymentPlanName(course.transaction.paymentPlanId)
                                            : 'No payment plan'
                                        }
                                    </span>
                                </p>
                                <p><label>Expiration Date:</label>
                                    <span>{convertDate(course.endDate)}</span>
                                </p>
                            </div>
                            :
                            <p><label>Subscription:</label>
                                <span style={{ color: '#FF5B5B' }}>Not Subscribed</span>
                            </p>
                        }
                    </div>)
                })
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    paymentPlans_: state.payment.paymentPlans,
});
export default connect(mapStateToProps,
    {
        paymentPlans
    })(UserForm);