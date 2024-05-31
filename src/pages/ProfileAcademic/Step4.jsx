import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Input from '../../components/FromElements/Input'
import { REQUIRED_MSG } from '../../constants';
import { deepEqual } from '../../utils';
import { updateProfile } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { updateTotalCompletedTask } from '../../redux/features/UserSlice';

const Step4 = ({ changeSteps, academicData }) => {

    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    const handdleProfileUpdate = async (data) => {
        if (academicData.studyGoalsAndCareerAspirations && !deepEqual(data, academicData.studyGoalsAndCareerAspirations)) {
            profileUpdateEP(data);
            return;
        } else if (!academicData.studyGoalsAndCareerAspirations) {
            profileUpdateEP(data);
            return;
        }
        changeSteps(5)
    }

    useEffect(() => {
        if (academicData.studyGoalsAndCareerAspirations) {
            setValue("shortTermStudyGoals", academicData.studyGoalsAndCareerAspirations.shortTermStudyGoals)
            setValue("longTermCareerAspirations", academicData.studyGoalsAndCareerAspirations.longTermCareerAspirations)
            setValue("studyAbroadExpectations", academicData.studyGoalsAndCareerAspirations.studyAbroadExpectations)
        }
    }, [academicData]);

    // EP

    const profileUpdateEP = async (data) => {
        try {
            console.log("data >", data);
            const response = await updateProfile({ studyGoalsAndCareerAspirations: data });
            changeSteps(5)
            dispatch(updateTotalCompletedTask(4))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handdleProfileUpdate)}>

            <Input
                label="Short-term Study Goals"
                {...register("shortTermStudyGoals", {
                    required: REQUIRED_MSG
                })}
                error={errors.shortTermStudyGoals}
            />

            <Input
                label="Long-term Career Aspirations"
                {...register("longTermCareerAspirations", {
                    required: REQUIRED_MSG
                })}
                error={errors.longTermCareerAspirations}
            />

            <Input
                label="Expectations from the Study Abroad Experience"
                {...register("studyAbroadExpectations", {
                    required: REQUIRED_MSG
                })}
                error={errors.studyAbroadExpectations}
            />

            <div style={{ textAlign: "right", marginTop: "32px" }}>
                <a onClick={() => changeSteps(3)} style={{ marginRight: "30px", fontWeight: "600", cursor: "pointer" }}>
                    <i className="fa fa-angle-left ml-2"></i> Back
                </a>
                <button className="btn btn-outline-dark" style={{ border: "1px solid #000" }} type="submit">Next Question <i className="fa fa-angle-right ml-2"></i></button>
            </div>
        </form>
    )
}

export default Step4