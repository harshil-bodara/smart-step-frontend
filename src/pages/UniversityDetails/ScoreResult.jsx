import React from 'react'
import { FaCircleExclamation } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import 'react-loading-skeleton/dist/skeleton.css'

import ProgressBar from "@ramonak/react-progress-bar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch } from 'react-redux';
import { updateActiveStep } from '../../redux/features/UniversitySlice';

const ScoreResult = ({ matchButtonRef, scoreMatchResult, university }) => {

    const dispatch = useDispatch();

    const editIconStyle = { fontSize: 18, color: '#0041ad', cursor: "pointer" };

    const handleEdit = (stepNo) => {
        matchButtonRef.current.click();
        dispatch(updateActiveStep(stepNo));
    }

    const scorePercentage = () => {
        const budgetScoresSum = [
            scoreMatchResult.tuition_budget ? 1 : 0,
            scoreMatchResult.living_cost_budget ? 1 : 0
        ];
        const academicScoresSum = [
            scoreMatchResult.min_degree ? 1 : 0,
            scoreMatchResult.min_experience ? 1 : 0,
            scoreMatchResult.average_grade ? 1 : 0,
            scoreMatchResult.english_level ? 1 : 0,
            scoreMatchResult.english_level ? 1 : 0,
        ];

        const matchScorePercentage = {
            total: Math.ceil(([...budgetScoresSum, ...academicScoresSum].reduce((partialSum, a) => partialSum + a, 0) / 7) * 100),
            academic: Math.ceil((academicScoresSum.reduce((partialSum, a) => partialSum + a, 0) / 5) * 100),
            budget: Math.ceil((budgetScoresSum.reduce((partialSum, a) => partialSum + a, 0) / 2) * 100)
        }
        return matchScorePercentage;
    }

    scorePercentage();

    return (
        <>
            <div className="modal fade" id="showScoreModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div style={{ maxWidth: 600 }} className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content ask-to-login-modal-content" style={{ maxHeight: 550, overflowY: "scroll" }}>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="modal-body">
                            <div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <h4>BestFit</h4>
                                        <p className='m-0'>{university?.university_name}</p>
                                    </div>
                                    <div style={{ width: 80, height: 80 }}>
                                        <CircularProgressbar
                                            strokeWidth={12}
                                            value={scorePercentage().total < 50 ? 50 : scorePercentage().total}
                                            text={`${scorePercentage().total < 50 ? 50 : scorePercentage().total}%`}
                                            styles={buildStyles({
                                                pathColor: scorePercentage().total < 50 ? '#f95c39' : '#247ba0',
                                                textColor: scorePercentage().total < 50 ? '#f95c39' : '#247ba0',
                                            })}
                                        />
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <p className='m-0' style={{ fontSize: 18 }}>
                                        {scorePercentage().total < 50 ? "Poor Match" :
                                            scorePercentage().total > 50 && scorePercentage().total < 80 ? "Good Match" : "Excellent match"
                                        }
                                    </p>
                                    <small style={{ display: "block", marginTop: "-6px" }}>Check the full score below :</small>
                                </div>

                                <div className='score-result-section'>
                                    <div className='filter-collapse-heading d-flex align-items-center justify-content-between' data-toggle="collapse" href="#academicCollapse" aria-expanded="true">
                                        <p
                                            className='mb-1'
                                            style={{ fontWeight: 500, fontSize: 18, letterSpacing: 0.3 }}
                                        >
                                            Academic fit ({scorePercentage().academic < 50 ? "< 50" : scorePercentage().academic}%)
                                        </p>
                                        <div></div>
                                    </div>
                                    <div class="collapse show pt-3" id="academicCollapse">
                                        <div className='score-result-block mb-3'>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <p className='mb-1' style={{ fontSize: 14, color: "#000" }}>Degree </p>
                                                <FiEdit style={editIconStyle} onClick={() => handleEdit(1)} />
                                            </div>
                                            <ProgressBar
                                                completed={scoreMatchResult.min_degree ? 90 : 60}
                                                customLabel=" "
                                                className={`progress-bar-flat ${scoreMatchResult.min_degree ? 'success' : 'failure'}`}
                                            />
                                        </div>
                                        <div className='score-result-block mb-3'>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <p className='mb-1' style={{ fontSize: 14, color: "#000" }}>Field / Major</p>
                                                <FiEdit style={editIconStyle} onClick={() => handleEdit(3)} />
                                            </div>
                                            <ProgressBar
                                                completed={scoreMatchResult.min_degree ? 90 : 60}
                                                customLabel=" "
                                                className={`progress-bar-flat ${scoreMatchResult.min_degree ? 'success' : 'failure'}`}
                                            />
                                        </div>
                                        <div className='score-result-block mb-3'>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <p className='mb-1' style={{ fontSize: 14, color: "#000" }}>Grade </p>
                                                <FiEdit style={editIconStyle} onClick={() => handleEdit(4)} />
                                            </div>
                                            <ProgressBar
                                                completed={scoreMatchResult.average_grade ? 90 : 60}
                                                customLabel=" "
                                                className={`progress-bar-flat ${scoreMatchResult.average_grade ? 'success' : 'failure'}`}
                                            />
                                            {/* <small style={{ gap: 4 }} className='m-0 d-flex align-items-center'><FaCircleExclamation style={{ color: "red" }} /> Not Available</small> */}
                                        </div>
                                        <div className='score-result-block mb-3'>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <p className='mb-1' style={{ fontSize: 14, color: "#000" }}>Work Experience </p>
                                                <FiEdit style={editIconStyle} onClick={() => handleEdit(5)} />
                                            </div>
                                            <ProgressBar
                                                completed={scoreMatchResult.min_experience ? 90 : 60}
                                                customLabel=" "
                                                className={`progress-bar-flat ${scoreMatchResult.min_experience ? 'success' : 'failure'}`}
                                            />
                                        </div>
                                        <div className='score-result-block mb-3'>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <p className='mb-1' style={{ fontSize: 14, color: "#000" }}>English Level </p>
                                                <FiEdit style={editIconStyle} onClick={() => handleEdit(6)} />
                                            </div>
                                            <ProgressBar
                                                completed={scoreMatchResult.english_level ? 90 : 60}
                                                customLabel=" "
                                                className={`progress-bar-flat ${scoreMatchResult.english_level ? 'success' : 'failure'}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='score-result-section mt-4'>
                                    <div className='filter-collapse-heading d-flex align-items-center justify-content-between' data-toggle="collapse" href="#budgetCollapse" aria-expanded="true">
                                        <p
                                            className='mb-1'
                                            style={{ fontWeight: 500, fontSize: 18, letterSpacing: 0.3 }}
                                        >
                                            Budget fit ( {scorePercentage().budget < 50 ? "<50" : scorePercentage().budget}%)
                                        </p>
                                        <div></div>
                                    </div>
                                    <div class="collapse show pt-3" id="budgetCollapse">
                                        <div className='score-result-block mb-3'>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <p className='mb-1' style={{ fontSize: 14, color: "#000" }}>Tuition fees </p>
                                                <FiEdit style={editIconStyle} onClick={() => handleEdit(7)} />
                                            </div>
                                            <ProgressBar
                                                completed={scoreMatchResult.tuition_budget ? 90 : 40}
                                                customLabel=" "
                                                className={`progress-bar-flat ${scoreMatchResult.tuition_budget ? 'success' : 'failure'}`}
                                            />
                                        </div>
                                        <div className='score-result-block mb-3'>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                <p className='mb-1' style={{ fontSize: 14, color: "#000" }}>Cost of living </p>
                                                <FiEdit style={editIconStyle} onClick={() => handleEdit(8)} />
                                            </div>
                                            <ProgressBar
                                                completed={scoreMatchResult.living_cost_budget ? 90 : 40}
                                                customLabel=" "
                                                className={`progress-bar-flat ${scoreMatchResult.living_cost_budget ? 'success' : 'failure'}`}
                                            />
                                        </div>
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

export default ScoreResult