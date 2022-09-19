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
import ProjectForm from './components/ProjectForm';
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
      'token': '',
      'currentUser': [],
      'redirect': false
    }
  }

  is_Auth() {
    return !!this.state.token != ''
  }

  get_token(login, password) {
    axios.post(AuthApi, {
      username: login,
      password: password
    })
      .then(response => {
        const token = response.data.token
        const currentUser = this.state.users.filter((user) => user.username == login)[0]
        // console.log('token:', token)
        localStorage.setItem('token', token)
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        this.setState(
          {
            'token': token,
            'currentUser': currentUser
          }, this.getData)
      }).catch(error => alert('Неверный логин или пароль'))
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    let username = localStorage.getItem('currentUser')
    this.setState(
      {
        'token': token,
        'currentUser': username
      }, this.getData)
  }

  getHeaders() {
    if (this.is_Auth()) {
      return { 'Authorization': `Token ${this.state.token}` }
    }
    return {}
  }

  createProject(
    owner, git_link, project_team, name, discription
  ) {

    let headers = this.getHeaders()

    axios
      .post(ProjectApi, {
        'owner': owner,
        'git_link': git_link,
        'project_team,': project_team,
        'name': name,
        'discription': discription
      }, { headers })
      .then(response => {
        this.setState({
          'redirect': '/'
        }, this.getData)
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteProject(projectId) {
    let headers = this.getHeaders()

    axios
      .delete(`${ProjectApi}${projectId}`, { headers })
      .then(response => {
        this.setState({
          'projects': this.state.projects.filter((project) => project.id !== projectId)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  createNote(
    owner, title, discription, project
  ) {

    let headers = this.getHeaders()

    axios
      .post(NotesApi, {
        'owner': owner,
        'title': title,
        'discription': discription,
        'project': project
      }, { headers })
      .then(response => {
        this.setState({
          'redirect': '/notes'
        }, this.getData)
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteNote(noteId) {
    let headers = this.getHeaders()

    axios
      .delete(`${NotesApi}${noteId}`, { headers })
      .then(response => {
        this.setState({
          'notes': this.state.projects.filter((note) => note.id != noteId)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  getData() {
    this.setState({
      'redirect': false
    })

    let headers = this.getHeaders()

    axios.get(UserApi, { headers })
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            users
          }
        )
      }
      ).catch(error => {
        console.log(error)
        this.setState({ users: [] })
      })

    axios.get(ProjectApi, { headers })
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            projects
          }
        )
      }
      ).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })

    axios.get(NotesApi, { headers })
      .then(response => {
        const notes = response.data.results
        this.setState(
          {
            notes
          }
        )
      }
      ).catch(error => {
        console.log(error)
        this.setState({ notes: [] })
      })

  }

  logOut() {
    localStorage.setItem('token', '')
    localStorage.setItem('currentUser', '')
    this.setState({
      'token': '',
      'currentUser': [],
      'redirect': '/'
    }, this.getData)
  }

  render() {
    return (
      <div className='d-flex flex-column min-vh-100'>
        <BrowserRouter>
          {this.state.redirect ? <Navigate to={this.state.redirect} replace={true} /> : <div />}
          <nav>
            <MainMenu is_Auth={() => this.is_Auth()} logOut={() => this.logOut()} currentUser={this.state.currentUser} />
          </nav>
          <Routes>
            <Route exect path='/users' element={<UserList users={this.state.users} />} />
            <Route exect path='/login' element={<LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
            <Route path='/projects'>
              <Route index element={<ProjectList projects={this.state.projects} deleteProject={(projectId) => this.deleteProject(projectId)} />} />
              <Route path=':projectId' element={<ProjectInfoList notes={this.state.notes} project_team={this.state.users} projects={this.state.projects} />} />
              <Route path='create' element={<ProjectForm
                currentUser={this.state.currentUser}
                project_team={this.state.users}
                createProject={(owner, git_link, project_team, name, discription) => this.createProject(
                  owner, git_link, project_team, name, discription
                )} />} />
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


