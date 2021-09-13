<template>
  <div>
    <div class="selectmenu">
      <b-button block id="check" @click="router.push('check')">뒤로 가기</b-button><br>
    </div>
  </div>
</template>
<script>
import router from "../../router";
export default {
  name: 'augmentmenu',
  data() {
    return {
      router: router
    }
  },
};
</script> 
<style scoped>
.selectmenu {
  text-align: center;
  padding: 40px;
}

#check {
  width: 100%;
  font-size: 20px;
  background-color: #576574;
}
</style>