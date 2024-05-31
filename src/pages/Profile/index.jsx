import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import ProfileLayout from '../../components/Layout/ProfileLayout'
import Input from '../../components/FromElements/Input'
import Select from '../../components/FromElements/Select'
import { updateProfile } from '../../services/auth'
import { REQUIRED_MSG } from '../../constants'
import { useSelector } from 'react-redux'
import SubmitBtn from '../../components/FromElements/SubmitBtn'

const Profile = () => {

    const user = useSelector(state => state.user.userProfile)

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        setValue("fullName", user?.fullName);
        setValue("phoneNumber", user?.phoneNumber);
        setValue("dob", user?.dob);
    }, [user])

    // EP
    const profileUpdateEP = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await updateProfile(data);
        } catch (error) {
            console.log(error);
        } finally{
            setIsSubmitting(false);
        }
    }

    return (
        <ProfileLayout>
            <div className="card mb-3">
                <div className="card-body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3>Update Profile</h3>
                    </div>
                    <hr />

                    <form onSubmit={handleSubmit(profileUpdateEP)}>

                        <Input
                            label="Full Name"
                            placeholder="Full name"
                            {...register("fullName", {
                                
                            })}
                            error={errors.fullName}
                        />

                        <Input
                            label="Email"
                            disabled={true}
                            placeholder="email"
                            isAsterisk={false}
                            value={user?.email}
                        />

                        <Input
                            label="Phone Number"
                            isAsterisk={false}
                            {...register("phoneNumber", {

                            })}
                            error={errors.phoneNumber}
                        />

                        <Input
                            label="Date of Birth"
                            isAsterisk={false}
                            type="date"
                            {...register("dob", {

                            })}
                            error={errors.dob}
                        />

                        <div style={{ marginTop: "32px" }}>
                            {/* <button className="btn btn-outline-dark" style={{ border: "1px solid #000" }} type="submit">Update</button> */}
                            <SubmitBtn isLoading={isSubmitting}>Update</SubmitBtn>
                        </div>
                    </form>
                </div>
            </div>
        </ProfileLayout>
    )
}

export default Profile