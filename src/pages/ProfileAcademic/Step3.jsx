import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Select from '../../components/FromElements/Select'
import Input from '../../components/FromElements/Input'
import { LEARNING_ENVIROMENT, REQUIRED_MSG, SCHOLARSHIPS_AVAILABILITY, UNIVERSITY_LEVEL } from '../../constants'
import { updateProfile } from '../../services/auth'
import { deepEqual } from '../../utils'
import { useDispatch } from 'react-redux'
import { updateTotalCompletedTask } from '../../redux/features/UserSlice';

const Step3 = ({ changeSteps, academicData }) => {

    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    const handdleProfileUpdate = async (data) => {
        console.log("data >>", data);
        data.universitiesOfInterest = data.universitiesOfInterest.split(",");
        if(academicData?.universityPreferences && !deepEqual(data, academicData.universityPreferences)){
            profileUpdateEP(data);
            return;
        }else if(!academicData?.universityPreferences){
            profileUpdateEP(data);
            return;
        }
        changeSteps(4)
    }

    useEffect(() => {
        if (academicData?.universityPreferences) {
            setValue("desiredReputationOfUniversity", academicData.universityPreferences.desiredReputationOfUniversity)
            setValue("universitiesOfInterest", academicData.universityPreferences.universitiesOfInterest)
            setValue("preferredLearningEnvironment", academicData.universityPreferences.preferredLearningEnvironment)
            setValue("availabilityOfScholarships", academicData.universityPreferences.availabilityOfScholarships)
        }
    }, [academicData]);

    // EP

    const profileUpdateEP = async (data) => {
        try {
            console.log("data >", data);
            const response = await updateProfile({ universityPreferences: data });
            changeSteps(4)
            dispatch(updateTotalCompletedTask(3))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handdleProfileUpdate)}>

            <Select
                label="Desired Reputation of University"
                options={UNIVERSITY_LEVEL}
                {...register("desiredReputationOfUniversity", {
                    required: REQUIRED_MSG
                })}
                error={errors.desiredReputationOfUniversity}
            />

            <Input
                label="Specific Universities of Interest (if any)"
                isAsterisk={false}
                placeholder="University Names"
                {...register("universitiesOfInterest", {

                })}
                error={errors.universitiesOfInterest}
            />

            <Select
                label="Preferred Learning Environment"
                options={LEARNING_ENVIROMENT}
                {...register("preferredLearningEnvironment", {
                    required: REQUIRED_MSG
                })}
                error={errors.preferredLearningEnvironment}
            />

            <Select
                label="Availability of Scholarships or Financial Aid"
                options={SCHOLARSHIPS_AVAILABILITY}
                {...register("availabilityOfScholarships", {
                    required: REQUIRED_MSG
                })}
                error={errors.availabilityOfScholarships}
            />

            <div style={{ textAlign: "right", marginTop: "32px" }}>
                <a onClick={() => changeSteps(2)} style={{ marginRight: "30px", fontWeight: "600", cursor: "pointer" }}>
                    <i className="fa fa-angle-left ml-2"></i> Back
                </a>
                <button className="btn btn-outline-dark" style={{ border: "1px solid #000" }} type="submit">Next Question <i className="fa fa-angle-right ml-2"></i></button>
            </div>
        </form>
    )
}

export default Step3