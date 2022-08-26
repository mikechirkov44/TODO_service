import React from 'react'


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
        }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }


    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    cancelForm = () => {
        this.setState({
            login: "",
            password: "",
        });
    }


    render() {
        return (
            <>
                <br />
                <h3 class='text-center text-primary'>Please Enter your Login and Password</h3>
                <form class="border bg-light" onSubmit={(event) => this.handleSubmit(event)}>
                    <div class="form-group mt-4 mb-4 col-sm-4 px-4">
                        <label for="login">Login:</label>
                        <input type="text" name="login" class="form-control" id="login" aria-describedby="loginHelp"
                            value={this.state.login} onChange={(event) => this.handleChange(event)} />
                        <small id="loginHelp" class="form-text text-muted">Will never share your login or email with anyone else</small>
                    </div>
                    <div class="form-group mb-4 col-sm-4 px-4">
                        <label for="password">Password:</label>
                        <input type="password" name="password" class="form-control" id="password"
                            value={this.state.password} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div class="form-group px-4 mb-4">
                        <input class="btn btn-primary" type="submit" value="Login" />
                        <button class="btn btn-primary ms-2" type="button" value="Clear" onClick={this.cancelForm}>Clear</button>
                    </div>
                </form >
            </>
        );
    }

}

export default LoginForm;


