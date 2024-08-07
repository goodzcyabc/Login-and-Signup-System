import React, { Component } from "react";
import api from "../api";

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            list: []
        }
    }
    
    componentDidMount() {
        api.list().then(res => {
            if (res.data.status === 200) {
                this.setState({
                    list: res.data.list
                })
            } 
        })
    }
    
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.list.map((ele, index) => {
                            return <li key={ index }> { ele.name } </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}