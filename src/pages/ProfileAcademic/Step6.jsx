import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

import Checkbox from '../../components/FromElements/Checkbox'
import { REQUIRED_MSG } from '../../constants';
import { updateProfile } from '../../services/auth';
import { deepEqual } from '../../utils';
import { updateTotalCompletedTask } from '../../redux/features/UserSlice';
import { useDispatch } from 'react-redux';

const Step6 = ({ changeSteps, academicData }) => {

    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    const handdleProfileUpdate = async (data) => {
        console.log("data >>", data);
        if (academicData.additionalInformation && !deepEqual(data, academicData.additionalInformation)) {
            profileUpdateEP(data);
            return;
        } else if (!academicData.additionalInformation) {
            profileUpdateEP(data);
            return;
        }
        // changeSteps(6)
    }

    useEffect(() => {
        if (academicData.consentAndAgreement) {
            setValue("consentToUsePersonalInformation", academicData.consentAndAgreement.consentToUsePersonalInformation)
            setValue("termsAndConditionsAgreement", academicData.consentAndAgreement.termsAndConditionsAgreement)
        }
    }, [academicData]);

    // EP

    const profileUpdateEP = async (data) => {
        try {
            console.log("data >", data);
            const response = await updateProfile({ consentAndAgreement: data });
            // changeSteps(3)
            dispatch(updateTotalCompletedTask(6))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handdleProfileUpdate)}>

            <Checkbox
                label="ConsentConsent to Use Personal Information for University Recommendation"
                {...register("consentToUsePersonalInformation", {
                    required: REQUIRED_MSG
                })}
                error={errors.consentToUsePersonalInformation}
            />

            <Checkbox
                label="Terms and Conditions Agreement"
                {...register("termsAndConditionsAgreement", {
                    required: REQUIRED_MSG
                })}
                error={errors.termsAndConditionsAgreement}
            />

            <div style={{ textAlign: "right", marginTop: "32px" }}>
                <a onClick={() => changeSteps(5)} style={{ marginRight: "30px", fontWeight: "600", cursor: "pointer" }}>
                    <i className="fa fa-angle-left ml-2"></i> Back
                </a>
                <button className="btn btn-outline-dark" style={{ border: "1px solid #000" }} type="submit">Finish <i className="fa fa-angle-right ml-2"></i></button>
            </div>
        </form>
    )
}

export default Step6