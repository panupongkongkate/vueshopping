<template>
  <div class="row">
    <div class="col"></div>
    <!------Log in ---------->
    <div class="col text-center">
      <div class="card" >
        <div class="card-header"><h1>เข้าสู่ระบบ</h1></div>
        <div class="card-body">
          <form @submit="relogin">
            <div class="form-group">
              <label>Email</label>
              <div class="input-group-append">
                <span class="input-group-text"
                  ><i class="fas fa-user"></i
                ></span>
                <input
                  type="email"
                  class="form-control"
                  v-model.trim="Login.name"
                  placeholder="Email"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Password</label>
              <div class="input-group-append">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
                <input
                  type="password"
                  class="form-control"
                  v-model.trim="Login.password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">
                Log in
              </button>
            </div>
          </form>
          <p>
            <a class="text-primary" @click="reregister" style="cursor: pointer;"
              >Register as a new user</a
            >
          </p>
        </div>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script scoped>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  name: "Login-index",
  data() {
    return {
      Slog:true ,
      Login: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    reregister() {
      this.$router.push("/register-index");
    },
    relogin() {
      Vue.axios
        .post("https://localhost:44362/api/register/PostLogin", this.Login)
        .then((res, i) => {
          this.$session.start();
          this.$session.set("Login", this.Login);
          swal("สำเร็จ!", "เข่้าสู่ระบบสำเร็จ", "success");
          this.$router.push("/main-index");
          location.reload();
        })
        .catch(err => {
          swal("ไม่สำเร็จ!", "เข่้าสู่ระบบไม่สำเร็จ", "error");
        });
      console.log(this.Login);
    } 
  }
};
</script>

<style scoped></style>
