import { Fragment } from "react"

import { useNavigate } from "react-router-dom";

import { ProfileGridPage } from "../myprofile-ootd/myprofile-ootd.styles"

const MyProfileAdvice = ({ userAdvice }) => {
	const navigate = useNavigate();

	const goToAdviceDetail = (id) => {
    navigate("/advice/detail/" + id, {
      state: {
        id:id
      }
    });
  };

	return (
		<Fragment>
			{
				userAdvice ?
					<ProfileGridPage>
					{	
						userAdvice.map((advice) => {
							return (
								<img src={advice.imageUrl} alt="" onClick={()=>goToAdviceDetail(advice.id)} />
							)
						})
					}
				</ProfileGridPage>
				: <div style={{textAlign:'center'}}>게시글이 없습니다.</div>
			}
			
			</Fragment>
			)
}

export default MyProfileAdvice