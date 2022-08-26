import React from 'react';
import UserList from './components/User';
import MainMenu from './components/header';
import Footer from './components/footer';
import ProjectList from './components/Project';
import NoteList from './components/Todo';
import ProjectInfoList from './components/ProjectInfo';
import axios from 'axios';
import NotFound404 from './components/404NotFound';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm';
const UserApi = 'http://127.0.0.1:8000/userapp/api/users/';
const ProjectApi = 'http://127.0.0.1:8000/projectapp/api/projects/';
const NotesApi = 'http://127.0.0.1:8000/projectapp/api/notes/';
const AuthApi = 'http://127.0.0.1:8000/userapp/api-token-auth/';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'notes': [],
    }
  }

  get_token(login, password) {
    axios.post(AuthApi, { username: login, password: password }).then(response => {
      console.log(response.data)
    }).catch(error => alert('Неверный логин или пароль'))
  }

  componentDidMount() {
    axios.get(UserApi)
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }
      ).catch(error => console.log(error))

    axios.get(ProjectApi)
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }
      ).catch(error => console.log(error))

    axios.get(NotesApi)
      .then(response => {
        const notes = response.data.results
        this.setState(
          {
            'notes': notes
          }
        )
      }
      ).catch(error => console.log(error))

  }
  render() {
    return (
      <div className='d-flex flex-column min-vh-100'>
        <BrowserRouter>
          <nav>
            <MainMenu />
          </nav>
          <Routes>
            <Route exect path='/users' element={<UserList users={this.state.users} />} />
            <Route exect path='/login' element={<LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
            <Route path='/projects'>
              <Route index element={<ProjectList projects={this.state.projects} />} />
              <Route path=':projectId' element={<ProjectInfoList notes={this.state.notes} project_team={this.state.users} projects={this.state.projects} />} />
            </Route>
            <Route exect path='/notes' element={<NoteList notes={this.state.notes} />} />
            <Route path='*' element={<NotFound404 />} />
            <Route exect path='/' element={<Navigate to='/projects' />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>

    )
  }
}

export default App;
