import React from 'react';
import { useParams } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import { UserItem } from './User';
import { NoteItem } from './Todo';

const ProjectInfoList = ({ notes, project_team, projects }) => {
    let params = useParams()
    let project = projects.filter((project) => project.id === parseInt(params.projectId))[0]
    console.log(project)
    let filteredNotes = notes.filter((note) => note.project === parseInt(params.projectId))
    let filteredUsers = project_team.filter((developer) => project.project_team.includes(developer.id))
    return (
        <>
            <h2 className='text-center'>Project name: {project.name}</h2>
            <p className='text-center'>{project.description}</p>
            <a href={project.git_link} class="link-primary text-center">{project.git_link}</a>
            <hr />
            <h3 className='text-center'>Project team</h3>
            <MDBTable className='container-md'>
                <MDBTableHead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {filteredUsers.map((user) => <UserItem key={user.id.toString()} user={user} />)}
                </MDBTableBody>
            </MDBTable>
            <hr />

            <h3 className='text-center'>Notes</h3>
            <MDBTable className='container-md'>
                <MDBTableHead>
                    <tr>
                        <th>id</th>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Owner</th>
                        <th>Team</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {filteredNotes.map((note) => <NoteItem key={note.id.toString()} note={note} />)}
                </MDBTableBody>
            </MDBTable>
        </>
    )
}
export default ProjectInfoList;