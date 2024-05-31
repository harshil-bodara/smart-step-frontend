import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import RangeSlider from "react-range-slider-input";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import "react-range-slider-input/dist/style.css";

import { getDiscipline, getFilteredUniversities } from '../../services/university';
import { AUS_STATES, FILTER_DURATION } from '../../constants/University';

const Explore = () => {

    const MAX_RANGE = 4446405;
    const DATA_PER_PAGE = 2;

    const navigate = useNavigate();

    const [universities, setUniversities] = useState([]);
    const [currentDiscipline, setCurrentDiscipline] = useState(null);
    const [totalUniversities, setTotalUniversities] = useState(0);
    const [disciplineData, setDisciplineData] = useState([]);
    const [filterObject, setFilterObject] = useState({});
    const [range, setRange] = useState([0, MAX_RANGE]);
    const [activeStep, setActiveStep] = useState(1);

    const [searchParams] = useSearchParams();

    const { disciplineSlug } = useParams();

    const updateRange = (e, indexKey) => {
        const rangeArr = [...range];
        rangeArr[indexKey] = e.target.value;
        setRange(rangeArr);
    }

    const handlePagination = (event) => {
        console.log("event >>", event.selected);
        setActiveStep(event.selected + 1);
    }

    useEffect(() => {
        fetchDiscipline();
    }, [])

    useEffect(() => {
        disciplineSlug && setFilterObject({ ...filterObject, disciplineSlug: disciplineSlug })
    }, [disciplineSlug])

    useEffect(() => {
        fetchUniversities();
    }, [filterObject])

    useEffect(() => {
        fetchUniversities(activeStep)
    }, [activeStep])

    // EP
    const fetchUniversities = async (pageNo = 1) => {
        try {
            console.log("filterObject >>", filterObject)
            filterObject.page = pageNo;
            filterObject.limit = DATA_PER_PAGE;
            if(!filterObject.location && searchParams.get("state")){
                filterObject.location = searchParams.get("state")
            }
            const response = await getFilteredUniversities(filterObject);
            setUniversities(response.data.universities)
            setTotalUniversities(response.data.totalCount)
        } catch (error) {
            console.log("error >>", error);
        }
    }

    const fetchDiscipline = async () => {
        try {
            const response = await getDiscipline();
            console.log("response >>", response);
            setDisciplineData(response.data)
            const currentDisciplineObject = response.data.find(data => data.slug === disciplineSlug)
            setCurrentDiscipline(currentDisciplineObject)
        } catch (error) {
            console.log("error >", error);
        }
    }

    return (
        <main className="site-main page-wrapper pt-4">
            <section className="space-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 widget-area ">
                            <section className='filter-section'>
                                <div className='filter-collapse-heading d-flex align-items-center justify-content-between' data-toggle="collapse" href="#disciplineCollapse" aria-expanded="true">
                                    <h5 className="widget-title py-2">Disciplines</h5>
                                    <div></div>
                                </div>
                                <div className="collapse show" id="disciplineCollapse">
                                    <ul className="woocommerce-widget-layered-nav-list" style={{ display: "flex", flexDirection: "column" }}>
                                        {disciplineData.map((discipline, index) => <li
                                            key={index}
                                            className={discipline.slug === disciplineSlug ? "active" : ""}
                                            style={{ display: "flex", alignItems: "center", gap: 8, order: discipline.slug === disciplineSlug ? 1 : 2 }}
                                        >
                                            <Link
                                                style={{ display: "flex", alignItems: "center", gap: 4 }}
                                                rel="nofollow"
                                                to={`/explore/${discipline.slug}`}
                                            >
                                                <img style={{ width: 15 }} src='https://cdn-icons-png.flaticon.com/512/3980/3980036.png' />
                                                {discipline.name}
                                            </Link>
                                        </li>)}
                                    </ul>
                                </div>
                            </section>

                            <section className='filter-section'>
                                <div className='filter-collapse-heading d-flex align-items-center justify-content-between' data-toggle="collapse" href="#rangeCollapse" aria-expanded="true">
                                    <h5 className="widget-title py-2">Tuition Fees</h5>
                                    <div></div>
                                </div>
                                <div className="collapse show py-3" id="rangeCollapse">
                                    <RangeSlider value={range} onInput={setRange} min={0} max={MAX_RANGE} id="smart-step-rangeslider" />
                                    <div className='mt-4' style={{ display: "flex", gap: 16 }}>
                                        <input className='form-control' value={range[0]} onChange={(e) => updateRange(e, 0)} />
                                        <input className='form-control' value={range[1] === MAX_RANGE ? "No Max" : range[1]} onChange={(e) => updateRange(e, 1)} />
                                        <button
                                            className='btn btn-primary btn-sm'
                                            style={{ height: 38, padding: "0px 16px" }}
                                            onClick={() => setFilterObject({ ...filterObject, minTuitionFees: range[0], maxTuitionFees: range[1] })}
                                        >
                                            <PiPaperPlaneRightFill />
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <section className='filter-section'>
                                <div className='filter-collapse-heading d-flex align-items-center justify-content-between' data-toggle="collapse" href="#locationCollapse" aria-expanded="false">
                                    <h5 className="widget-title py-2">Location</h5>
                                    <div></div>
                                </div>
                                <div className="collapse py-3" id="locationCollapse">
                                    <ul className="woocommerce-widget-layered-nav-list" style={{ display: "flex", flexDirection: "column" }}>
                                        {AUS_STATES.map((state, index) => <li
                                            key={index}
                                            className={filterObject?.location === state ? "active" : ""}
                                            style={{ display: "flex", alignItems: "center", gap: 8, order: filterObject?.location === state ? 1 : 2 }}
                                        >
                                            <Link
                                                style={{ display: "flex", alignItems: "center", gap: 4 }}
                                                rel="nofollow"
                                                onClick={() => {
                                                    console.log("disciplineSlug >>", disciplineSlug)
                                                    if(disciplineSlug){
                                                        setFilterObject({ ...filterObject, location: state })
                                                    }else{
                                                        navigate(`/explore/?state=${state}`);
                                                        setFilterObject({ ...filterObject, location: state })
                                                    }
                                                }}
                                            >
                                                <img style={{ width: 15 }} src='https://cdn-icons-png.flaticon.com/512/3980/3980036.png' />
                                                {state}
                                            </Link>
                                        </li>)}
                                    </ul>
                                </div>
                            </section>

                            <section className='filter-section'>
                                <div className='filter-collapse-heading d-flex align-items-center justify-content-between' data-toggle="collapse" href="#durationCollapse" aria-expanded="false">
                                    <h5 className="widget-title py-2">Duration</h5>
                                    <div></div>
                                </div>
                                <div className="collapse py-3" id="durationCollapse">
                                    <ul className="woocommerce-widget-layered-nav-list" style={{ display: "flex", flexDirection: "column" }}>
                                        {FILTER_DURATION.map((duration, index) => <li
                                            key={index}
                                            className={filterObject?.durationyears === duration.value ? "active" : ""}
                                            style={{ display: "flex", alignItems: "center", gap: 8, order: filterObject?.durationyears === duration.value ? 1 : 2 }}
                                        >
                                            <Link
                                                style={{ display: "flex", alignItems: "center", gap: 4 }}
                                                rel="nofollow"
                                                onClick={() => {
                                                    setFilterObject({ ...filterObject, durationyears: duration.value })
                                                }}
                                            >
                                                <img style={{ width: 15 }} src='https://cdn-icons-png.flaticon.com/512/3980/3980036.png' />
                                                {duration.title}
                                            </Link>
                                        </li>)}
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div className="col-lg-9 mb-4 mb-lg-0">
                            <div className="section-title m-0">
                                <h2 className="title d-block text-left-sm">Master's degrees {currentDiscipline?.name && `in ${currentDiscipline?.name}`}</h2>
                                <p className="woocommerce-result-count mt-2"> Total {totalUniversities} results</p>
                                {/* <form className="woocommerce-ordering float-lg-right my-2" method="get">
                                    <select name="orderby" className="orderby form-control" aria-label="Shop order" >
                                        <option value="" selected="selected">Default sorting</option>
                                        <option value="">Sort by popularity</option>
                                        <option value="">Sort by average rating</option>
                                        <option value="">Sort by latest</option>
                                        <option value="">Sort by price: low to high</option>
                                        <option value="">Sort by price: high to low</option>
                                    </select>
                                    <input type="hidden" name="paged" value="1" />
                                </form> */}
                            </div>
                            <div>
                                {universities.map((university, index) => <article className="blog-post-item" key={index}>
                                    <div className="post-item mt-4">
                                        <div className="post-meta">
                                            <span className="post-date"><i className="fa fa-calendar-alt mr-2"></i>${university.tuition_fees} / year</span>
                                            <span className="post-author"><i className="fa fa-user mr-2"></i>{university.duration.full_time_months / 12} year</span>
                                            {/* <span><a href="#" className="post-comment"><i className="fa fa-comments mr-2"></i>1 Comment</a></span> */}
                                        </div>
                                        <h4 className="post-title">
                                            <Link to={`/studies/${university.slug}`}>{university.university_name}</Link>
                                        </h4>
                                        <div className="post-content">
                                            <p>{university.about_short_content}</p>
                                            <ol className="breadcrumb">
                                                {university.tags.map((data, index) => <li key={index} className="breadcrumb-item">{data}</li>)}
                                            </ol>
                                            <Link to={`/studies/${university.slug}`} className="read-more mt-0">More Details <i className="fa fa-angle-right ml-2"></i></Link>
                                        </div>
                                    </div>
                                </article>)}
                            </div>

                            <nav className="woocommerce-pagination">
                                {/* <ul className="page-numbers">
                                    <li><span aria-current="page" className="page-numbers current">1</span></li>
                                    <li><a className="page-numbers" href="https://ha.motologgers.com/shop/page/2/">2</a></li>
                                    <li><a className="next page-numbers" href="https://ha.motologgers.com/shop/page/2/">→</a></li>
                                </ul> */}
                                <ReactPaginate
                                    className={'page-numbers'}
                                    breakLabel="..."
                                    nextLabel={<FaChevronRight />}
                                    onPageChange={handlePagination}
                                    pageRangeDisplayed={4}
                                    pageCount={Math.ceil(totalUniversities/DATA_PER_PAGE)}
                                    previousLabel={<FaChevronLeft />}
                                    renderOnZeroPageCount={null}
                                />
                            </nav>


                        </div>


                    </div>
                </div>
            </section>
        </main>
    )
}

export default Explore