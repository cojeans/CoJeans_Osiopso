import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import { MdArrowBackIos, MdArrowForwardIos  } from "react-icons/md";

import { SlickItem } from "./closet-slick.styles";

import {
	ClosetItem,
} from "../closet/closet.styles"
import ClosetPreview from "../closet-preview/closet-preview.component"

const SimpleSlider= () => {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
	};
		const thumbnails=['','','','']

    return (
      <div>
        <Slider {...settings}>
          <SlickItem>
						<ClosetItem>
						<ClosetPreview thumbnails={ thumbnails }/>
					</ClosetItem>
          </SlickItem>
          <SlickItem>
            <ClosetItem>
						<ClosetPreview thumbnails={ thumbnails }/>
					</ClosetItem>
          </SlickItem>
          <SlickItem>
            <ClosetItem>
						<ClosetPreview thumbnails={ thumbnails }/>
					</ClosetItem>
          </SlickItem>
          <SlickItem>
            <ClosetItem>
						<ClosetPreview thumbnails={ thumbnails }/>
					</ClosetItem>
          </SlickItem>
          <SlickItem>
            <ClosetItem>
						<ClosetPreview thumbnails={ thumbnails }/>
					</ClosetItem>
          </SlickItem>
          <SlickItem>
            <ClosetItem>
						<ClosetPreview thumbnails={ thumbnails }/>
					</ClosetItem>
          </SlickItem>
        </Slider>
      </div>
    );
  }

	export default SimpleSlider