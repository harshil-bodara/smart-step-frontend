import React, { useEffect, useState } from 'react'
import { getDiscipline } from '../../services/university';
import { Link } from 'react-router-dom';
import { AUS_STATES } from '../../constants/University';

import { IMG_CANADA, IMG_NEW_SOUTH, IMG_VICTORIA, IMG_QUEENSLAND, IMG_WESTERN_AUS, IMG_SOUTH_AUS, IMG_TASMANIA, IMG_NORTHERN_TERRITORY } from "../../components/Images"

const Home = () => {

    const [disciplineData, setDisciplineData] = useState([]);

    useEffect(() => {
        fetchDiscipline();
    }, [])

    const stateImgObj = {
        0: IMG_NEW_SOUTH,
        1: IMG_VICTORIA,
        2: IMG_QUEENSLAND,
        3: IMG_WESTERN_AUS,
        4: IMG_SOUTH_AUS,
        5: IMG_TASMANIA,
        6: IMG_NORTHERN_TERRITORY
    };

    // EP
    const fetchDiscipline = async () => {
        try {
            const response = await getDiscipline();
            console.log("response >>", response);
            setDisciplineData(response.data)
        } catch (error) {
            console.log("error >", error);
        }
    }

    return (
        <>
            <section className="banner">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-8">
                            <div className="banner-content center-heading">
                                <h1 className='mb-0'>Find your dream study</h1>
                                <span className="subheading mb-5">Discover thousands of Master's degrees worldwide!</span>
                                {/* <a href="#" className="btn btn-main"><i className="fa fa-list-ul mr-2"></i>our Courses </a>
                                <a href="#" className="btn btn-tp ">get Started <i className="fa fa-angle-right ml-2"></i></a> */}
                                {/* <div className="form-banner">
                                    <form action="#" className="form-search-banner">
                                        <input type="text" className="form-control" placeholder="What do study?" />
                                        <a href="#" className="btn btn-main">Search<i className="fa fa-search ml-2"></i> </a>
                                    </form>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="feature">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-lg-4 col-md-6">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="bi bi-badge2"></i>
                                </div>
                                <div className="feature-text">
                                    <h4>Learn from Industry Experts</h4>
                                    <p>Behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="bi bi-article"></i>
                                </div>
                                <div className="feature-text">
                                    <h4>Learn the Latest Top Skills</h4>
                                    <p>Behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="bi bi-headset"></i>
                                </div>
                                <div className="feature-text">
                                    <h4>Lifetime Access & Support</h4>
                                    <p>Behind the word mountains, far from the countries Vokalia </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding category-section">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                {/* <span className="subheading">Top Categories</span> */}
                                <h3>Browse by Discipline</h3>
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicin gelit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters">
                        <div className="course-categories">
                            {disciplineData.map((data, index) => <div key={index} className="category-item">
                                <Link to={`/explore/${data.slug}`}>
                                    <div className="category-icon mb-3">
                                        {/* <i className="bi bi-laptop"></i> */}
                                        <img src={`${process.env.REACT_APP_SITE_URL}/${data.icon}`} width={80} />
                                    </div>
                                    <h4>{data.name}</h4>
                                    {/* <p>(4 Courses)</p> */}
                                </Link>
                            </div>)}
                        </div>
                    </div>

                </div>
            </section>

            <section className="section-padding category-section">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                {/* <span className="subheading">Top Categories</span> */}
                                <h3>Browse by States</h3>
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicin gelit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters">
                        {AUS_STATES.map((state, index) => <div className="col-lg-3 col-md-6">
                            <div className="course-category" style={{ background: `url(${stateImgObj[index]})`, backgroundSize: "cover" }}>
                                {/* <div className="category-icon">
                                    <i className="bi bi-laptop"></i>
                                </div> */}
                                <h4><Link to={`/explore/?state=${state}`}>{state}</Link></h4>
                                {/* <p>4 Courses</p> */}
                            </div>
                        </div>)}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Home