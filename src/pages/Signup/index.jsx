import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"

import Input from '../../components/FromElements/Input'
import SubmitBtn from '../../components/FromElements/SubmitBtn'
import { REQUIRED_MSG } from "../../constants"
import { registerUser } from '../../services/auth'
import { errorToast, successToast } from '../../components/ToasterAlert'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin } from '../../redux/features/AuthSlice'

const Signup = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors } } = useForm();

    const handleRegister = async (data) => {
        // console.log("data >>", data);
        setIsSubmitting(true);
        try {
            const response = await registerUser(data);
            // console.log("response >>", response);
            successToast(response.data.message)
            dispatch(authLogin(response.data))
        } catch (error) {
            // console.log(error);
            error && errorToast(error.response && error.response.data.message || "Something went wrong, please try again later")
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <main className="site-main page-wrapper woocommerce single single-product">
                <section className="space-3">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="woocommerce-notices-wrapper"></div>
                                <h2 className="font-weight-bold mb-4 text-center">Register</h2>
                                <form onSubmit={handleSubmit(handleRegister)} className="woocommerce-form woocommerce-form-login login">
                                    <Input
                                        label="Full Name"
                                        {...register("fullName", {
                                            required: REQUIRED_MSG,
                                            minLength: {
                                                value: 2,
                                                message: "Please enter at least two letters"
                                            },
                                            maxLength: {
                                                value: 40,
                                                message: "Please enter at most 40 characters"
                                            }
                                        })}
                                        error={errors.name}
                                    />
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        {...register("email", {
                                            required: REQUIRED_MSG
                                        })}
                                        error={errors.email}
                                    />

                                    {/* <Input
                                        label="Phone Number"
                                        type="number"
                                        {...register("number", {
                                            required: REQUIRED_MSG
                                        })}
                                        error={errors.email}
                                    />

                                    <Input
                                        label="Date of Birth"
                                        type="date"
                                        {...register("dob", {
                                            required: REQUIRED_MSG
                                        })}
                                        error={errors.email}
                                    /> */}

                                    <Input
                                        label="Password"
                                        type="password"
                                        {...register("password", {
                                            required: REQUIRED_MSG,
                                            minLength: {
                                                value: 8,
                                                message: "Minimum password length is 8"
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: "Maximum password length is 30"
                                            }
                                        })}
                                        error={errors.password}
                                    />
                                    <p className="form-row">
                                        <SubmitBtn isLoading={isSubmitting}>Register</SubmitBtn>
                                    </p>
                                    <p className="woocommerce-LostPassword lost_password">
                                        Already have an account? <Link to="/login">Login here</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Signup