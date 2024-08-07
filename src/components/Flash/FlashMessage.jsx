import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import * as flashActions from "../../actions/flash";
import { bindActionCreators } from "redux"


class FlashMessage extends Component {

    removeClick = () => {
        this.props.flashActions.delFlashMessage(this.props.item.id)
    }

    render() {
        return (
            <div className={classnames('alert', {
                'alert-success': this.props.item.type === 'success',
                'alert-danger': this.props.item.type === 'danger'
            })}>
                { this.props.item.msg }
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={ this.removeClick }>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        flashActions: bindActionCreators(flashActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(FlashMessage)