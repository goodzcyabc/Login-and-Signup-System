import React, { Component } from 'react'
import { useNavigate } from "react-router-dom"
import validator from "../../utils/validator"
import classnames from "classnames"

function withRouter(WrapperComponent) {
    return function (props) {
        const navigate = useNavigate()
        const router = { navigate }
        return <WrapperComponent {...props} router={ router }></WrapperComponent>
    }
}

class SignInForm extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let validatorLogin = validator({
            username: this.state.username,
            password: this.state.password
        })
        if (validatorLogin.isValid) {
            this.setState({
                errors: validatorLogin.errors
            })
        } else {
            this.setState({
                errors: {}
            })
            this.props.authActions.asyncSetUserObj({
                username: this.state.username,
                password: this.state.password
            }).then(res => {
                if (res.data.status === 200) {
                    this.props.flashActions.addFlashMessage({
                        id: Math.random().toString().slice(2),
                        msg: "Successfully logged in",
                        type: "success"
                    })
                    const { navigate } = this.props.router
                    navigate('/', { replace: true })
                } else {
                    this.props.flashActions.addFlashMessage({
                        id: Math.random().toString().slice(2),
                        msg: "Login failed",
                        type: "danger"
                    })
                }
            })
        }
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { username, password, errors } = this.state
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>WelCome Hi~</h1>
                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input
                            className={ classnames('form-control',{ 'is-invalid':errors.username }) }
                            type="text"
                            name="username"
                            value={ username }
                            onChange={ this.changeHandle }
                        />
                        {errors.username ? <span style={{ color: 'red', fontSize: '15px' }}>{errors.username}</span> : ''}
                    </div>
                    <div className="form-group">
                        <label className="control-label">PassWord</label>
                        <input
                            className={ classnames('form-control',{ 'is-invalid':errors.password }) }
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.changeHandle}
                        />
                        {errors.password ? <span style={{ color: 'red', fontSize: '15px' }}>{errors.password}</span> : ''}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignInForm)