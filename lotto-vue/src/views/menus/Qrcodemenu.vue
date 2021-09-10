<template>
  <div>
    <div v-if="searching">
      <p class="decode-result">Last result: <b>{{ url }}</b></p>

      <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>
    <div v-if="searched">
      <h1>{{url}}</h1>
    </div>
  </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: 'qrcodemenu',
  components: { QrcodeStream },
  data () {
    return {
      searching: true,
      searched: false,
      url: ""
    }
  },
  methods: {
    onDecode (result) {
      this.url = result;
      this.searching = false;
      this.searched = true;
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        console.log(this.error);
      }
    }
  },
};
</script> 