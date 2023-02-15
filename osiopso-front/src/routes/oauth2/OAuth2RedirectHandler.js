import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Link, useLocation } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        console.log(name, 'this is name')
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        console.log(results, 'this is results')
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        // console.log('render succerss')        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        // console.log(token, 'social token')
        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            localStorage.setItem('token', token);
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