import ClothesSelectBox from '../../components/clothes-select-box/clothes-select-box.component'
import ClothesSelectEdit from '../../components/clothes-select-edit/clothes-select-edit.component'
import { Route, Routes } from "react-router-dom"

const SelectboxPage = ()=> {
    return (
        <Routes>
            <Route index element = {<ClothesSelectBox/>}/>
            <Route path="/update" element = {<ClothesSelectEdit/>}/>
        </Routes>
    )
}

export default SelectboxPage