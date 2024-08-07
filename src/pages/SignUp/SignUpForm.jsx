import React, { Component } from "react";
import api from "../../api";
import classnames from "classnames"
import { useNavigate } from "react-router-dom"

function withRouter(WrapperComponent) {
    return function (props) {
        const navigate = useNavigate()
        const router = { navigate }
        return <WrapperComponent {...props} router={ router }></WrapperComponent>
    }
}

class SignUpForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            errors: {}
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        api.register({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        }).then(res => {
            if (res.data.status === 200) {
                this.props.flashActions.addFlashMessage({
                    id: Math.random().toString().slice(2),
                    msg: res.data.msg,
                    type: "success"
                })
                this.setState({
                    errors: {}
                })
                const { navigate } = this.props.router
                navigate('/', { replace: true })

            }
            if (res.data.status === 400) {
                this.setState({
                    errors: res.data.errors
                })
            }
            if (res.data.status === 401) {
                this.props.flashActions.addFlashMessage({
                    id: Math.random().toString().slice(2),
                    msg: res.data.msg,
                    type: "danger"
                })
                this.setState({
                    errors: {}
                })
            }
        }).catch(error => {
            const { response } = error
            console.log(response)
        })
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onBlurCheckUserName = () => {
        api.repeatUsername({
            username: this.state.username
        }).then(res => {
            if (res.data.flag) {
                this.setState({
                    errors: {}
                })
            } else {
                this.setState({
                    errors: {
                        username: res.data.msg
                    }
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const { username, email, password, passwordConfirmation, errors } = this.state
        return (
            <div>
                <form onSubmit={ this.onSubmit }>
                    <h1>Join our community</h1>
                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input
                            className={ classnames('form-control', { 'is-invalid': errors.username })}
                            type="text"
                            name="username"
                            value={ username }
                            onChange={ this.changeHandle }
                            onBlur={ this.onBlurCheckUserName }
                        />
                        { errors.username ? <span style={{ color: 'red', fontSize: '15px' }}>{errors.username}</span> : '' }
                    </div>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                        <input
                            className={ classnames('form-control', { 'is-invalid': errors.email })}
                            type="text"
                            name="email"
                            value={ email }
                            onChange={ this.changeHandle }
                        />
                        { errors.email ? <span style={{ color: 'red', fontSize: '15px' }}>{errors.email}</span> : '' }
                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input
                            className={ classnames('form-control', { 'is-invalid': errors.password })}
                            type="password"
                            name="password"
                            value={ password }
                            onChange={ this.changeHandle }
                        />
                        { errors.password ? <span style={{ color: 'red', fontSize: '15px' }}>{errors.password}</span> : '' }
                    </div>
                    <div className="form-group">
                        <label className="control-label">PasswordConfirmation</label>
                        <input
                            className={ classnames('form-control', { 'is-invalid': errors.passwordConfirmation })}
                            type="password"
                            name="passwordConfirmation"
                            value={ passwordConfirmation }
                            onChange={ this.changeHandle }
                        />
                        { errors.passwordConfirmation ? <span style={{ color: 'red', fontSize: '15px' }}>{errors.passwordConfirmation}</span> : '' }
                    </div>
                    <div className="form-group">
                        {
                             Object.keys(errors).length > 0 ?
                            <button disabled className="btn btn-primary btn-lg">Sign up</button>
                             :
                            <button className="btn btn-primary btn-lg">Sign Up</button>
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignUpForm)