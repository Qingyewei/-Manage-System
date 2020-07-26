<template>
  <div class="m-showmenu">
    <div class="menu-cont">
      <div class="logo">
        <a target="_blank" href>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icongithub" />
          </svg>
        </a>
      </div>
      <div class="file" @click="fileClick">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconresume" />
        </svg>
        <p class="file-des">生成简历</p>
      </div>
      <div class="file" @click="goToHome">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconloginout" />
        </svg>
        <p class="file-des">进入首页</p>
      </div>
      <div class="download-file" @click="downloadClick">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icondownload" />
        </svg>
      </div>
      <transition name="fade">
        <div class="download-choice" v-show="showDownloadChoice">
          <div class="dpi96 setdpi">
            <p>96像素/英寸</p>
            <p>A4 794×1123</p>
            <input type="radio" @click="choiceClick({'width':794,'height':1123})" />
          </div>
          <div class="dpi120 setdpi">
            <p>120像素/英寸</p>
            <p>A4 1487×2105</p>
            <input type="radio" @click="choiceClick({'width':1487,'height':2015})" />
          </div>
          <div class="custom">
            width :
            <input type="text" v-model="customPx.width" placeholder="px" />
            height:
            <input type="text" v-model="customPx.height" placeholder="px" />
            <span
              class="ok-choice"
              @click="choiceClick({'width':parseInt(customPx.width),'height':parseInt(customPx.height)})"
            >down</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      msg: "hello vue",
      showDownloadChoice: false,
      customPx: {
        width: "",
        height: "",
      },
    };
  },
  created() {},
  methods: {
    goToHome() {
      this.$router.push({ name: "home" });
    },
    fileClick: function () {
      this.$emit("listenShowMenu", { type: "fileClick", showFlag: true });
    },
    downloadClick: function () {
      this.showDownloadChoice = !this.showDownloadChoice;
    },
    choiceClick: function (size) {
      if (size.width && size.height) {
        this.$emit("listenShowMenu", { type: "choiceClick", size: size });
        this.showDownloadChoice = !this.showDownloadChoice;
      }
    },
  },
  components: {},
};
</script>

<style lang="less">
.m-showmenu {
  float: left;
  width: 8%;
  height: 100%;
  background: #ffffff;
  .icon {
    width: 56px;
    height: 56px;
  }
  .menu-cont {
    position: relative;
    width: 90%;
    height: 99%;
    margin: 0 auto;
    padding-top: 1rem;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .logo,
  .file,
  .download-file {
    width: 100%;
    color: #c30d23;
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  .logo a {
    color: #c30d23;
  }
  .file .file-des {
    font-size: 1.6rem;
  }
  .download-file {
    position: absolute;
    bottom: 2rem;
  }
  .logo,
  .file,
  .download-file:hover {
    cursor: pointer;
  }
  .download-choice {
    position: absolute;
    z-index: 9999;
    bottom: 3.5rem;
    left: 110%;
    width: 35rem;
    text-align: center;
    background: #ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .setdpi {
    display: inline-block;
    padding: 1rem;
    font-size: 1.6rem;
    color: #c30d23;
  }
  .custom {
    display: inline-block;
    width: 10rem;
    font-size: 1.6rem;
    color: #c30d23;
  }
  .custom input {
    width: 5rem;
    text-align: right;
  }
  .ok-choice {
    display: inline-block;
    text-align: center;
    border: 1px solid #c30d23;
    border-radius: 6px;
    padding: 1px 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .ok-choice:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0);
    cursor: pointer;
  }
}
</style>
