import axios from "axios";
<<<<<<< HEAD

export const createClosetAxios = (closetName, isSelected, email) => {
  axios({
    method: "post",
    url: "http://localhost:8080/closet",
    data: {
      closetName,
      email,
      isSelected,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClosetAxios = (email) => {
  axios({
    method: "post",
    url: "http://localhost:8080/closet/list",
    data: {
      email,
    },
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
=======
import { useNavigate } from "react-router-dom";
// export const createClosetAxios = (closetName, isSelected) => {
//   axios({
//     method: "post",
//     url: "http://localhost:8080/closet",
//     data: {
//       name: closetName,
//       isSelected: isSelected,
//     },
//     headers: {
//       Authorization: `Bearer ${Token}`,
//     },
//   })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

>>>>>>> Feature/S08P12C106-185-FE-토큰-axios-요청
