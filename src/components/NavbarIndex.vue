<template>
  <div id="nav-index">
    <nav
      class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light border-bottom box-shadow bg-info"
    >
      <div class="container-fluid">
        <a
          class="navbar-brand"
          style="cursor: pointer; color: pink"
          @click="reMainIndex"
          ><h1>MedtangMo</h1></a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse ">
          <ul class="nav navbar-nav mr-auto">
            <li class="nav-item" style="cursor: pointer" @click="reMainIndex">
              <h6><a class="nav-link text-white">หน้าหลัก</a></h6>
            </li>
            <li class="nav-item" style="cursor: pointer">
              <h6>
                <a class="nav-link text-white" @click="reProduct">สินค้า</a>
              </h6>
            </li>
            <li class="nav-item" style="cursor: pointer">
              <h6>
                <a class="nav-link text-white" @click="reNcart">ตะกล้าสินค้า</a>
              </h6>
            </li>
            <li class="nav-item" style="cursor: pointer">
              <h6>
                <a class="nav-link text-white" @click="reSerchIndex"
                  >ค้นหารายการสินค้า</a
                >
              </h6>
            </li>
          </ul>

          <ul class="nav navbar-nav ">
            <li class="nav-item " style="cursor: pointer">
              <h6>
                <a class="nav-link text-white" @click="reregister">Register</a>
              </h6>
            </li>
            <li class="nav-item" style="cursor: pointer">
              <h6 v-if="slog">
                <a class="nav-link text-white" @click="reLogin">Login</a>
              </h6>

              <h6 v-else>
                <a class="nav-link text-white" @click="reout">Logout</a>
              </h6>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "nav-index",
  data() {
    return {
      slog: true
    };
  },
  mounted() {
    console.log("เข้า"+this.slog)
    if (this.$session.exists()) {
      let data = this.$session.get("Login");
      if (data.length != 0) {
        this.slog = false;
      }
    }
  },
  methods: {
    reMainIndex() {
      this.$router.push("/main-index");
    },
    reSerchIndex() {
      this.$router.push("/search-index");
    },
    reProduct() {
      this.$router.push("/product-index");
    },
    reNcart() {
      this.$router.push("/ncart-index");
    },
    reregister() {
      this.$router.push("/register-index");
    },
    reLogin() {
      this.$router.push("/Login-index");
    },
    reout() {
      this.$router.push("/main-index");
      this.$session.remove("Login");
      this.slog = true;
    }
  }
};
</script>

<style scoped></style>
