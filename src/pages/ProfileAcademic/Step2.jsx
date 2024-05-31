import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Select from '../../components/FromElements/Select'
import Input from '../../components/FromElements/Input'
import { COURSE_DURATION, FIELD_LEVEL, STUDY_LEVEL } from '../../constants'
import { REQUIRED_MSG } from '../../constants'
import { updateProfile } from '../../services/auth'
import { deepEqual } from '../../utils'
import { useDispatch } from 'react-redux'
import { updateTotalCompletedTask } from '../../redux/features/UserSlice';

const Step2 = ({ changeSteps, academicData }) => {

    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    const handdleProfileUpdate = async (data) => {
        data.preferredStudyLocation = {
            city: data.city,
            stateCountry: data.stateCountry
        };
        delete data.city;
        delete data.stateCountry;
        if(academicData.studyPreferences && !deepEqual(data, academicData.studyPreferences)){
            profileUpdateEP(data);
            return;
        }else if(!academicData.studyPreferences){
            profileUpdateEP(data);
            return;
        }
        changeSteps(3)
    }

    useEffect(() => {
        if (academicData.studyPreferences) {
            setValue("intendedLevelOfStudy", academicData.studyPreferences.intendedLevelOfStudy)
            setValue("preferredFieldOfStudy", academicData.studyPreferences.preferredFieldOfStudy)
            setValue("desiredCourseDuration", academicData.studyPreferences.desiredCourseDuration)
            setValue("languageProficiency", academicData.studyPreferences.languageProficiency)
            setValue("city", academicData.studyPreferences?.preferredStudyLocation?.city)
            setValue("stateCountry", academicData.studyPreferences?.preferredStudyLocation?.stateCountry)
        }
    }, [academicData]);

    // EP

    const profileUpdateEP = async (data) => {
        try {
            console.log("data >", data);
            const response = await updateProfile({ studyPreferences: data });
            changeSteps(3)
            dispatch(updateTotalCompletedTask(2))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handdleProfileUpdate)}>

            <Select
                label="Intended Level of Study"
                options={STUDY_LEVEL}
                {...register("intendedLevelOfStudy", {
                    required: REQUIRED_MSG
                })}
                error={errors.intendedLevelOfStudy}
            />

            <Select
                label="Preferred Field of Study"
                options={FIELD_LEVEL}
                {...register("preferredFieldOfStudy", {
                    required: REQUIRED_MSG
                })}
                error={errors.preferredFieldOfStudy}
            />

            <Select
                label="Desired Course Duration"
                options={COURSE_DURATION}
                {...register("desiredCourseDuration", {
                    required: REQUIRED_MSG
                })}
                error={errors.desiredCourseDuration}
            />

            <Input
                label="Language Proficiency (English Proficiency Test Scores, if applicable)"
                placeholder="Language Proficiency"
                isAsterisk={false}
                {...register("languageProficiency", {
                    
                })}
                error={errors.languageProficiency}
            />

            <p style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "0.4px" }}>Preferred Study Location</p>

            <Input
                label="City"
                placeholder="City"
                isAsterisk={false}
                {...register("city", {
                    required: REQUIRED_MSG
                })}
                error={errors.city}
            />

            <Input
                label="Country"
                placeholder="Country"
                isAsterisk={false}
                {...register("stateCountry", {
                    required: REQUIRED_MSG
                })}
                error={errors.stateCountry}
            />

            <div style={{ textAlign: "right", marginTop: "32px" }}>
                <a onClick={() => changeSteps(1)} style={{ marginRight: "30px", fontWeight: "600", cursor: "pointer" }}>
                    <i className="fa fa-angle-left ml-2"></i> Back
                </a>
                <button className="btn btn-outline-dark" style={{ border: "1px solid #000" }} type="submit">Next Question <i className="fa fa-angle-right ml-2"></i></button>
            </div>
        </form>
    )
}

export default Step2