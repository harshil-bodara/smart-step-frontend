import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import 'react-loading-skeleton/dist/skeleton.css'

import { getDiscipline, matchUniversityScore } from '../../services/university';
import { AUS_STATES, ENGLISH_TEST, ENGLISH_TEST_SCORES, GRADE_GPA, GRADE_GPA_PERCENTAGE } from '../../constants/University';
import { IMG_ACADEMIC, IMG_BUDGET, IMG_ENGLISH } from '../../components/Images';
import { errorToast } from '../../components/ToasterAlert';

const ScoreMatch = ({ slug, university, closeRef, fetchScoreMatch }) => {

    const [disciplineData, setDisciplineData] = useState([]);
    const [activeStep, setActiveStep] = useState(1);
    const [scoreMatchData, setScoreMatchData] = useState({
        1: {
            min_degree: ""
        },
        2: {
            institute_location: "",
            institute_attended: ""
        },
        3: {
            discipline: ""
        },
        4: {
            average_grade: ""
        },
        5: {
            min_experience: ""
        },
        6: {
            title: "",
            score: ""
        },
        7: {
            tuition_budget: ""
        },
        8: {
            living_cost_budget: ""
        }
    });

    const backStep = () => {
        setActiveStep(activeStep - 1)
    }

    const nextStep = (e) => {
        let isValidated = true;
        e.preventDefault();
        const currentStepData = scoreMatchData[activeStep];

        if (!currentStepData) {
            isValidated = false;
            errorToast("Please fill the required data");
            return false;
        }

        Object.values(currentStepData).forEach(data => {
            if (data === '') {
                isValidated = false;
                return false;
            }
        });

        if (!isValidated) {
            errorToast("Please fill the required data");
            return;
        }

        if (activeStep === 6) {
            const scoreObject = ENGLISH_TEST_SCORES[scoreMatchData[6].title];
            const userScore = Number(scoreMatchData[6].score);
            console.log("userScore >>", userScore);

            if (isNaN(userScore) || userScore < scoreObject.min || userScore > scoreObject.max) {
                errorToast(`Enter a score between ${ENGLISH_TEST_SCORES[scoreMatchData[6].title].min} and ${ENGLISH_TEST_SCORES[scoreMatchData[6].title].max}`);
                return false;
            }
        }

        setActiveStep(activeStep + 1)
    }

    const actionBtnStyle = { fontWeight: 700, display: "flex", alignItems: "center", gap: 4 };

    const handleDegree = (e) => setScoreMatchData({
        ...scoreMatchData,
        1: { min_degree: e.target.value }
    });

    const handleExperience = (e) => setScoreMatchData({
        ...scoreMatchData,
        5: { min_experience: e.target.value }
    });

    const handleScoreSubmit = () => {
        const data = {
            "university_id": university._id,
            "institute_attended": scoreMatchData[2].institute_attended,
            "institute_location": scoreMatchData[2].institute_location,
            "discipline": scoreMatchData[3].discipline,
            "min_degree": scoreMatchData[1].min_degree,
            "min_experience": scoreMatchData[5].min_experience,
            "average_grade": scoreMatchData[4].average_grade,
            "english_level": {
                "title": scoreMatchData[6].title,
                "score": scoreMatchData[6].score
            },
            "tuition_budget": scoreMatchData[7].tuition_budget,
            "living_cost_budget": scoreMatchData[8].living_cost_budget
        }

        userMatchScore(data);
    }

    useEffect(() => {
        if (slug) {
            fetchDiscipline();
        }
    }, [slug])

    // EP
    const userMatchScore = async (data) => {
        try {
            const response = await matchUniversityScore(data);
            closeRef.current.click();
            fetchScoreMatch();
        } catch (error) {
            console.log("error >", error);
        }
    }

    const fetchDiscipline = async () => {
        try {
            const response = await getDiscipline();
            setDisciplineData(response.data);
        } catch (error) {
            console.log("error >", error);
        }
    }

    return (
        <>
            <div style={{ zIndex: 99999999999 }} className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button ref={closeRef} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="modal-body">
                            <div className='score-match-form'>
                                <div data-step="1" className={`${activeStep === 1 ? "" : "d-none"}`}>
                                    <div className='top-image-block'>
                                        <img src={IMG_ACADEMIC} />
                                    </div>
                                    <div className='question'>
                                        Which <strong>degree</strong> will you have by the time you start your Master's?
                                    </div>
                                    <div className="radio-section mt-4">
                                        <div className="radio-list">
                                            <div className="radio-item">
                                                <input name="radio" id="degree_high" type="radio" value="High school diploma" onChange={handleDegree} />
                                                <label htmlFor="degree_high">High school diploma</label>
                                            </div>
                                            <div className="radio-item">
                                                <input name="radio" id="degree_bachelor" type="radio" value="Bachelor's degree" onChange={handleDegree} />
                                                <label htmlFor="degree_bachelor">Bachelor's degree</label>
                                            </div>
                                            <div className="radio-item">
                                                <input name="radio" id="degree_master" type="radio" value="Master's degree" onChange={handleDegree} />
                                                <label htmlFor="degree_master">Master's degree</label>
                                            </div>
                                            <div className="radio-item">
                                                <input name="radio" id="degree_phd" type="radio" value="Ph.D degree" onChange={handleDegree} />
                                                <label htmlFor="degree_phd">Ph.D degree</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-btns'>
                                        <a
                                            href='#'
                                            style={actionBtnStyle}
                                            onClick={nextStep}
                                        >
                                            Next <FaChevronRight style={{ fontSize: 14 }} />
                                        </a>
                                    </div>
                                </div>

                                <div data-step="2" className={`${activeStep === 2 ? "" : "d-none"}`}>
                                    <div className='top-image-block'>
                                        <img src={IMG_ACADEMIC} />
                                    </div>
                                    <div className='question'>
                                        Which <strong>university/school</strong> did you go to?
                                    </div>
                                    <div className='form-fields mt-4'>
                                        <div className="form-group">
                                            <label htmlFor="score_state">State </label>
                                            <select
                                                className="form-control"
                                                id="score_state"
                                                onChange={(e) => setScoreMatchData({ ...scoreMatchData, 2: { ...scoreMatchData[2], institute_location: e.target.value } })}
                                            >
                                                <option value="">Select State</option>
                                                {AUS_STATES.map((state, index) => <option key={index} value={state}>{state}</option>)}
                                                <option value="Other">Other</option>
                                            </select>
                                            {/* <input
                                                className='form-control mt-2'
                                                placeholder='Other state name'
                                                onChange={(e) => setScoreMatchData({ ...scoreMatchData, 2: { ...scoreMatchData[2], institute_location: e.target.value } })}
                                            /> */}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="score_state">Institution Name </label>
                                            <input
                                                className='form-control'
                                                onChange={(e) => setScoreMatchData({ ...scoreMatchData, 2: { ...scoreMatchData[2], institute_attended: e.target.value } })}
                                            />
                                        </div>
                                    </div>
                                    <div className='form-btns'>
                                        <a href='#' style={actionBtnStyle} onClick={backStep}><FaChevronLeft style={{ fontSize: 14 }} /> Back</a>
                                        <a href='#' style={actionBtnStyle} onClick={nextStep}>Next <FaChevronRight style={{ fontSize: 14 }} /></a>
                                    </div>
                                </div>

                                <div data-step="3" className={`${activeStep === 3 ? "" : "d-none"}`}>
                                    <div className='top-image-block'>
                                        <img src={IMG_ACADEMIC} />
                                    </div>
                                    <div className='question'>
                                        What <strong>discipline</strong> did you study? (or select the closest alternatives)
                                    </div>
                                    <div className='form-fields mt-4'>
                                        <div className="form-group">
                                            <label htmlFor="score_discipline">Discipline </label>
                                            <select
                                                className="form-control"
                                                id="score_discipline"
                                                onChange={(e) => setScoreMatchData({ ...scoreMatchData, 3: { discipline: e.target.value } })}
                                            >
                                                <option value="">Select Discipline</option>
                                                {disciplineData.map((discipline, index) => <option key={index} value={discipline.id}>{discipline.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-btns'>
                                        <a href='#' style={actionBtnStyle} onClick={backStep}><FaChevronLeft style={{ fontSize: 14 }} /> Back</a>
                                        <a href='#' style={actionBtnStyle} onClick={nextStep}>Next <FaChevronRight style={{ fontSize: 14 }} /></a>
                                    </div>
                                </div>

                                <div data-step="4" className={`${activeStep === 4 ? "" : "d-none"}`}>
                                    <div className='top-image-block'>
                                        <img src={IMG_ACADEMIC} />
                                    </div>
                                    <div className='question'>
                                        What is your <strong>average grade</strong>?
                                    </div>
                                    <div className='form-fields mt-4'>
                                        <div>
                                            <label className='m-0' style={{ fontSize: 16, fontWeight: 500 }}>Grade Sustem</label>
                                            <p className='mt-0'>Australia - Common (Fail to High Distinction)</p>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="score_grade">Grade/GPA </label>
                                            <select
                                                className="form-control"
                                                id="score_grade"
                                                onChange={(e) => setScoreMatchData({ ...scoreMatchData, 4: { average_grade: e.target.value } })}
                                            >
                                                <option value="">Select Grade</option>
                                                {GRADE_GPA.map((grade, index) => <option key={index} value={grade}>{grade} {GRADE_GPA_PERCENTAGE[index]}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-btns'>
                                        <a href='#' style={actionBtnStyle} onClick={backStep}><FaChevronLeft style={{ fontSize: 14 }} /> Back</a>
                                        <a href='#' style={actionBtnStyle} onClick={nextStep}>Next <FaChevronRight style={{ fontSize: 14 }} /></a>
                                    </div>
                                </div>

                                <div data-step="5" className={`${activeStep === 5 ? "" : "d-none"}`}>
                                    <div className='top-image-block'>
                                        <img src={IMG_ACADEMIC} />
                                    </div>
                                    <div className='question'>
                                        How much relevant <strong>work experience</strong> do you have?
                                    </div>
                                    <div className='form-fields mt-4'>
                                        <div className="radio-section mt-4">
                                            <div className="radio-list">
                                                <div className="radio-item">
                                                    <input name="radio" id="degree_exp_no" type="radio" value="No experience" onChange={handleExperience} />
                                                    <label htmlFor="degree_exp_no">No experience </label>
                                                </div>
                                                <div className="radio-item">
                                                    <input name="radio" id="degree_exp_one" type="radio" value="1 Year" onChange={handleExperience} />
                                                    <label htmlFor="degree_exp_one">1 Year </label>
                                                </div>
                                                <div className="radio-item">
                                                    <input name="radio" id="degree_exp_two" type="radio" value="2 Year" onChange={handleExperience} />
                                                    <label htmlFor="degree_exp_two">2 Year </label>
                                                </div>
                                                <div className="radio-item">
                                                    <input name="radio" id="degree_exp_three_four" type="radio" value="3-4 Year" onChange={handleExperience} />
                                                    <label htmlFor="degree_exp_three_four">3-4 Year</label>
                                                </div>
                                                <div className="radio-item">
                                                    <input name="radio" id="degree_exp_five_plus" type="radio" value="5+ Year" onChange={handleExperience} />
                                                    <label htmlFor="degree_exp_five_plus">5+ Year </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-btns'>
                                        <a href='#' style={actionBtnStyle} onClick={backStep}><FaChevronLeft style={{ fontSize: 14 }} /> Back</a>
                                        <a href='#' style={actionBtnStyle} onClick={nextStep}>Next <FaChevronRight style={{ fontSize: 14 }} /></a>
                                    </div>
                                </div>

                                <div data-step="6" className={`${activeStep === 6 ? "" : "d-none"}`}>
                                    <div className='top-image-block'>
                                        <img src={IMG_ENGLISH} />
                                    </div>
                                    <div className='question'>
                                        What is your <strong>English level</strong>?
                                    </div>
                                    <div className='form-fields mt-4'>
                                        <div className="form-group">
                                            <label htmlFor="score_grade">English Test </label>
                                            <select
                                                className="form-control"
                                                id="score_grade"
                                                onChange={(e) => setScoreMatchData({ ...scoreMatchData, 6: { ...scoreMatchData[6], title: e.target.value } })}
                                            >
                                                <option value="">Select Test</option>
                                                {ENGLISH_TEST.map((test, index) => <option key={index} value={test}>{test}</option>)}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="score_grade">Score </label>
                                            <input
                                                className='form-control'
                                                onChange={(e) => setScoreMatchData({ ...scoreMatchData, 6: { ...scoreMatchData[6], score: e.target.value } })}
                                            />
                                            {scoreMatchData[6].title && <small>Enter a score between {ENGLISH_TEST_SCORES[scoreMatchData[6].title].min} and {ENGLISH_TEST_SCORES[scoreMatchData[6].title].max}</small>}
                                        </div>
                                    </div>
                                    <div className='form-btns'>
                                        <a href='#' style={actionBtnStyle} onClick={backStep}><FaChevronLeft style={{ fontSize: 14 }} /> Back</a>
                                        <a href='#' style={actionBtnStyle} onClick={nextStep}>Next <FaChevronRight style={{ fontSize: 14 }} /></a>
                                    </div>
                                </div>

                                <div data-step="7" className={`${activeStep === 7 ? "" : "d-none"}`}>
                                    <div className='top-image-block'>
                                        <img src={IMG_BUDGET} />
                                    </div>
                                    <div className='question'>
                                        How much can you spend on the <strong>tuition fee, yearly</strong>?
                                    </div>
                                    <div className='form-fields mt-4'>

                                        <div className="form-group">
                                            <input
                                                className='form-control'
                                                placeholder='Your budget'
                                                onChange={(e) => setScoreMatchData({ ...scoreMatchData, 7: { tuition_budget: e.target.value } })}
                                            />
                                        </div>
                                    </div>
                                    <div className='form-btns'>
                                        <a href='#' style={actionBtnStyle} onClick={backStep}><FaChevronLeft style={{ fontSize: 14 }} /> Back</a>
                                        <a href='#' style={actionBtnStyle} onClick={nextStep}>Next <FaChevronRight style={{ fontSize: 14 }} /></a>
                                    </div>
                                </div>

                                <div data-step="8" className={`${activeStep === 8 ? "" : "d-none"}`}>
                                    <div className='top-image-block'>
                                        <img src={IMG_BUDGET} />
                                    </div>
                                    <div className='question'>
                                        How much can you spend on <strong>living costs, monthly</strong>?
                                    </div>
                                    <div className='form-fields mt-4'>

                                        <div className="form-group">
                                            <input
                                                className='form-control'
                                                placeholder='Your budget'
                                                onChange={(e) => setScoreMatchData({ ...scoreMatchData, 8: { living_cost_budget: e.target.value } })}
                                            />
                                        </div>
                                    </div>
                                    <div className='form-btns'>
                                        <a href='#' style={actionBtnStyle} onClick={backStep}><FaChevronLeft style={{ fontSize: 14 }} /> Back</a>
                                        <a href='#' style={actionBtnStyle} onClick={handleScoreSubmit}>Finish <FaChevronRight style={{ fontSize: 14 }} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScoreMatch