<template>
  <div>
    <div class="content">
      <div id="camera">
      <div>
        <video ref="video" id="video" width="400px" height="520px" autoplay="autoplay" muted="muted" playsinline/>
      </div>
      <div>
        <button id="snap" v-on:click="capture">Snap Photo</button>
      </div>
      <canvas ref="canvas" id="canvas" width="400px" height="520px" style="display: none"/>
      <canvas ref="cropcanvas" id="canvas" width="400px" height="520px" style="display: none"/>
      </div>
      <div>
        <button v-on:click="setResult" ref="recognize" style="display: none">recognize</button>
        <button v-on:click="gray" ref="gray">gray</button>
      </div>
      <img name="img" id="text-img" alt="not loaded" style="display: none">
      <img id="crop-img" alt="not cropped">
      <div id="result" v-if="loaded">
        {{resultText}}
      </div>
    </div>
    <div class="selectmenu">
      <b-button block id="check" @click="router.push('check')">뒤로 가기</b-button><br>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import { createWorker } from 'tesseract.js';

const worker = createWorker({
  logger: m => console.log(m),
});

export default {
  name: 'augmentmenu',
  data() {
    return {
      router: router,
      video: {},
      canvas: {},
      cropcanvas: {},
      canvasValue: "",
      loaded: false,
      resultText: "not loaded"
    }
  },
  mounted() {
    this.video = this.$refs.video;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream;
        this.video.play();
        this.video.onplay = function () {};
        this.video.play();
      });
    }
  },
  methods: {
    setResult() {
      this.recognize()
      .then((response) => {
        this.loaded = true;
        this.resultText = response;
      })
    },
    recognize: async () => {
      const img = document.getElementById('crop-img');
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      await worker.setParameters({
        tessedit_char_whitelist: '0123456789'
      });
      const { data: { text } } = await worker.recognize(img);
      await worker.terminate();
      console.log(text);
      return text;
    },
    gray() { // 그레이 스케일
        var image= document.getElementById("crop-img");
        var canvas=document.createElement("canvas");
        var ctx=canvas.getContext("2d");
        canvas.width= image.width;
        canvas.height= image.height;
        ctx.drawImage(image,0,0);
        var imageData=ctx.getImageData(0,0, image.width, image.height);
        for (var i=0;i<imageData.data.length;i+=4) {
            var avg= (imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3;
            imageData.data[i]= avg;
            imageData.data[i+1]= avg;
            imageData.data[i+2]= avg;
        }
        ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
        this.canvasValue = canvas.toDataURL();
        const img = document.getElementById('crop-img');
        img.setAttribute("src" ,this.canvasValue);
        console.log("gray");
        this.$refs.recognize.click(); 
    },
    capture() {
        this.canvas = this.$refs.canvas;
        this.canvas.getContext("2d").drawImage(this.video, 0, 0, 400, 520);
        const img = document.getElementById('text-img');
        img.setAttribute("src" ,this.canvas.toDataURL());

        this.cropcanvas = this.$refs.cropcanvas;
        this.cropcanvas.getContext("2d").drawImage(this.video, 210, 140, 270, 240, 0, 0, 270, 240);
        const cropimg = document.getElementById("crop-img");
        cropimg.setAttribute("src", this.cropcanvas.toDataURL())
        //this.$refs.gray.click();
    },
  }
};
</script> 
<style scoped>
.content {
  margin-top: 40px;
  text-align: center;
}

#qrcamera {
  width: 400px;
  height: 520px;
  margin-left: auto;
  margin-right: auto;
}

video {
  width: 400px;
  height: 520px;
  object-fit: cover;
}

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