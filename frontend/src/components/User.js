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
                {user.email}
            </td>
            <td>
                {user.role}
            </td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <>
            <br />
            <h3 class='text-center text-primary'>Users</h3>
            <hr />
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
                    {users.map((user) => <UserItem key={user.id.toString()} user={user} />)}
                </MDBTableBody>
            </MDBTable>
        </>
    )
}

export default UserList;
export { UserItem };