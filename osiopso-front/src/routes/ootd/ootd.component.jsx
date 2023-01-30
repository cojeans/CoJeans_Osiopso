import './ootd.styles'
import { OotdCategory, FilterMenu, OotdTopBar } from './ootd.styles'

const OOTD = () => {
    return (
        <div>
            <h1>This is OOTD page</h1>
            <OotdTopBar><OotdCategory><span>최신</span><span>인기</span><span>팔로잉</span></OotdCategory> <span>필터</span></OotdTopBar>
        </div>
    )
}

export default OOTD