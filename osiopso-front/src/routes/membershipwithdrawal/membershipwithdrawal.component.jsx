import { useState } from 'react'
import PasswordCheck from '../passwordcheck/passwordcheck.component'

import Home from '../home/home.component'
import { H1Container, Message, AgreeMessage, ButtonBox } from './membershipwithdrawal.styles'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

export const AlertHandler = ()=> {
    Swal.fire({
        icon: 'success',
        confirmButtonColor: '#7272ba',
        html: `
        회원탈퇴가 완료되었습니다.`,
        showCancelButton: false,
        confirmButtonText: '확인',
    })
}

const MembershipWithdrawal = () => {
    const navigate = useNavigate()

    const [confirm, setConfirm ] = useState(false)
    const ChangeConfirm= ()=>{
        // <Routes>
        //     <Route path='/' element={<Home/>}/>
        // </Routes>
        AlertHandler()
        setConfirm(false)
        navigate('/')
    }

    
    
    return (
        <div>
            
            { !confirm
            ? <PasswordCheck
            setConfirm={setConfirm}
            />
            :
            <div>
                <H1Container>탈퇴 안내</H1Container>
                <Message>사용하고 계신 아이디()는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</Message>
                <Message>탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제됩니다.</Message>

                <AgreeMessage><input type="checkbox"/> 안내 사항을 모두 확인하였으며, 이에 동의합니다.</AgreeMessage>
                <ButtonBox><button>돌아가기</button> <button onClick={ChangeConfirm}>확인</button></ButtonBox>
            </div>
            }
            {/* {setConfirm(false)} */}

        </div>
    )
}

export default MembershipWithdrawal