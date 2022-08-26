import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';



const NoteItem = ({ note }) => {
    return (
        <tr>
            <td>
                {note.id}
            </td>
            <td>
                {note.title}
            </td>
            <td>
                {note.description}
            </td>
            <td>
                {note.owner}
            </td>
            <td>
                {note.project}
            </td>

        </tr>
    )
}

const NoteList = ({ notes }) => {
    return (
        <>
            <br />
            <h3 class='text-center text-primary'>Notes</h3>
            <hr />
            <MDBTable className='container-md'>
                <MDBTableHead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Owner</th>
                        <th>Project</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {notes.map((note) => <NoteItem key={note.id.toString()} note={note} />)}
                </MDBTableBody>
            </MDBTable>
        </>
    )
}
export default NoteList;
export { NoteItem };