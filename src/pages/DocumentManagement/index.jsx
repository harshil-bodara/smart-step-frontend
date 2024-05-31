import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';

import ProfileLayout from '../../components/Layout/ProfileLayout'
import Input from '../../components/FromElements/Input'
import SubmitBtn from '../../components/FromElements/SubmitBtn'
import { REQUIRED_MSG } from "../../constants"
import { getProfile, uploadDocument } from '../../services/auth'
import { updateUserProfile } from '../../redux/features/UserSlice';

const DocumentManagement = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userProfile);
    // console.log("user >>", user);

    const { handleSubmit, register , formState: { errors } } = useForm();

    const handleDocumentUpload = (data) => {
        console.log("data >>", data);
        const fileData = {};
        data.passport[0] && (fileData.passport = data.passport[0]);
        data.secondary[0] && (fileData.secondary = data.secondary[0]);
        data.senior[0] && (fileData.senior = data.senior[0]);
        if(data.bachelor){
            fileData["bachelor"] = data.bachelor[0]
            delete data.bachelor;
        }
        delete data.passport;
        delete data.secondary;
        delete data.senior;
        
        if(data && Object.keys(data).length > 0){
            Object.keys(data).forEach(file => {
                fileData[file] = data[file][0]
            });
        }
        
        uploadUserDocument(fileData);
    }

    const isRequired = (fileName) => {
        
        if(user[fileName]){
            return {}
        }
        return {
            required: REQUIRED_MSG
        }
    }

    const isCustomRequired = (fileName) => {
        if(user.customDocuments && user.customDocuments.length > 0){
            const documentObject = user.customDocuments.find(document => document.name === fileName);
            return documentObject.path === "" ? { required: REQUIRED_MSG } : {};
        }
        return { required: REQUIRED_MSG };
    }

    // EP
    const uploadUserDocument = async (data) => {
        console.log("fileData >>", data);
        // return;
        try {
            const response = await uploadDocument(data);
            fetchProfile();
        } catch (error) {
            console.log("error >>", error);
        }
    }

    const fetchProfile = async () => {
        try {
            const response = await getProfile()
            dispatch(updateUserProfile(response.data.user));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ProfileLayout>
                <div className="card mb-3">
                    <div className="card-body">
                        <h3 className='mb-3'>Document Management</h3>
                        <form onSubmit={handleSubmit(handleDocumentUpload)}>
                            <Input
                                type="file"
                                label="Passport"
                                // multiple
                                {...register("passport", {
                                    ...isRequired("passport")
                                })}
                                error={errors.passport}
                            />
                            {user?.passport && <a style={{ marginTop: "-10px" }} className='d-block mb-3' href={`${process.env.REACT_APP_SITE_URL}/${user.passport}`} target="_blank">Download Passport</a>}

                            <Input
                                type="file"
                                label="Secondary School Certificate"
                                {...register("secondary", {
                                    ...isRequired("secondary")
                                })}
                                error={errors.secondary}
                            />
                            {user?.secondary && <a style={{ marginTop: "-10px" }} className='d-block mb-3' href={`${process.env.REACT_APP_SITE_URL}/${user.secondary}`} target="_blank">Download Secondary Document</a>}

                            <Input
                                type="file"
                                label="Year 12 Certificate"
                                {...register("senior", {
                                    ...isRequired("senior")
                                })}
                                error={errors.senior}
                            />
                            {user?.senior && <a style={{ marginTop: "-10px" }} className='d-block mb-3' href={`${process.env.REACT_APP_SITE_URL}/${user.senior}`} target="_blank">Download Senior Document</a>}

                            {user?.academicBackground && user?.academicBackground?.highestEducation !== "High School" && <>
                                <Input
                                    type="file"
                                    label="bachelor's degree Certificate"
                                    {...register("bachelor", {
                                        ...isRequired("bachelor")
                                    })}
                                    error={errors.bachelor}
                                />
                                {user?.bachelor && <a style={{ marginTop: "-10px" }} className='d-block mb-3' href={`${process.env.REACT_APP_SITE_URL}/${user.bachelor}`} target="_blank">Download Bachelor Document</a>}
                            </>}

                            {user?.customDocuments && user?.customDocuments.length > 0 && user?.customDocuments.map((customDoc, index) => <React.Fragment key={index}>
                                <Input
                                    type="file"
                                    label={customDoc.name}
                                    {...register(customDoc.name, {
                                        ...isCustomRequired(customDoc.name)
                                    })}
                                    error={errors[customDoc.name]}
                                />
                                {customDoc?.path && <a style={{ marginTop: "-10px" }} className='d-block mb-3' href={`${process.env.REACT_APP_SITE_URL}/${customDoc.path}`} target="_blank">Download {customDoc.name}</a>}
                            </React.Fragment>)}

                            <div style={{ textAlign: "right", marginTop: "32px" }}>
                                <SubmitBtn>Save</SubmitBtn>
                            </div>

                        </form>
                    </div>
                </div>
            </ProfileLayout>
        </>
    )
}

export default DocumentManagement