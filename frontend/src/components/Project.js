import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';



const ProjectItem = ({ project, deleteProject }) => {

    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.description}
            </td>
            <td>
                <a href={project.git_link}>{project.git_link}</a>
            </td>
            <td>
                {project.owner}
            </td>
            <td>
                {project.project_team}
            </td>
            <td>
                <MDBBtn onClick={() => deleteProject(project.id)} color='secondary'>Delete</MDBBtn>
            </td>

        </tr>
    )
}

const ProjectList = ({ projects, deleteProject }) => {
    const [value, setValue] = useState('')
    const filtredProject = projects.filter(project => {
        return project.name.toLowerCase().includes(value.toLowerCase())
    })
    return (
        <>
            <br />
            <h3 class='text-center text-primary'>Projects</h3>
            <div className='d-flex mx-auto container-md'>
                <form>
                    <MDBInput label='Project name' id='search' name='search' type='text' onChange={(event) => setValue(event.target.value)} />
                </form>
            </div>
            <hr />
            <MDBTable className='container-md'>
                <MDBTableHead>
                    <tr>
                        <th>id</th>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Github</th>
                        <th>Owner</th>
                        <th>Team</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {filtredProject.map((project) => <ProjectItem key={project.id.toString()} project={project} deleteProject={deleteProject} />)}
                </MDBTableBody>
            </MDBTable>
        </>
    )
}


export default ProjectList;
