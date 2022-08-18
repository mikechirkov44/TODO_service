import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';



const ProjectItem = ({ project }) => {
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
                {project.git_link}
            </td>
            <td>
                {project.owner}
            </td>
            <td>
                {project.project_team}
            </td>

        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <>
            <br />
            <h2 class='text-center text-primary'>Projects</h2>
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
                    {projects.map((project) => <ProjectItem key={project.id.toString()} project={project} />)}
                </MDBTableBody>
            </MDBTable>
        </>
    )
}

export default ProjectList;