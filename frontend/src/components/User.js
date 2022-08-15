import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';



const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.role}
            </td>

        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <MDBTable className='container-md'>
            <MDBTableHead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {users.map((user) => <UserItem user={user} />)}
            </MDBTableBody>
        </MDBTable>
    )
}

export default UserList;