import Ootd from "../../components/ootd/ootd.component";
import OotdDetail from "../../components/ootd-detail/ootd-detail.component";
import { Route, Routes } from "react-router-dom";

const OOTDPage = () => {
    return (
        <Routes>
            <Route index element={<Ootd/>} />
            <Route path=":detail" element={<OotdDetail/>} />
        </Routes>
  
    )
}

export default OOTDPage