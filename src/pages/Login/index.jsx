import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import Input from '../../components/FromElements/Input'
import SubmitBtn from '../../components/FromElements/SubmitBtn'
import { REQUIRED_MSG } from "../../constants"
import { loginUser, registerUser } from '../../services/auth'
import { errorToast, successToast } from '../../components/ToasterAlert'
import { useDispatch } from 'react-redux'
import { authLogin } from '../../redux/features/AuthSlice'

const Login = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const { handleSubmit, register , formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await loginUser(data);
            successToast(response.data.message)
            dispatch(authLogin(response.data))
        } catch (error) {
            errorToast(error.response.data.message)
        } finally{
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
                                <h2 className="font-weight-bold mb-4 text-center">Login</h2>
                                <form className="woocommerce-form woocommerce-form-login login" onSubmit={handleSubmit(handleLogin)}>
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        {...register("email", {
                                            required: REQUIRED_MSG
                                        })}
                                        error={errors.email}
                                    />
                                    <Input
                                        label="Password"
                                        type="password"
                                        {...register("password", {
                                            required: REQUIRED_MSG
                                        })}
                                        error={errors.password}
                                    />
                                    <p className="form-row">
                                        <SubmitBtn isLoading={isSubmitting}>Login</SubmitBtn>
                                    </p>
                                    <p className="woocommerce-LostPassword lost_password">
                                        Don't have an account yet? <Link to="/signup">Register here</Link>
                                    </p>
                                </form>
                            </div>
                            {/* <div className="col-md-6">
                                <h2 className="font-weight-bold mb-4">Register</h2>
                                <form method="post" className="woocommerce-form woocommerce-form-register register">

                                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                        <label>User Name&nbsp;<span className="required">*</span></label>
                                        <input type="email" className="woocommerce-Input woocommerce-Input--text input-text form-control" name="user-name" id="" autocomplete="user-name" value="" />
                                    </p>
                                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                        <label>Email address&nbsp;<span className="required">*</span></label>
                                        <input type="email" className="woocommerce-Input woocommerce-Input--text input-text form-control" name="email" id="" autocomplete="email" value="" />
                                    </p>
                                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                        <label>Password&nbsp;<span className="required">*</span></label>
                                        <input type="password" className="woocommerce-Input woocommerce-Input--text input-text form-control" name="password" id="" autocomplete="password" value="" />
                                    </p>
                                    <p className="woocommerce-FormRow form-row">
                                        <input type="hidden" id="woocommerce-register-nonce" name="woocommerce-register-nonce" value="b1c661ab82" /><input type="hidden" name="_wp_http_referer" value="/my-account/" />
                                        <button type="submit" className="woocommerce-Button button" name="register" value="Register">Register</button>
                                    </p>
                                </form>
                            </div> */}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login