import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import moment from "moment";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import 'react-loading-skeleton/dist/skeleton.css'

import ProgressBar from "@ramonak/react-progress-bar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { getAppliedUniversities, getMatchUniversityScore, getUniversityDetails, randomAgentAssigned, withdrawAppliedRequest } from '../../services/university';
import ScoreMatch from './ScoreMatch';
import { useSelector } from 'react-redux';
import AskToLogin from './AskToLogin';
import ScoreResult from './ScoreResult';
import UpdateScoreMatch from './UpdateScoreMatch';
import { errorToast, successToast } from '../../components/ToasterAlert';

const UniversityDetails = () => {

    const loggedInStatus = useSelector(state => state.auth.isLoggedIn);
    const totalCompletedTask = useSelector(state => state.user.totalCompletedTask);

    const navigate = useNavigate();

    const [university, setUniversity] = useState(null);
    const [enteredScoreData, setEnteredScoreData] = useState(null);
    const [scoreMatchResult, setScoreMatchResult] = useState(null);
    const [appliedToUniversity, setAppliedToUniversity] = useState(false);

    const { slug } = useParams();

    const matchButtonRef = useRef();
    const closeMatchModalRef = useRef();
    const closeUpdateMatchModalRef = useRef();

    useEffect(() => {
        if (slug) {
            fetchUniversityDetails();
            loggedInStatus && fetchScoreMatch();
        }
    }, [slug])

    useEffect(() => {
        !loggedInStatus && setScoreMatchResult(null);
        !loggedInStatus && setEnteredScoreData(null);
        !loggedInStatus && setAppliedToUniversity(null);
    }, [loggedInStatus])

    useEffect(() => {
        (totalCompletedTask === 6 && university) && fetchAppliedUniversities();
    }, [totalCompletedTask, university]);

    const handleApply = () => {
        const data = { university_id: university._id };
        applyToUniversity(data);
    }

    // EP
    const fetchUniversityDetails = async () => {
        try {
            const response = await getUniversityDetails(slug);
            setUniversity(response.data);
        } catch (error) {
            console.log("error >>", error);
            errorToast(error?.response?.data?.error)
            navigate("/explore");
        }
    }

    const fetchScoreMatch = async () => {
        try {
            const response = await getMatchUniversityScore();
            setEnteredScoreData(response.data.data[0].userEnteredData);
            setScoreMatchResult(response.data.data[0].result);
        } catch (error) {
            console.log("error >>", error);
        }
    }

    const applyToUniversity = async (data) => {
        try {
            await randomAgentAssigned(data);
            successToast("Applied to university successfully");
            fetchAppliedUniversities();
        } catch (error) {
            console.log("error >>", error);
        }
    }

    const fetchAppliedUniversities = async () => {
        try {
            const response = await getAppliedUniversities();
            const universities = response.data.universities;
            const isApplied = universities.find((data) => data._id === university._id) ? true : false;
            setAppliedToUniversity(isApplied);
        } catch (error) {
            console.log(error);
        }
    }

    const withdrawRequest = async () => {
        try {
            const data = { university_id: university._id }
            await withdrawAppliedRequest(data);
            fetchAppliedUniversities();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <section className="page-wrapper edutim-course-single course-single-style-3">
                <div className="course-single-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="course-single-header white-text">
                                    {university?.tags && <span className="subheading">{university?.tags?.join(", ")}</span>}
                                    <h3 className="single-course-title">{university?.university_name || <Skeleton />}</h3>

                                    <p>{university?.about_short_content || <Skeleton count={3} />}</p>
                                    <div className="d-flex align-items-center" style={{ gap: 16 }}>
                                        <div className="single-top-meta d-flex align-items-center">
                                            <FaRegPaperPlane />{university?.apply_date && <><span style={{ fontSize: 20 }}> {moment(university?.apply_date).format("MMM YYYY")}</span> &nbsp;(Apply date)</> || <Skeleton style={{ minWidth: 70 }} />}
                                        </div>
                                        <div className="single-top-meta d-flex align-items-center">
                                            <FaCalendarAlt />{university?.start_date && <><span style={{ fontSize: 20 }}> {moment(university?.start_date).format("MMM YYYY")}</span> &nbsp;(Start date)</> || <Skeleton style={{ minWidth: 70 }} />}
                                        </div>
                                    </div>
                                    {(totalCompletedTask === 6 && !appliedToUniversity) && <button
                                        href="#"
                                        className={`btn btn-main mt-3`}
                                        onClick={handleApply}
                                    >
                                        Apply
                                    </button>}
                                    {appliedToUniversity && <button
                                        href="#"
                                        className={`btn btn-main mt-3`}
                                        onClick={withdrawRequest}
                                    >
                                        Withdraw Request
                                    </button>}
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className="course-sidebar">
                                    <div className="course-single-thumb">
                                        <img src="assets/images/course/course2.jpg" alt="" className="img-fluid w-100" />

                                        <div className="course-price-wrapper">
                                            <div className="course-price">
                                                <h4><FaMoneyCheck style={{ marginRight: 8 }} /><span style={{ fontSize: 36 }}>${university?.tuition_fees}</span>/year</h4>
                                            </div>
                                            <p className="text-info"><MdAccessTimeFilled style={{ marginRight: 16, fontSize: 22 }} />1½ years</p>
                                            <div className="buy-btn">
                                                <a
                                                    href="#"
                                                    className={`btn btn-main btn-block ${scoreMatchResult && "d-none"}`}
                                                    data-toggle="modal"
                                                    data-target="#exampleModal"
                                                    ref={matchButtonRef}
                                                >
                                                    Check your match
                                                </a>
                                            </div>
                                            {scoreMatchResult && <div className="buy-btn">
                                                <a
                                                    href="#"
                                                    className="btn btn-main btn-block"
                                                    data-toggle="modal"
                                                    data-target="#showScoreModal"
                                                >
                                                    Result
                                                </a>
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="course-single-tabs">
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-key-info-tab" data-toggle="tab" href="#nav-key-info" role="tab" aria-controls="nav-home" aria-selected="true">Key Information</a>
                                    <a className="nav-item nav-link" id="nav-overview-tab" data-toggle="tab" href="#nav-overview" role="tab" aria-controls="nav-profile" aria-selected="false">Overview</a>
                                    <a className="nav-item nav-link" id="nav-programme-structure-tab" data-toggle="tab" href="#nav-programme-structure" role="tab" aria-controls="nav-contact" aria-selected="false">Programme Structure</a>
                                    <a className="nav-item nav-link" id="nav-academic-requirements-tab" data-toggle="tab" href="#nav-academic-requirements" role="tab" aria-controls="nav-contact" aria-selected="false">Academic requirements</a>
                                    <a className="nav-item nav-link" id="nav-fees-tab" data-toggle="tab" href="#nav-fees" role="tab" aria-controls="nav-contact" aria-selected="false">Fees and funding </a>
                                    <a className="nav-item nav-link" id="nav-scholarships-tab" data-toggle="tab" href="#nav-scholarships" role="tab" aria-controls="nav-contact" aria-selected="false">Scholarships </a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-key-info" role="tabpanel" aria-labelledby="nav-key-info-tab">
                                    <div className="single-course-details ">
                                        <h4 className="course-title">Key information</h4>

                                        <div>
                                            <h5 className='mb-2'>Duration</h5>
                                            <div className='mt-1'>
                                                <p>Full-Time : {university?.duration?.full_time_months} Months </p>
                                            </div>
                                        </div>

                                        <hr className='my-4' />

                                        <div>
                                            <h5 className='mb-2'>Start dates & application deadlines</h5>
                                            <div className='mt-1'>
                                                <p>Starting : {moment(university?.start_date).format("MMMM YYYY")} </p>
                                            </div>
                                        </div>

                                        <hr className='my-4' />
                                        <div>
                                            <h5 className="">English requirements</h5>
                                            <div className='mt-4'>
                                                <table style={{ gap: 40 }} className='w-50'>
                                                    {university?.english_requirements.map((english, index) => <tr key={index}>
                                                            <td className='pb-2'>
                                                                <h5 style={{ letterSpacing: 0.8 }}><FaLanguage />&nbsp; {english?.title}</h5>
                                                            </td>
                                                            <td className='pb-2'>
                                                                <p className='m-0'>{english?.score}</p>
                                                            </td>
                                                        </tr>)}
                                                </table>
                                            </div>
                                        </div>

                                        <hr className='my-4' />

                                        <div>
                                            <h5 className='mb-2'>Disciplines</h5>
                                            <div className='mt-1'>
                                                {university?.disciplines.map((discipline, index) => <p key={index} className='m-0'>{discipline.name}</p>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="nav-overview" role="tabpanel" aria-labelledby="nav-overview-tab">
                                    <div className="edutim-single-course-segment  edutim-course-topics-wrap">
                                        <div className="edutim-course-topics-header d-lg-flex justify-content-between">
                                            <div className="edutim-course-topics-header-left">
                                                <h4 className="course-title">Overview</h4>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className='mb-2'>Key Facts</h5>
                                            <div className='mt-1'>
                                                <p>{university?.overview}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-programme-structure" role="tabpanel" aria-labelledby="nav-programme-structure-tab">
                                    <div className="edutim-single-course-segment  edutim-course-topics-wrap">
                                        <div className="edutim-course-topics-header d-lg-flex justify-content-between">
                                            <div className="edutim-course-topics-header-left">
                                                <h4 className="course-title">Programme Structure</h4>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className='mb-2'>Courses include</h5>
                                            <div className='mt-1'>
                                                <p>{university?.course_include}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-academic-requirements" role="tabpanel" aria-labelledby="nav-academic-requirements-tab">
                                    <div className="course-widget course-info">
                                        <h4 className="course-title">Academic requirements</h4>

                                        <div>
                                            <div className='mt-1'>
                                                <p>We are not aware of any specific GRE, GMAT or GPA grading score requirements for this programme.</p>
                                            </div>
                                        </div>

                                        <hr className='my-4' />

                                        <div>
                                            <h4 className="">English requirements</h4>
                                            <div className='mt-4'>
                                                <table style={{ gap: 40 }} className='w-50'>
                                                    {university?.english_requirements.map((english, index) => <tr key={index}>
                                                            <td className='pb-2'>
                                                                <h5 style={{ letterSpacing: 0.8 }}><FaLanguage />&nbsp; {english?.title}</h5>
                                                            </td>
                                                            <td className='pb-2'>
                                                                <p className='m-0'>{english?.score}</p>
                                                            </td>
                                                        </tr>)}
                                                </table>
                                            </div>
                                        </div>

                                        <hr className='my-4' />
                                        <div>
                                            <h4 className="">Student insurance</h4>
                                            <div className='mt-4'>
                                                <p>{university?.student_insurance}</p>
                                            </div>
                                        </div>

                                        <hr className='my-4' />
                                        <div>
                                            <h4 className="">Other requirements</h4>
                                            <div className='mt-4'>
                                                <p>{university?.other_requirements}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-fees" role="tabpanel" aria-labelledby="nav-fees-tab">
                                    <div className="edutim-single-course-segment  edutim-course-topics-wrap">
                                        <div className="edutim-course-topics-header d-lg-flex justify-content-between">
                                            <div className="edutim-course-topics-header-left">
                                                <h4 className="course-title">Fees and funding</h4>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className='mb-2'>Tuition Fee</h5>
                                            <div className='mt-3'>
                                                <div className="d-flex align-items-center btn btn-secondary" style={{ width: "fit-content" }}><h5 style={{ letterSpacing: 0.6, color: "inherit" }}><FaMoneyCheck style={{ marginRight: 8 }} />${university?.tuition_fees}<span style={{ fontSize: 16, fontWeight: 500 }}>/year</span></h5></div>
                                            </div>
                                        </div>

                                        <hr className='my-4' />
                                        <div>
                                            <h5 className='mb-2'>Living costs</h5>
                                            <div className='mt-3'>
                                                <div className="d-flex align-items-center btn btn-secondary" style={{ width: "fit-content" }}><h5 style={{ letterSpacing: 0.6, color: "inherit" }}><FaMoneyCheck style={{ marginRight: 8 }} />${university?.tuition_fees}<span style={{ fontSize: 16, fontWeight: 500 }}>/year</span></h5></div>
                                                <p style={{ lineHeight: "20px", marginTop: 6 }}>The living costs include the total expenses per month, covering accommodation, public transportation, utilities (electricity, internet), books and groceries.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-scholarships" role="tabpanel" aria-labelledby="nav-scholarships-tab">
                                    <div className="edutim-single-course-segment  edutim-course-topics-wrap">
                                        <div className="edutim-course-topics-header d-lg-flex justify-content-between">
                                            <div className="edutim-course-topics-header-left">
                                                <h4 className="course-title">Scholarships Information</h4>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='mt-1'>
                                                <p>{university?.scholarships_information}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {loggedInStatus ? (scoreMatchResult ? <UpdateScoreMatch
                slug={slug}
                university={university}
                scoreData={enteredScoreData}
                closeRef={closeUpdateMatchModalRef}
                fetchScoreMatch={fetchScoreMatch}
            /> : <ScoreMatch
                slug={slug}
                university={university}
                closeRef={closeMatchModalRef}
                fetchScoreMatch={fetchScoreMatch}
            />) : <AskToLogin />}

            {scoreMatchResult && <ScoreResult
                matchButtonRef={matchButtonRef}
                scoreMatchResult={scoreMatchResult}
                university={university}
            />}

        </>
    )
}

export default UniversityDetails