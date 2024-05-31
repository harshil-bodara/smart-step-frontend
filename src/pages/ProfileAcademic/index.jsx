import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { FaUser } from "react-icons/fa";

import Select from '../../components/FromElements/Select'
import Input from '../../components/FromElements/Input';
import Checkbox from '../../components/FromElements/Checkbox';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import { getProfile } from '../../services/auth';
import { authLogout } from '../../redux/features/AuthSlice';
import { Link } from 'react-router-dom';
import ProfileLayout from '../../components/Layout/ProfileLayout';
import { updateTotalCompletedTask } from '../../redux/features/UserSlice';

const ProfileAcademic = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.userData)
    const totalCompletedTask = useSelector(state => state.user.totalCompletedTask);

    const [activaTab, setActiveTab] = useState(1);
    const [academicData, setAcademicData] = useState({});
    // const [totalCompletedTask, setTotalCompletedTask] = useState(0);

    const userData = useSelector(state => state.auth.userData);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(authLogout());
    }

    const stpeFormHeading = (heading, stepNo) => <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{heading}</h3>
        <h3 style={{ letterSpacing: "4px", color: "#FF1949" }}>{stepNo}/6</h3>
    </div>

    const changeSteps = (stepNo) => {
        setActiveTab(stepNo)
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
        setActiveTab(stepNo < 6 ? (stepNo + 1) : 1);
        dispatch(updateTotalCompletedTask(stepNo));
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    // EP

    const fetchProfile = async () => {
        try {
            const response = await getProfile()
            console.log("response >>", response);
            setAcademicData(response.data.user)
            // console.log(Object.values(response.data.user.consentAndAgreement));

            updateFormStep(response.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ProfileLayout>
                <div className="card mb-3">
                    <div className="card-body">
                        {totalCompletedTask === 6 && <div class="alert alert-success" role="alert">
                            COMPLETE! Thank you for completing all the steps, you can apply to universities now.
                        </div>}
                        {/* <ul id="progressbar">
                                            <li className="active">Academic Background</li>
                                            <li>Study Preferences</li>
                                            <li>University Preferences</li>
                                            <li>Study Goals and Career Aspirations</li>
                                        </ul> */}
                        {activaTab === 1 && <div>
                            {stpeFormHeading("Academic Background", 1)}
                            <hr />
                            <p style={{ lineHeight: 1.4, fontSize: "13px" }}>Discover English-taught Master's programs in your field worldwide by answering a few questions.</p>
                            <Step1
                                changeSteps={changeSteps}
                                academicData={academicData}
                            />
                        </div>}

                        {activaTab === 2 && <div>
                            {stpeFormHeading("Study Preferences", 2)}
                            <hr />
                            <Step2
                                changeSteps={changeSteps}
                                academicData={academicData}
                            />
                        </div>}

                        {activaTab === 3 && <div>
                            {stpeFormHeading("University Preferences", 3)}
                            <Step3
                                changeSteps={changeSteps}
                                academicData={academicData}
                            />
                        </div>}

                        {activaTab === 4 && <div>
                            {stpeFormHeading("Study Goals and Career Aspirations", 4)}
                            <hr />
                            <Step4
                                changeSteps={changeSteps}
                                academicData={academicData}
                            />
                        </div>}

                        {activaTab === 5 && <div>
                            {stpeFormHeading("Additional Information", 5)}
                            <hr />
                            <Step5
                                changeSteps={changeSteps}
                                academicData={academicData}
                            />
                        </div>}

                        {activaTab === 6 && <div>
                            {stpeFormHeading("Consent and Agreement", 6)}
                            <hr />
                            <Step6
                                changeSteps={changeSteps}
                                academicData={academicData}
                            />
                        </div>}
                    </div>
                </div>
            </ProfileLayout>
        </>
    )
}

export default ProfileAcademic