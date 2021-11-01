import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { 
    Container,
    Button,
    Table,
    Form
 } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import axios from "axios"
import { useState } from "react"

const HRCourses = () => {
    const [courses, setCourses] = useState([])
    const [keyword, setKeyword] = useState("")

    const { url } = useRouteMatch()

    useEffect(() => {
        const query = keyword === "" ? "" : `=${keyword}`
        axios.get(`http://localhost:5000/courses/courseName?keyword${query}`)
            .then(res => {
                setCourses(res.data)
            })
    }, [keyword])

    return(
        <Container>
            <h1>All courses</h1>
            <Link to={`${url}/create`}className="mt-3">
                <Button variant="info">Create course</Button>
            </Link>
            <Form.Control 
                type="text" 
                onChange={e => setKeyword(e.target.value)}
                placeholder="Search by course name"
                className="mt-3"
            />

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Course Summary</th>
                        <th>Pre-requisites?</th>
                        <th>View all classes</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length === 0 ? null :
                        courses.map(course =>
                            <tr key={course.course_id}>
                                <td>{course.course_id}</td>
                                <td>{course.course_name}</td>
                                <td>{course.course_summary}</td>
                                <td>{course.has_prereq ? "Yes" : "No"}</td>
                                <td>
                                    <Link to={`${url}/${course.course_id}/${course.course_name}`}>
                                        <Button variant="warning">View</Button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default HRCourses