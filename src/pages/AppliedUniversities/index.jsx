import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

import ProfileLayout from '../../components/Layout/ProfileLayout'
import { getAppliedUniversities } from '../../services/university'

const AppliedUniversities = () => {

    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        fetchUniversities();
    }, [])

    // EP
    const fetchUniversities = async () => {
        try {
            const response = await getAppliedUniversities();
            setUniversities(response.data.universities);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ProfileLayout>
                <div className="card mb-3">
                    <div className="card-body">
                        <h3 className='mb-3'>Applied Universities by You</h3>

                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">University Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universities.map((university, index) => <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{university.university_name}</td>
                                    <td>
                                        <Link to={`/studies/${university.slug}`}>
                                            <FaEye />
                                        </Link>
                                    </td>
                                </tr>)}
                                {universities.length === 0 && <tr><td className='text-center' colSpan={3}>No Data</td></tr>}
                            </tbody>
                        </table>

                    </div>
                </div>
            </ProfileLayout>
        </>
    )
}

export default AppliedUniversities