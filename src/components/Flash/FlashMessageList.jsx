import React, { Component } from "react";
import FlashMessage from "./FlashMessage";
import { connect } from "react-redux";


class FlashMessageList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.flashes.map((ele, index) => {
                        return <FlashMessage item={ ele } key={ index }/>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        flashes: state.flash
    }
}

export default connect(mapStateToProps)(FlashMessageList)