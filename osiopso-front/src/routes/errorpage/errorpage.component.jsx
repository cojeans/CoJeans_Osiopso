import { 
    ErrorMessage,
    BigContainer,
    SmallContainer,
} from './errorpage.styles'

import { useNavigate } from 'react-router'

const ErrorPage = ()=> {
    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/')
    }
    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <div>
            <h3><ErrorMessage>요청하신 페이지를 찾을 수 없습니다.</ErrorMessage></h3>
            <BigContainer>
                <SmallContainer onClick={goToMain}>홈으로</SmallContainer>
                <SmallContainer onClick={goToLogin}>로그인</SmallContainer>
            </BigContainer>
        </div>

    )
}

export default ErrorPage