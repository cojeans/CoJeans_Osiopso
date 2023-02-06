import { AdviceImageCreate, SaveButton } from './advice-create.styles'
const AdviceCreate = ()=> {
    return (
        <div>
            <h1>훈수생성페이지</h1>
            <AdviceImageCreate><img src={require("../../assets/leo.avif")} alt="" /></AdviceImageCreate>
            <SaveButton><button>저장</button></SaveButton>
        </div>
    )
}

export default AdviceCreate