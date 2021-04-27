<template >
  <div id="search-index">
    <div class="container h-100 p-5">
      <div class="d-flex justify-content-center ">
      <h1 class="text-primary">ค้นหาจากเลขที่ใบเสร็จ</h1>
      </div>
      <div class="d-flex justify-content-center h-100 pt-5">
        <div class="searchbar">
          <label>เลขที่ใบเสร็จ</label>
          <input
            class="search_input"
            type="text"
            placeholder="Search..."
            v-model.trim="massge"
          />
          <button
            type="button"
            class="btn btn-primary"
            @click="finddata(massge)"
          >
            <i class="fas fa-search" style="cursor: pointer"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="container h-100" v-if="checkcontrol">
      <form v-for="item in persondata" :key="item.bill">
        <div class="form-group row">
          <div class="col-sm-4">
            <label class="col-form-label">ชื่อ-นามสกุล:</label>
          </div>
          <div class="col-sm-8">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4">
            <label class="col-form-label">โทรศัพท:</label>
          </div>
          <div class="col-sm-8">
            <span>{{ item.tel }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4">
            <label class="col-form-label">ที่อยู่:</label>
          </div>
          <div class="col-sm-8">
            <span>{{ item.address }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4">
            <label class="col-form-label">แขวง/ตำบล:</label>
          </div>
          <div class="col-sm-8">
            <span>{{ item.subDistrict }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4">
            <label class="col-form-label">เขต/อำเภอ:</label>
          </div>
          <div class="col-sm-8">
            <span>{{ item.district }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4">
            <label class="col-form-label">จังหวัด:</label>
          </div>
          <div class="col-sm-8">
            <span>{{ item.province }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4">
            <label class="col-form-label">รหัสไปรษณี:</label>
          </div>
          <div class="col-sm-8">
            <span>{{ item.postalcode }}</span>
          </div>
        </div>
      </form>
      <div class="row">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ภาพ</th>
              <th scope="col">ชื่อ</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">ยอดรวม</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in bildata" :key="items.bill">
              <td>
                <img :src="items.imageUrl"          
                class="img-fluid" style="width: 300px; height:300px ;" />
              </td>
              <td>{{ items.type }}</td>
              <td>{{ items.price50 }}</td>
              <td>
                {{ items.qyt }}
              </td>
              <td>{{ items.qyt * items.price50 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  name: "search-index",
  data() {
    return {
      checkcontrol: false,
      massge: "",
      persondata: [],
      bildata: [],
    };
  },
  methods: {
    finddata(numberadta) {
      if (numberadta.length != 0) {
        this.persondata = [];
        this.bildata = [];
        var numberpersondata =
          "https://localhost:44362/api/Customers/" + numberadta;

        Vue.axios
          .get(numberpersondata)
          .then((res, i) => {
            var dataperson = res.data;
            this.persondata.push(dataperson);
          })
          .catch((err) => {
            
            this.checkcontrol = false;
          });
        var numberbildata = "https://localhost:44362/api/Carts/" + numberadta;

        Vue.axios
          .get(numberbildata)
          .then((res, i) => {
            var databill = res.data;
            databill.forEach((r, i) => {
                let raw = r.imageUrl;
                let yraw = "static/images/products/"+raw.slice(17,70);
              this.bildata.push({
                bill: r.bill,
                id: r.id,
                title: r.title,
                description: r.description,
                type: r.type,
                price: r.price,
                price50: r.price50,
                imageUrl: yraw ,
                qyt: r.qyt,
                total: r.price,
              });
            });
          })
          .catch((err) => {
            this.checkcontrol = false;
          });

        this.checkcontrol = true;
      } else {
        this.persondata = [];
        this.checkcontrol = false;
      }
    },
  },
};
</script>

<style scoped>
</style>

