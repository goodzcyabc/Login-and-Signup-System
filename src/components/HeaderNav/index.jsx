import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/auth";
import { REACT_REDUX_LOCAL } from "../../constants";

class HeaderNav extends Component {
    logoutHandle = () => {
        this.props.authActions.logOut()
        localStorage.removeItem(REACT_REDUX_LOCAL)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home Page</Link>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            {
                                this.props.auth.user.token ? 
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signin">{ this.props.auth.user.nick }</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button onClick={ this.logoutHandle }>Logout</button>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signup">Sign Up</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signin">Login</Link>
                                        </li>
                                    </>
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav)