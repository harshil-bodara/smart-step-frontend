import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../redux/features/AuthSlice';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getProfile } from '../../services/auth';
import { updateTotalCompletedTask, updateUserProfile } from '../../redux/features/UserSlice';

const ProfileLayout = ({ children }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.userData);
    const totalCompletedTask = useSelector(state => state.user.totalCompletedTask);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(authLogout());
    }

    const updateFormStep = (data) => {
        let stepNo = 0;
        if (data?.academicBackground) {
            stepNo = 1
        }
        if (data?.studyPreferences) {
            stepNo = 2
        }
        if (data?.universityPreferences && data?.universityPreferences.universitiesOfInterest.length > 0) {
            stepNo = 3
        }
        if (data?.studyGoalsAndCareerAspirations) {
            stepNo = 4
        }
        if (data?.additionalInformation) {
            stepNo = 5
        }
        if (data?.consentAndAgreement?.consentToUsePersonalInformation) {
            stepNo = 6;
        }
        dispatch(updateTotalCompletedTask(stepNo));
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    // EP
    const fetchProfile = async () => {
        try {
            const response = await getProfile()
            dispatch(updateUserProfile(response.data.user));
            updateFormStep(response.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="profile-body my-4">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                    <div className="mt-3 w-100">
                                        <h4>Hi, {user?.fullName}</h4>
                                        <p className="text-secondary mb-1">{user?.email}</p>
                                        <p className="font-size-sm" style={{ color: "#FF1949", fontWeight: 500, letterSpacing: "0.4px" }}>{totalCompletedTask} of 6 tasks completed</p>
                                        {/* <button className="btn btn-primary">Follow</button>
                                            <button className="btn btn-outline-primary">Message</button> */}
                                        <a href='#' onClick={handleLogout}>Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <FaUser />
                                        <Link to="/profile">User Profile</Link>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <FaUser />
                                        <Link to="/study-preferences">Study Preferences</Link>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <FaUser />
                                        <Link to="/document-management">Document Management</Link>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <FaUser />
                                        <Link to="/applied-universities">Applied Universities</Link>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        <FaUser />
                                        <Link to="/agent-notification">Agent Notification</Link>
                                    </div>
                                </li>
                                {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout