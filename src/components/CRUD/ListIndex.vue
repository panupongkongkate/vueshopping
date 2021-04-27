<template>
  <div class="container-fluid">
    <div class="row pt-5">
      <div class="col-6">
        <h2 class="text-primary">รายการสินค้าแต่ละประเภท</h2>
      </div>
      <div class="col-6 text-right">
        <b-button variant="primary" v-b-modal.modal-edit-add>
          <i class="fas fa-plus"></i> &nbsp; สร้างสินค้าแต่ละประเภท
        </b-button>
      </div>
    </div>
    <div class="pt-3">
      <b-table :items="dataitems" :head-variant="headVariant">
        <template #cell(imagedata2)="data">
          <b-img
            :src="data.value"
            class="img-fluid rounded "
            style="height:25vh ;"
          ></b-img>
        </template>

        <!-- <template #cell(Edit)="data">
          <label v-html="data.value"></label>
        </template> -->

        <template #cell(Edit)="data">
          <b-button
            variant="warning"
            size="sm"
            class="mr-1"
            @click="Editmodal(data.item)"
          >
            <i class="fas fa-edit"></i>
          </b-button>
          <b-button variant="danger" size="sm" @click="Deletemodal(data.item)">
            <i class="fas fa-trash-alt"></i>
          </b-button>
        </template>
      </b-table>
    </div>

    <b-modal
      id="modal-edit-add"
      ref="modaldata"
      :title="headTitle"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="Title-name"
          invalid-feedback="Title is required"
        >
          <b-form-input id="Title-name" v-model="Title" required>
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="Description"
          label-for="Description-name"
          invalid-feedback="Description is required"
        >
          <b-form-input
            id="Description-name"
            v-model="Description"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Type"
          label-for="Type-name"
          invalid-feedback="Type is required"
        >
          <b-form-input id="Type-name" v-model="Type" required></b-form-input>
        </b-form-group>

        <b-form-group
          label="Price"
          label-for="Price-name"
          invalid-feedback="Price is required"
        >
          <b-form-input id="Price-name" v-model="Price" required></b-form-input>
        </b-form-group>

        <b-form-group
          label="Price50"
          label-for="Price50-name"
          invalid-feedback="Price50 is required"
        >
          <b-form-input
            id="Price50-name"
            v-model="Price50"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Image"
          label-for="Image-name"
          invalid-feedback="Image is required"
        >
          <b-form-file
            v-model="Image"
            plain
            accept=".jpg, .png"
            required
          ></b-form-file>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import swal from "sweetalert";
Vue.use(VueAxios, axios);

export default {
  name: "list-index",
  data() {
    return {
      IDaddOredit: 0,
      headTitle: "สร้างรายการสินค้า",
      Title: "",
      Description: "",
      Type: "",
      Price: "",
      Price50: "",
      Image: null,

      dataitems: [],
      headVariant: "dark"
    };
  },
  mounted() {
    Vue.axios
      .get("https://localhost:44362/api/Products")
      .then((res, i) => {
        var dataimg = res.data;
        dataimg.forEach((r, i) => {
          this.dataitems.push({
            imagedata2: "static/" + r.imageUrl,
            id: r.id,
            title: r.title,
            description: r.description,
            type: r.type,
            price: r.price,
            price50: r.price50,
            Edit: []
            // Edit:
            //   ' <a class="btn btn-success text-white" @click="showModal()" >' +
            //   '<i class="fas fa-edit"></i>' +
            //   "</a>" +
            //   '<a class="btn btn-danger text-white">' +
            //   ' <i class="fas fa-trash-alt"></i>'
          });
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },
  methods: {
    resetModal() {
      this.Title = "";
      this.Description = "";
      this.Type = "";
      this.Price = "";
      this.Price50 = "";
      this.Image = "";
      this.headTitle = "สร้างรายการสินค้า";
      this.IDaddOredit = 0;
      console.log("เลข" + this.IDaddOredit);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        console.log("ค่าไม่ครบ");
        return;
      }

      if (this.IDaddOredit == 0) {
        //Add
        let send = [];
        send.push({
          title: this.Title,
          description: this.Description,
          type: this.Type,
          price: parseInt(this.Price),
          price50: parseInt(this.Price50),
          imageUrl: this.Image.name
        });
        Vue.axios
          .post("https://localhost:44362/api/Products/Addproduct", send)
          .then(res => {
            swal("สำเร็จ!", "เพิ่มสินค้าแล้ว", "success");
          })
          .catch(err => {
            err.message;
          });
      } else {
        //Edit
        //---------------------------------
        let send = [];
        send.push({
          id: parseInt(this.IDaddOredit),
          title: this.Title,
          description: this.Description,
          type: this.Type,
          price: parseInt(this.Price),
          price50: parseInt(this.Price50),
          imageUrl: this.Image.name
        });
        Vue.axios
          .put(
            "https://localhost:44362/api/Products/" +
              parseInt(this.IDaddOredit),
            send
          )
          .then(res => {
            swal("สำเร็จ!", "แก้ไขสินค้าแล้ว", "success");
          })
          .catch(err => {
            err.message;
          });
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-edit-add");
      });
      location.reload();
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    showModal() {
      console.log("กดแล้ว");
      this.$refs["modaldata"].show();
    },
    Deletemodal(dataitem) {
      if (confirm("คุณต้องการลบข้อมูลหรือไม่")) {
        console.log(dataitem);
        let item = [];
        item.push(dataitem);
        item.map(r => {
          this.IDaddOredit = r.id;
          this.Title = r.title;
          this.Description = r.description;
          this.Type = r.type;
          this.Price = r.price;
          this.Price50 = r.price50;
          this.Image = r.imagedata2;
        });
        console.log(this.IDaddOredit);
        if (this.IDaddOredit != 0) {
          Vue.axios
            .delete(
              "https://localhost:44362/api/Products/" +
                parseInt(this.IDaddOredit)
            )
            .then(res => {
              this.IDaddOredit = 0;
              swal("สำเร็จ!", "ลบสินค้าแล้ว", "success");
              location.reload();
            })
            .catch(err => {
              this.IDaddOredit = 0;
              err.message;
            });
        }
      }
    },
    Editmodal(dataitem) {
      this.headTitle = "แก้ไขข้อมูลสินค้า";
      this.$refs["modaldata"].show();
      let item = [];
      item.push(dataitem);
      item.map(r => {
        this.IDaddOredit = r.id;
        this.Title = r.title;
        this.Description = r.description;
        this.Type = r.type;
        this.Price = r.price;
        this.Price50 = r.price50;
        this.Image = r.imagedata2;
      });
      console.log("เลข" + this.IDaddOredit);
    }
  }
};
</script>

<style></style>
