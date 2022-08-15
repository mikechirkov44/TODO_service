import React from 'react';
import UserList from './components/User';
import MainMenu from './components/header';
import Footer from './components/footer';
import axios from 'axios';

const UserApi = 'http://127.0.0.1:8000/userapp/api/users/';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get(UserApi)
      .then(response => {
        const users = response.data
        this.setState(
          {
            'users': users
          }
        )
      }
      ).catch(error => console.log(error))
  }
  render() {
    return (
      <>
        <MainMenu />
        <UserList users={this.state.users} />
        <Footer />
      </>
    )
  }
}

export default App;
