<template>
  <div id="product-index">
    <div class="container">
      <div
        v-for="items in PromotionImge"
        :key="items.PromotionImageShow"
        class="m-1"
      >
        <img v-bind:src="items.PromotionImageShowMid" class="img-fluid" />
      </div>
      <div id="cartlist" class="card card-body">
        <div class="from-row">
          <div class="d-flex justify-content-center">
            <label
              ><h2><b>สินค้าทังหมด</b></h2></label
            >
          </div>

          <div class="d-flex justify-content-center">
            <!-- <b-dropdown text="เลือกประเภทสินค้า" class="m-md-2">
              <b-dropdown-item v-for="item in typeimg" :key="item.title"
                >{{ item.title }}
              </b-dropdown-item>
            </b-dropdown> -->

            <div class="d-flex flex-column">
              <label>เลือกประเภทสินค้า</label>
              <select v-model="selected">
                <option disabled value="">Please select one</option>
                <option v-for="item in typeimg" :key="item.title">{{
                  item.title
                }}</option>
              </select>
            </div>

            <div class="m-2">
              <label>กรุณาเลือกช่วงราคา</label>
              <b-form-input
                v-model="valuedata"
                type="range"
                min="20"
                max="200"
              ></b-form-input>
              <div class="mt-2">Value: {{ valuedata }}</div>
            </div>
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-primary"
                @click="onSearch(selected, valuedata)"
              >
                ค้นหา
              </button>
            </div>
          </div>
          <div class="card card-group">
            <div class="col-md-3" v-for="item in imgcart" :key="item.id">
              <div class="card mt-3">
                <img
                  :src="'static/' + item.imageUrl"
                  class="img-fluid card-img-top rounded"/>

                <div class="card-body text-center">
                  <div class="pl-1">
                    <p class="card-title h5">
                      <b style="color: #2c3e50">{{ item.type }}</b>
                    </p>
                    <p class="card-title text-primary">by <b>MedTangMo</b></p>
                  </div>

                  <div style="padding-left: 5px">
                    <p>
                      List Price:
                      <strike>
                        <b>{{ item.price }}</b>
                      </strike>
                    </p>
                  </div>
                  <div style="padding-left: 5px">
                    <p style="color: maroon">
                      As low as:
                      <b>{{ item.price50 }}</b>
                    </p>
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onCart(item.id)"
                  >
                    เพิ่มไปยังตระกล้า
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import swal from "sweetalert";

Vue.use(VueAxios, axios);
export default {
  name: "product-index",
  data() {
    return {
      valuedata: 20,
      selected: "",
      PromotionImge: [
        {
          PromotionImageShowMid:
            "https://scontent.fbkk22-5.fna.fbcdn.net/v/t1.6435-9/126861848_707892266520017_2829846432698277402_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8bfeb9&_nc_eui2=AeEvd6nkHPF3v2xRLfua4SooslGcIsAEdVKyUZwiwAR1UnRsA7KFy28r-9r6qndWlpo&_nc_ohc=Q-0Ln_VY7zkAX-4RsN0&_nc_ht=scontent.fbkk22-5.fna&oh=246218d93124438455fb2b561029d541&oe=60A13243"
        }
      ],
      typeimg: [],
      imgcart: [],
      datacart: []
    };
  },
  mounted() {
    Vue.axios
      .get("https://localhost:44362/api/Products")
      .then((res, i) => {
        var dataimg = res.data;
        dataimg.forEach((r, i) => {
          this.imgcart.push({
            bill: 0,
            id: r.id,
            title: r.title,
            description: r.description,
            type: r.type,
            price: r.price,
            price50: r.price50,
            imageUrl: r.imageUrl
          });
        });
      })
      .catch(err => {
        console.log(err.message);
      });

    Vue.axios
      .get("https://localhost:44362/api/Carts/Gettype")
      .then((res, i) => {
        var datatype = res.data;
        datatype.forEach((r, i) => {
          this.typeimg.push({
            title: r.title
          });
        });
        // console.log(this.typeimg);
      })
      .catch(err => {});

  },
  methods: {
    onCart(item) {
      let sec = this.$store.getters.showdataCart.length;
      if ( sec != 0) {
        this.datacart = this.$store.getters.showdataCart;
      }
      var found = this.findIndex(item);
      if (found) {
        //ไม่ซ้ำ
        this.imgcart
          .filter(x => x.id === item)
          .forEach((r, i) => {
            this.datacart.push({
              bill: 0,
              id: r.id,
              title: r.title,
              description: r.description,
              type: r.type,
              price: r.price,
              price50: parseInt(r.price50),
              imageUrl: r.imageUrl,
              qyt: 1,
              total: parseInt(r.price50)
            });
          });
      } else {
        var foundPlus = this.Plusdatabutton(item);
        if (foundPlus) {
        }
      }

      // console.log(this.datacart);
      this.$store.commit("setdataCart", this.datacart);
      // this.$session.start();
      // this.$session.set("Cart", this.datacart);
      swal("สำเร็จ!", "เพิ่มสินค้าแล้ว", "success");
    },
    findIndex(datafile) {
      for (let i = 0; i < this.datacart.length; i++) {
        if (this.datacart[i].id == datafile) {
          return false;
        }
      }
      return true;
    },
    Plusdatabutton(datafile) {
      for (let i = 0; i < this.datacart.length; i++) {
        if (this.datacart[i].id == datafile) {
          this.datacart[i].qyt += 1;
          this.datacart[i].total =
            this.datacart[i].qyt * this.datacart[i].price50;
          return true;
        }
      }
      return false;
    },
    onSearch(type, val) {
      if (type.length != 0) {
        let searchData = [
          {
            title: type,
            price50: parseInt(val)
          }
        ];

        Vue.axios
          .post("https://localhost:44362/api/Products/Search", searchData)
          .then((res, i) => {
            this.imgcart = [];
            var datatype = res.data;
            datatype.forEach((r, i) => {
              this.imgcart.push({
                bill: 0,
                id: r.id,
                title: r.title,
                description: r.description,
                type: r.type,
                price: r.price,
                price50: r.price50,
                imageUrl: r.imageUrl
              });
            });
            // console.log(this.imgcart);
          })
          .catch(err => {});

        // console.log(searchData);
      } else {
        swal("ไม่สำเร็จ!", "เลือกรายการสินค้า", "error");
      }
    }
  }
};
</script>

<style>
#cartlist {
  position: relative;
  min-height: 100%;
}
</style>
