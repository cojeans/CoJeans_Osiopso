import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

// import { MdArrowBackIos, MdArrowForwardIos  } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import axios from "axios";

import { ItemInfo } from "../closet/closet.styles";
import {
  SlickItem,
  SliderContainer,
} from "./closet-slick.styles";
import {
	ClosetItem,
} from "../closet/closet.styles"
import ClosetPreview from "../closet-preview/closet-preview.component"

const SimpleSlider = ({ closetList, setSelectCloset }) => {
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
	};
  const thumbnails = ['', '', '', '']
  const Token = useSelector(selectUser)
  const selectClothes = (id) => {
    axios({
			method: "post",
        url: `${process.env.REACT_APP_AXIOS_URL}closet/${id}/all`,
        data: [],
        headers: {
          Authorization: `Bearer ${Token.token}`,
              },
		}).then((res) => {
      console.log(res.data, '😢')
   
			setSelectCloset(res.data)
		}).catch((err) => {
			console.log(err)
		})
  }

    return (
      <SliderContainer>
        <Slider {...settings}>
          {
            closetList.map((closet, idx) => {
              return (
              <SlickItem key={idx}>
                <ClosetItem page={'advice'} onClick={()=>selectClothes(closet.id) }>
                    <ClosetPreview thumbnails={closet.thumbnails} />
                  </ClosetItem>
                  			<ItemInfo>
                        <p>
                          { closet.name }
                        </p>
                      </ItemInfo>
              </SlickItem>
            )
            })
          }
        </Slider>
      </SliderContainer>
    );
  }

	export default SimpleSlider