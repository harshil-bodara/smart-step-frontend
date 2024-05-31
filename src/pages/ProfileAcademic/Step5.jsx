import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Input from '../../components/FromElements/Input'
import { deepEqual } from '../../utils';
import { updateProfile } from '../../services/auth';
import { REQUIRED_MSG } from '../../constants';
import { useDispatch } from 'react-redux';
import { updateTotalCompletedTask } from '../../redux/features/UserSlice';

const Step5 = ({ changeSteps, academicData }) => {

    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    const handdleProfileUpdate = async (data) => {
        if (academicData.additionalInformation && !deepEqual(data, academicData.additionalInformation)) {
            profileUpdateEP(data);
            return;
        } else if (!academicData.additionalInformation) {
            profileUpdateEP(data);
            return;
        }
        changeSteps(6)
    }

    useEffect(() => {
        if (academicData.additionalInformation) {
            setValue("shortTermStudyGoals", academicData.additionalInformation.shortTermStudyGoals)
            setValue("longTermCareerAspirations", academicData.additionalInformation.longTermCareerAspirations)
            setValue("studyAbroadExpectations", academicData.additionalInformation.studyAbroadExpectations)
        }
    }, [academicData]);

    // EP

    const profileUpdateEP = async (data) => {
        try {
            // console.log("data >", data);
            const response = await updateProfile({ additionalInformation: data });
            changeSteps(6)
            dispatch(updateTotalCompletedTask(5))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handdleProfileUpdate)}>

            <Input
                label="Any Special Requirements or Considerations"
                isAsterisk={false}
                {...register("shortTermStudyGoals", {
                    required: REQUIRED_MSG
                })}
                error={errors.shortTermStudyGoals}
            />

            <Input
                label="Previous Study Abroad Experience (if applicable)"
                isAsterisk={false}
                {...register("shortTermStudyGoals", {
                    required: REQUIRED_MSG
                })}
                error={errors.shortTermStudyGoals}
            />

            <Input
                label="Any Other Comments or Preferences"
                {...register("shortTermStudyGoals", {
                    required: REQUIRED_MSG
                })}
                error={errors.shortTermStudyGoals}
            />

            <div style={{ textAlign: "right", marginTop: "32px" }}>
                <a onClick={() => changeSteps(4)} style={{ marginRight: "30px", fontWeight: "600", cursor: "pointer" }}>
                    <i className="fa fa-angle-left ml-2"></i> Back
                </a>
                <button className="btn btn-outline-dark" style={{ border: "1px solid #000" }} type="submit">Next Question <i className="fa fa-angle-right ml-2"></i></button>
            </div>
        </form>
    )
}

export default Step5