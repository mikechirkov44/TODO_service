import React from 'react'
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Multiselect from 'multiselect-react-dropdown';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.state = {
            'owner': this.currentUser.id,
            'git_link': '',
            'project_team': [],
            'name': '',
            'discription': 'None',
        }
        console.log(this.state.owner)
    }

    getDevIdList(objectList) {
        const developersIdList = []
        for (let obj of objectList) {
            developersIdList.push(obj.id)
        }

        this.setState({
            'project_team': developersIdList
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        this.props.createProject(
            this.state.owner, this.state.git_link, this.state.project_team, this.state.name, this.state.discription)
        console.log(this.state)
        event.preventDefault()
    }

    render() {

        return (
            <div className='d-flex mx-auto my-auto'>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <MDBInput label='Name' id='Name' name='name' type='text' onChange={(event) => this.handleChange(event)} />
                    <MDBInput label='discription' id='Discription' name='discription' type='text' onChange={(event) => this.handleChange(event)} />
                    <MDBInput label='Git hub' id='git_link' name='git_link' type='url' />
                    <Multiselect
                        options={this.props.project_team}
                        displayValue='username'
                        onSelect={(event) => this.getDevIdList(event)}
                        onRemove={(event) => this.getDevIdList(event)} />
                    <MDBBtn type='submit' block>
                        Create Project
                    </MDBBtn>
                </form>
            </div>
        )
    }
}

export default ProjectForm;