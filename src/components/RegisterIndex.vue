<template>
  <div id="register-index">
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <div class="card">
          <div class="card-header">
            <h1>สมัครสมาชิก</h1>
          </div>
          <div class="card-body">
            <form @submit="onSave()">
              <div class="form-group">
                <label>Name</label>
                <input
                  class="form-control"
                  v-model.trim="registerdata.Name"
                  required
                />
                <span class="text-danger"></span>
              </div>
              <div class="form-group">
                <label>PhoneNumber</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="registerdata.PhoneNumber"
                  required
                />
                <span class="text-danger"></span>
              </div>
              <div class="form-group">
                <label>StreetAddress</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="registerdata.StreetAddress"
                  required
                />
                <span class="text-danger"></span>
              </div>
              <div class="form-group">
                <label>City</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="registerdata.City"
                  required
                />
                <span class="text-danger"></span>
              </div>
              <div class="form-group">
                <label>State</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="registerdata.State"
                  required
                />
                <span class="text-danger"></span>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model.trim="registerdata.Email"
                  required
                />
                <span class="text-danger"></span>
              </div>
              <div class="form-group">
                <label>PostalCode</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="registerdata.PostalCode"
                  required
                />
                <span class="text-danger"></span>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model.trim="registerdata.Password"
                  required
                />
                <span class="text-danger"></span>
              </div>
              <div class="form-group">
                <label>ConfirmPassword</label>
                <input
                  type="password"
                  class="form-control"
                  v-model.trim="registerdata.ConfirmPassword"
                  required
                />
                <span class="text-danger"></span>
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
</template>

<script scoped>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import swal from "sweetalert";
Vue.use(VueAxios, axios);

export default {
  name: "register-index",
  data() {
    return {
      registerdata: {
        Name: "",
        PhoneNumber: "",
        StreetAddress: "",
        City: "",
        State: "",
        Email: "",
        PostalCode: "",
        Password: "",
        ConfirmPassword: ""
      }
    };
  },
  methods: {
    onSave() {
      console.log(this.registerdata);
      console.log(this.registerdata.Password);
        console.log(this.registerdata.ConfirmPassword);
      if (this.registerdata.Password == this.registerdata.ConfirmPassword) {
        Vue.axios
          .post("https://localhost:44362/api/register", this.registerdata)
          .then((res, i) => {
            swal("สำเร็จ!", "สมัครสมาชิกเสร็จ", "success");
            location.reload();
          })
          .catch(err => {
            swal("ไม่สำเร็จ!", "สมัครสมาชิกไม่เสร็จ", "error");
            console.log("เข้าระบบไม่ได้" + err);
          });
        this.registerdata = [];

        swal("สำเร็จ!", "สมัครสมาชิกเสร็จ", "success");

      }
      else{
             swal("ไม่สำเร็จ!", "รหัสผ่านให้ไม่เหมือนกัน", "error");
      }
    }
  }
};
</script>

<style scoped></style>
