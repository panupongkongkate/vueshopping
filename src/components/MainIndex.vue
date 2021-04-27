<template >
  <div id="main-index">
    <div class="container">
      <div class="row">
        <div
          v-for="item in PromotionImge"
          :key="item.PromotionImageShow"
          class="m-1"
        >
          <img v-bind:src="item.PromotionImageShow" class="img-fluid" />
        </div>
      </div>
      <div class="text-center">
        <p></p>
        <h1>"ต่างหูหนีบ เพื่อคนไม่เจาะหู"</h1>
        <p></p>
        <p>เคยใช่มั้ย...ใช้ต่างหูหนีบ แต่ใส่ได้ไม่นานเพราะเจ็บ</p>
        <p></p>
        <p>ปัญหานี้จะหมดไป ด้วยต่างหูของร้านเรา</p>
        <p></p>
        <p>เพราะมี</p>
        <h3>"น้ำหนักเบา"</h3>
        เบากว่าเหรีญบาท
        <p></p>
        <p></p>
        <h4>"จบปัญหาใส่แล้วเจ็บ"</h4>
        <p></p>
        <p>ต่างหูห่วงหนีบใส่แล้วเนียนเหมือนเจาะหู</p>
        <p>ด้วยต่างหูพรีเมี่ยม วัสดุเกรดนำเข้า</p>
      </div>
      <div class="d-flex justify-content-center h-100">
        <button type="button" class="btn btn-primary" @click="reproduct">
          <h1>ดูตัวอย่างสินค้า</h1>
        </button>
      </div>
      <div class="row">
        <div
          v-for="items in PromotionImge"
          :key="items.PromotionImageShow"
          class="m-1"
        >
          <img v-bind:src="items.PromotionImageShowMid" class="img-fluid" />
        </div>
      </div>
      <!-- <cart-index /> -->
    </div>
  </div>
</template>
<script scoped>
// import CartIndex from "@/components/CartIndex";
export default {
  name: "main-index",
  // components: {
  //   "cart-index": CartIndex,
  // },
  data() {
    return {
      PromotionImge: [
        {
          PromotionImageShow:
            "https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.6435-9/174512230_789537161688860_2661644803456040700_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=a26aad&_nc_eui2=AeE1lts5zvNaSULdr9rWCRT2acIyP3K9xNVpwjI_cr3E1fgslP8jxOzsUJ_SKyLZkMg&_nc_ohc=VprPgeLOaPMAX-zahlA&_nc_ht=scontent.fbkk22-2.fna&oh=0f48027f6368677d1828b026d26f5677&oe=60A18523",
        },
        {
          PromotionImageShow:
            "https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.6435-9/169150823_786432861999290_1083994424472829901_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8bfeb9&_nc_eui2=AeHRaLz9humQIKMAiFXaf7vdnJv2XNeUef-cm_Zc15R5_3pou4jS_P80-LoWf22MvAM&_nc_ohc=xk3utpsjERsAX_Ylg-t&_nc_ht=scontent.fbkk22-1.fna&oh=d1c05c21ab4d66aee7cf788780a96bd4&oe=609F67BD",
        },
        {
          PromotionImageShow:
            "https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.6435-9/170391244_784516468857596_2088568540452628687_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=a26aad&_nc_eui2=AeHEXQV94YDyAT7PxSAVPVhorTZz-3tldFStNnP7e2V0VM-wZG6ephXM7Qq18DuRVrE&_nc_ohc=pbnRerBRAk4AX_Wej6r&_nc_ht=scontent.fbkk22-2.fna&oh=d20d1269b1edf504efbad986ee06fd33&oe=609F685C",
        }
      ],
    };
  },
  methods: {
    reSerchIndex() {
      this.$router.push("/cart-index");
    },
    reproduct() {
      this.$router.push("/product-index");
    },
       reproduct() {
      this.$router.push("/product-index");
    }
  },
};
</script>

<style scoped>
</style>