<template>
  <div class="container">
    <div class="col-md-6 mx-auto text-center">
      <div class="header-title">
        <h1 class="wv-heading--title">로그인</h1>
        <h2 class="wv-heading--subtitle">Make YourSelf Custom-er</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mx-auto">
        <form name="login" @submit.prevent="submitLoginForm">
          <div class="form-group">
            <input type="email" name="email"  class="form-control my-input" id="email" autocomplete="on" placeholder="이메일" v-model="email">
          </div>
          <div class="form-group">
            <input type="password" name="password"  class="form-control my-input" id="password" autocomplete="on" placeholder="비밀번호" v-model="password">
          </div>
          <div class="text-center ">
            <button type="submit" class=" btn btn-block send-button tx-tfm">로그인</button>
          </div>
          <div class="col-md-12 ">
            <div class="login-or">
              <hr class="hr-or">
              <span class="span-or">or</span>
            </div>
          </div>
          <div class="form-group d-flex justify-content-center">
            <a href="http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth2/redirect">
            <img class="bi me-2" width="55" height="55" src="../assets/google.png" />
            </a>
            <a href="http://localhost:8080/oauth2/authorize/naver?redirect_uri=http://localhost:3001/oauth2/redirect">
              <img class="bi me-2" width="55" height="55" src="../assets/naver.png" />
            </a>
            <a href="http://localhost:8080/oauth2/authorize/kakao?redirect_uri=http://localhost:3001/oauth2/redirect">
              <img class="bi me-2" width="55" height="55" src="../assets/kakao.png" />
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import store from "@/store";

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitLoginForm() {
      const loginForm = {
        username: this.email,
        password: this.password
      }

      this.$axios.post('/api/user/login', loginForm).then(res => {
        if (res.status === 200) {
          store.commit('setToken', res.data)
          sessionStorage.setItem('accessToken', res.data);
          window.alert('로그인하였습니다');
          router.push({path:'/'})
        }
      }).catch(() => {
        window.alert('로그인에 실패하였습니다.')
      })
    }
  }
}
</script>

<style scoped>
.form-group {
  padding-bottom: 1em;
}

.send-button {
  background: #FC5030;
  width: 100%;
  font-weight: 600;
  color: #fff;
  padding: 8px 25px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.g-button {
  color: #fff !important;
  border: 1px solid #EA4335;
  background: #ea4335 !important;
  width: 100%;
  font-weight: 600;
  color: #fff;
  padding: 8px 25px;
}

.my-input {
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: text;
  padding: 8px 10px;
  transition: border .1s linear;
}

.header-title {
  margin: 4rem;
}

h1 {
  font-size: 31px;
  line-height: 40px;
  font-weight: 600;
  color: #4c5357;
}

h2 {
  color: #5e8396;
  font-size: 21px;
  line-height: 32px;
  font-weight: 400;
}

.login-or {
  position: relative;
  color: #aaa;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -25px;
  background-color: #fff;
  width: 50px;
  text-align: center;
}

.hr-or {
  height: 1px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}

@media screen and (max-width: 480px) {
  h1 {
    font-size: 26px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>