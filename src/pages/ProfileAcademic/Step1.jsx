import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import Select from '../../components/FromElements/Select'
import Input from '../../components/FromElements/Input'
import { EDUCATION_LEVEL, REQUIRED_MSG } from '../../constants'
import { updateProfile } from '../../services/auth'
import { deepEqual } from '../../utils'
import { updateTotalCompletedTask } from '../../redux/features/UserSlice'

const Step1 = ({ changeSteps, academicData }) => {

    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    const handdleProfileUpdate = async (data) => {
        if(academicData.academicBackground && !deepEqual(data, academicData.academicBackground) ){
            profileUpdateEP(data);
            return;
        }else if(!academicData.academicBackground){
            profileUpdateEP(data);
            return;
        }
        changeSteps(2)
    }

    useEffect(() => {
        if (academicData.academicBackground) {
            setValue("highestEducation", academicData.academicBackground.highestEducation)
            setValue("currentInstitution", academicData.academicBackground.currentInstitution)
            setValue("fieldOfStudy", academicData.academicBackground.fieldOfStudy)
            setValue("graduationYear", academicData.academicBackground.graduationYear)
        }
    }, [academicData]);

    // EP

    const profileUpdateEP = async (data) => {
        try {
            const response = await updateProfile({ academicBackground: data });
            changeSteps(2)
            dispatch(updateTotalCompletedTask(1))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handdleProfileUpdate)}>
            <Select
                label="Highest Level of Education Completed"
                options={EDUCATION_LEVEL}
                {...register("highestEducation", {
                    required: REQUIRED_MSG
                })}
                error={errors.highestEducation}
            />

            <Input
                label="Current Institution (if applicable)"
                placeholder="Current institution"
                isAsterisk={false}
                {...register("currentInstitution", {

                })}
            />

            <Input
                label="Field of Study/Major (if applicable)"
                placeholder="Study/Major"
                isAsterisk={false}
                {...register("fieldOfStudy", {

                })}
            />

            <Input
                label="Year of Graduation or Expected Graduation"
                isAsterisk={false}
                type="month"
                {...register("graduationYear", {
                    required: REQUIRED_MSG
                })}
                error={errors.graduationYear}
            />

            <div style={{ textAlign: "right", marginTop: "32px" }}>
                <button className="btn btn-outline-dark" style={{ border: "1px solid #000" }} type="submit">Next Question <i className="fa fa-angle-right ml-2"></i></button>
            </div>
        </form>
    )
}

export default Step1