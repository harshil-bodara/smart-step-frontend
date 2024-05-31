import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AskToLogin = () => {

    const modalRef = useRef();

    const navigate = useNavigate();

    const handleLink = (e, link) => {
        e.preventDefault();
        modalRef.current.click();
        navigate(link);
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content ask-to-login-modal-content">
                        <button ref={modalRef} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="modal-body">
                            <div className='text-center'>
                                <h3>See Your Results</h3>
                                <p>And your match with all of our programmes</p>
                                <div className='mb-4'>
                                    <Link to="/signup" onClick={(e) => handleLink(e, "/signup")}>
                                        <button type="button" class="btn btn-info btn-block w-75 m-auto">Register</button>
                                    </Link>
                                </div>
                                <div class="line-behind"><span></span>
                                    <p>OR</p>
                                </div>
                                <p>Already have an account? <Link  onClick={(e) => handleLink(e, "/login")} to="/login">Sign in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AskToLogin