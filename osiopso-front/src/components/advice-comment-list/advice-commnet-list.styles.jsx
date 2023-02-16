import styled from "styled-components";

export const CommentListContainer = styled.div`
  display: flex;
  height: 250px;
  width: 90%;
  align-items: center;
  margin: auto;
  /* margin-top:20px; */
`

export const AdviceImgBox = styled.div`
  height: 80%;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: solid 1px gray; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  border-radius: 4px;
  img{
    width: 90%;
    height: 90%;
  }
  
`

export const ContentBox = styled.div`
  height: 70%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .select{
    display: flex;
    justify-content: flex-end;
    font-size: 90%;
    div{
      display: flex;
      width: 45%;
      justify-content: flex-end;
      svg{
        margin-right:2%
      }
    }
  }
  .content{
    height: 30%;
    padding:10px;
    font-size: 80%;
  }
  .time{
    text-align: right;
    width: 90%;
    color:gray;
    font-size: 77%;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  margin: auto;
.username{
    font-size: 81%;
    margin-left: 9%;
}
`


export const UserBox = styled.div`
  width: 2.5em;
  height: 2.5em;
  border-radius: 70%;
  overflow: hidden;
  div{
    font-size:27px;
  }
  img{
    width: 100%;
    height: 100%;
  }
`

export const IconContainer = styled.div`
  margin: 0 auto;
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:10px 0;
  .outer{
    display: flex;
    justify-content: space-between;
    width: 60%;
    .flex{
      display: flex;
      width:50%;
      justify-content: space-around;
      align-items: center;
    }
  }
`

export const ItemSlider = styled.div`
width: 93%;
margin: auto;
/* margin-bottom:20px; */
 .slick-list{
      margin:0 10px;

    .imgBox{
        display: flex;
        justify-content: center;
        img{
            height: 70px;
            width: 70px;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
        }
    }
}
.slick-slide {
    margin:0 10px;
}
.slick-arrow{
    display: none !important;
}
`