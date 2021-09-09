<template>
  <div>
    <div>
      <p class="decode-result">Last result: <b>{{ result }}</b></p>

      <qrcode-capture @decode="onDecode"/>
    </div>
  </div>
</template>
<script>
import { QrcodeCapture } from 'vue-qrcode-reader'
export default {
  name: 'qrcodemenu',
  components: { QrcodeCapture },
  data () {
    return {
      result: ''
    }
  },
  methods: {
    onDecode (result) {
      console.log("in");
      this.result = result;
      console.log(this.result);
    }
  },
};
</script> 