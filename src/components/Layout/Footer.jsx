import React from 'react'
import { IMG_LOGO } from '../Images'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Footer = () => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    return (
        <section className="footer pt-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mr-auto col-sm-6 col-md-6">
                        <div className="widget footer-widget mb-5 mb-lg-0">
                            <h5 className="widget-title">About Us</h5>
                            <p className="mt-3">Welcome to Smart Steps: International Student Application Assistance! We simplify the university application process for international students aspiring to study in Australia.</p>
                            <ul className="list-inline footer-socials">
                                <li className="list-inline-item"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li className="list-inline-item"> <a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fab fa-linkedin"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fab fa-pinterest"></i></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-md-6">
                        <div className="footer-widget mb-5 mb-lg-0">
                            <h5 className="widget-title">Links</h5>
                            <ul className="list-unstyled footer-links">
                                <li><Link to="/explore">Explore</Link></li>
                                {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
                            </ul>
                        </div>
                    </div>
                    {/* <div className="col-lg-2 col-sm-6 col-md-6">
                        <div className="footer-widget mb-5 mb-lg-0">
                            <h5 className="widget-title">Courses</h5>
                            <ul className="list-unstyled footer-links">
                                <li><a href="#">SEO Business</a></li>
                                <li><a href="#">Digital Marketing</a></li>
                                <li><a href="#">Graphic Design</a></li>
                                <li><a href="#">Site Development</a></li>
                                <li><a href="#">Social Marketing</a></li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="footer-widget footer-contact mb-5 mb-lg-0">
                            <h5 className="widget-title">Contact </h5>

                            <ul className="list-unstyled">
                                <li><i className="bi bi-headphone"></i>
                                    <div>
                                        <strong>Phone number</strong>
                                        (61) 434 592 145
                                    </div>

                                </li>
                                <li> <i className="bi bi-envelop"></i>
                                    <div>
                                        <strong>Email Address</strong>
                                        smartsteps@gmail.com
                                    </div>
                                </li>
                                <li><i className="bi bi-location-pointer"></i>
                                    <div>
                                        <strong>Office Address</strong>
                                        Hawthorn East
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-btm">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6">
                            <div className="footer-logo">
                                <img src={IMG_LOGO} alt="Smart Step Logo" className="img-fluid" width={60} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="copyright text-lg-center">
                                <p>@ Copyright reserved to Smart Steps.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer