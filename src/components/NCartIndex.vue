<template>
  <div id="ncart-index">
    <div class="container" v-if="showdialog">
      <!--------- ตะกล้าสินค้า--------->
      <div class="card card-body">
        <div class="row">
          <label
            ><h2><b>ตะกล้าสินค้า</b></h2></label
          >
        </div>
        <div class="row">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ภาพ</th>
                <th scope="col">ชื่อ</th>
                <th scope="col">ราคา</th>
                <th scope="col">จำนวน</th>
                <th scope="col">ยอดรวม</th>
                <th scope="col">ลบ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="datas in dataCart2" :key="datas.id">
                <td>
                  <img
                    :src="'static/' + datas.imageUrl"
                    class="img-fluid"
                    style="width: 300px; height: 300px"
                  />
                </td>
                <td>{{ datas.type }}</td>
                <td>{{ datas.price50 }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="minusdatabutton(datas.id)"
                  >
                    <i class="fas fa-minus qty-minus"> </i>
                  </button>
                  {{ datas.qyt }}
                  <button
                    type="button"
                    @click="Plusdatabutton2(datas.id)"
                    class="btn btn-primary"
                  >
                    <i class="fas fa-plus qty-plus"></i>
                  </button>
                </td>

                <td>{{ datas.total }}</td>
                <td>
                  <button
                    class="btn btn-danger"
                    @click="romoveroduct(datas.id)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <!------ไม่ใช้ตาราง----------->
        <div class="row">
          <div class="col-md-4 text-left">
            <label>ค่าสินค้า</label>
          </div>
          <div class="col-md-8 text-right">
            <span>{{ totalcart() }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 text-left">
            <label>ค่าจัดส่งสินค้า</label>
          </div>
          <div class="col-md-8 text-right">
            <span>60</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 text-left">
            <label>ราคารวม</label>
          </div>
          <div class="col-md-8 text-right">
            <span>{{ totalcart() + 60 }}</span>
          </div>
        </div>
      </div>

      <form @submit="onsave">
        <!--การชำระเงิน-->
        <div class="card card-body">
          <div class="form-row">
            <div class="form-group">
              <label
                ><h2><b>การชำระเงิน</b></h2></label
              >
              <div class="form-row">
                <input type="radio" checked />
                <label>กสิกรไทย</label>
              </div>
            </div>
          </div>
        </div>

        <!--บัญชีผู้ขาย-->
        <div class="card card-body">
          <div class="form-row">
            <label
              ><h2><b>บัญชีผู้ขาย</b></h2></label
            >
          </div>
          <div class="row">
            <div class="col-4"><p>ชื่อ</p></div>
            <div class="col-8"><p>xxxxx</p></div>
          </div>
          <div class="row">
            <div class="col-4"><p>เลขที่บัญชี</p></div>
            <div class="col-8"><p>xxxxxxxxxxxxxx</p></div>
          </div>
          <div class="row">
            <div class="col-4"><p>ธนาคาร</p></div>
            <div class="col-8"><p>xxxxxxxxxxxxxx</p></div>
          </div>
        </div>

        <!-----ที่จัดส่ง---->
        <div class="card card-body">
          <div class="form-group">
            <label
              ><h2><b>ที่อยุ่ผู้รับ</b></h2></label
            >
            <hr />
          </div>
          <div class="form-group">
            <label>ชื่อ-นามสกุล</label>
            <input
              type="text"
              v-model.trim="savedata.name"
              class="form-control"
              placeholder="ชื่อ-นามสกุล"
              required
            />
          </div>
          <div class="form-group">
            <label> โทรศัพท</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="savedata.tel"
              placeholder="โทรศัพท"
              required
            />
          </div>
          <div class="form-group">
            <label>ที่อยู่</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="savedata.address"
              placeholder="ที่อยู่"
              required
            />
          </div>
          <div class="form-group">
            <label>แขวง/ตำบล</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="savedata.subDistrict"
              placeholder="แขวง/ตำบล"
              required
            />
          </div>
          <div class="form-group">
            <label>เขต/อำเภอ</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="savedata.district"
              placeholder="เขต/อำเภอ"
              required
            />
          </div>
          <div class="form-group">
            <label>จังหวัด</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="savedata.province"
              placeholder="จังหวัด"
              required
            />
          </div>
          <div class="form-group">
            <label>รหัสไปรษณี</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="savedata.postalcode"
              placeholder="รหัสไปรษณี"
              required
            />
          </div>
          <div class="form-group">
            <label>ฝากข้อความไว้(ถ้ามี)</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="savedata.detailshop"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">สั่งซื้อ</button>
          </div>
        </div>
      </form>
    </div>
    <div class="container pt-5" v-else>
      <div class="d-flex justify-content-center">
        <h1>กรุณาเลือกรายการสินค้า</h1>
      </div>
    </div>
  </div>
</template>

<script scoped>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

export default {
  name: "ncart-index",
  data() {
    return {
      showdialog: false,
      savedata: {
        bill: 0,
        name: "",
        tel: "",
        address: "",
        subDistrict: "",
        district: "",
        province: "",
        postalcode: "",
        detailshop: ""
      },
      dataCart2: []
    };
  },
  mounted() {
    // console.log("ความยาว"+this.$store.getters.showdataCart.length);
    if (this.$store.getters.showdataCart.length != 0) {
      this.dataCart2 = this.$store.getters.showdataCart;
      this.showdialog = true;
      // console.log(this.dataCart2);
    }
  },
  methods: {
    totalcart() {
      var sum = 0;
      this.dataCart2.forEach(r => {
        sum += r.total;
      });
      return sum;
    },
    Plusdatabutton2(datafile) {
      this.dataCart2.forEach(r => {
        if (r.id == datafile) {
          r.qyt += 1;
          r.total = r.qyt * r.price50;
        }
      });
      this.$store.commit("setdataCart", this.dataCart2);
    },
    minusdatabutton(datafile) {
      let i = 0;
      let num;
      let del = false;
      this.dataCart2.forEach(r => {
        i++;
        if (r.id == datafile) {
          if (r.qyt >= 1) {
            r.qyt -= 1;
            r.total = r.qyt * r.price50;
            if (r.qyt == 0) {
              del = true;
              num = i;
            }
          }
        }
      });
      if (del) {
        this.dataCart2.splice(num - 1, 1);
        del = false;
      }
      if (this.dataCart2.length <= 0) {
        this.showdialog = false;
      }
      this.$store.commit("setdataCart", this.dataCart2);
    },
    romoveroduct(datafile) {
      if (confirm("คุณต้องการลบข้อมูลหรือไม่")) {
        let num;
        for (let i = 0; i < this.dataCart2.length; i++) {
          if (this.dataCart2[i].id == datafile) {
            // console.log(this.dataCart2[i].id);
            num = i;
          }
        }
        console.log(num);
        this.dataCart2.splice(num, 1);
        if (this.dataCart2.length <= 0) {
          this.showdialog = false;
        }
      }
      this.$store.commit("setdataCart", this.dataCart2);
    },
    onsave() {
      if (this.dataCart2 != 0) {
        this.plusbill();
        let send = [];
        send.push(this.dataCart2);
        send.push([this.savedata]);
        let remove = [];
        Vue.axios
          .post("https://localhost:44362/api/Products", send)
          .then(res => {
            this.$store.commit("setdataCart", remove);
            // this.$session.remove("Cart");
            alert("สำเร็จ");
            this.showdialog = false;
            // console.log(res);
          })
          .catch(err => {
            err.message;
          });
      } else {
        alert("กรุณาเลือกรายการสินค้า");
      }
    },
    plusbill() {
      var num = Math.floor(Math.random() * 100000 + 100);
      for (let i = 0; i < this.dataCart2.length; i++) {
        this.dataCart2[i].bill = num;
      }
      this.savedata.bill = num;
      for (let j = 0; j < this.savedata.length; j++) {
        this.savedata[0].bill = num;
      }
    }
  }
};
</script>

<style scoped></style>
