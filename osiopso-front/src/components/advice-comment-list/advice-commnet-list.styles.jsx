import styled from "styled-components";

export const CommentListContainer = styled.div`
  display: flex;
  height: 250px;
  width: 90%;
  align-items: center;
  margin: auto;
`

export const AdviceImgBox = styled.div`
  height: 70%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px gray;
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


  .content{
    height: 30%;
    padding:10px;
    font-size: 15px;
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
  justify-content: space-around;
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