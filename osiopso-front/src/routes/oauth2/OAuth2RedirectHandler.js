import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect, Link} from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            // return <Redirect to={{
            //     pathname: "/",
            //     state: { from: this.props.location }
            // }}/>; 
            return <Link to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>; 
        } else {
            // return <Redirect to={{
            //     pathname: "/login",
            //     state: { 
            //         from: this.props.location,
            //         error: error 
            //     }
            // }}/>; 
            return <Link to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default OAuth2RedirectHandler;