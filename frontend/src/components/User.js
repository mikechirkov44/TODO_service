import React from 'react';



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
        <table>
            <th>
                User_name
            </th>
            <th>
                Firstname
            </th>
            <th>
                Lastname
            </th>
            <th>
                Role
            </th>
            {users.map((user) => < UserItem user={user} />)}
        </table>
    )
}

export default UserList