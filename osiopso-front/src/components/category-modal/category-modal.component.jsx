import {
	CategoryModalContainer,
	CategoryBox
} from "./category-modal.styles"

const CategoryModal = ({ closeModal, ootdFormData, setOotdFormData }) => {
	const tags = [
		{
			name: 'season',
			lst : ["봄", "여름", "가을", "겨울",]
		},
		{
			name: 'TPO',
			lst : ["데일리", "직장", "데이트", "경조사", "여행", "홈웨이", "파티", "운동", "학교"]
		},
		{
			name: 'category',
			lst : ["상의", "하의", "치마", "바지", "신발", "아우터", "모자",]
		}		
	]

	return (
		<CategoryModalContainer>
			{ tags}
		</CategoryModalContainer>
	)
}

export default CategoryModal