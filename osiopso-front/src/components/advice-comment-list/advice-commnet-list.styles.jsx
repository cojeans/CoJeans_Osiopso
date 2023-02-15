import styled from "styled-components";

export const CommentListContainer = styled.div`
  display: flex;
  height: 300px;
  width: 100%;
`

export const AdviceImgBox = styled.div`
  height: 70%;
  width: 50%;
  
`

export const ContentBox = styled.div`
  height: 70%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;


  .content{
    height: 30%;
    padding:10px;
    font-size: 15px;
  }
  .time{
    text-align: right;
    width: 90%;
    color:gray;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

`


export const UserBox = styled.div`
  width: 3em;
  height: 3em;
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