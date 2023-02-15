import { React, useState, useEffect } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/user/user.reducer'

export const OAuth2Test = () => {
    const [Token, setToken] = useState("")

    const [Error, setError] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if(Token) {
            localStorage.setItem('token', Token)
            const value = {token: Token}
            dispatch(login(value))
            navigate('/')
        }
    },[Token])

    useEffect(()=>{
        setToken(getUrlParameter('token'))
    },[])


    useEffect(() => {
        if(Error) {
            navigate('/login')
        }
    },[Error])

    useEffect(()=>{
        setError(getUrlParameter('error'))
    },[])


    
    const location = useLocation()
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }



    

    return(
        <div>로그인 중</div>
    )
}

export default OAuth2Test;