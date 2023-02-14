import { Fragment } from "react"

import { useNavigate } from "react-router-dom";

import { ProfileGridPage } from "./myprofile-ootd.styles"

const MyProfileOotd = ({ userOotd }) => {
	const navigate = useNavigate();

		const goToOotdDetail = (id) => {
    navigate("/ootd/detail/" + id, {
      state: {
        id:id
      }
    });
  };


	return (
	<Fragment>
			{
				userOotd ?
					<ProfileGridPage>
					{	
						userOotd.map((ootd) => {
							return (
								<img src={ootd.imageUrl} alt="" onClick={()=>goToOotdDetail(ootd.id)} />
							)
						})
					}
				</ProfileGridPage>
				: <div style={{textAlign:'center'}}>게시글이 없습니다.</div>
			}
			
			</Fragment>
	)
}

export default MyProfileOotd