<template>
  <div>
    <div class="selectmenu">
      <b-button block id="onhand" @click="router.push('onhand')">수기 입력</b-button><br>
      <b-button block id="qrcode" @click="router.push('qrcode')">QR 코드 입력</b-button><br>
      <b-button block id="ar" @click="router.push('augment')">AR 기능</b-button><br>
    </div>
  </div>
</template>
<script>
import router from "../router"
export default {
  name: 'checkpage',
  data() {
    return {
      router: router  
    }
  }  
};
</script> 
<style scoped>
.selectmenu {
  text-align: center;
  padding: 40px;
}

#onhand, #qrcode, #ar {
  margin-bottom: 40px;
  width: 100%;
  font-size: 20px;
  background-color: #576574;
}

.menu {
  color: white;
}
</style>