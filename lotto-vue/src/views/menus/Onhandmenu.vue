<template>
  <div>
    <div class="inputlotto">
      <b-input-group prepend="번호" class="mb-2">
        <b-form-input type="number" pattern="\d*" v-model="number" aria-label="number" class="form-control" id="drwNo" placeholder="회차" @focus="$event.target.placeholder=''; $event.target.select();" @blur="$event.target.placeholder='회차'" oninput="javascript: if (this.value.length >= 4) {this.value = this.value.slice(0, 4); document.getElementById('drwtNo1').focus();}" @keyup.enter="getInput"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="one" aria-label="one" class="form-control" id="drwtNo1" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo2').focus();}" @keyup.enter="getInput"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="two" aria-label="two" class="form-control" id="drwtNo2" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo3').focus();}" @keyup.enter="getInput"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="three" aria-label="three" class="form-control" id="drwtNo3" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo4').focus();}" @keyup.enter="getInput"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="four" aria-label="four" class="form-control" id="drwtNo4" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo5').focus();}" @keyup.enter="getInput"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="five" aria-label="five" class="form-control" id="drwtNo5" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo6').focus();}" @keyup.enter="getInput"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="six" aria-label="six" class="form-control" id="drwtNo6" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('inputbtn').focus();}" @keyup.enter="getInput"></b-form-input>
        <div class="input-group-append">
          <b-button class="btn btn-secondary" type="button" id="inputbtn" style="background-color: #576574" @click="getInput">입력</b-button>
        </div>
      </b-input-group>

      <div class="alertContainer">
        <b-button id="error1" v-b-modal.err1 ref="showError1">숫자개수오류</b-button>
        <b-modal title="오류" id="err1" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">숫자 7개를 모두 입력해야합니다.</p>
        </b-modal>
        <b-button id="error2" v-b-modal.err2 ref="showError2">업데이트오류</b-button>
        <b-modal title="오류" id="err2" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">아직 업데이트가 안된 회차입니다.</p>
        </b-modal>
        <b-button id="error3" v-b-modal.err3 ref="showError3">유효기간오류</b-button>
        <b-modal title="오류" id="err3" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">유효기간 1년이 지난 회차입니다.</p>
        </b-modal>
        <b-button id="error4" v-b-modal.err4 ref="showError4">숫자범위오류</b-button>
        <b-modal title="오류" id="err4" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">1 부터 45까지의 숫자만 입력 가능합니다.</p>
        </b-modal>
        <b-button id="error5" v-b-modal.err5 ref="showError5">숫자중복오류</b-button>
        <b-modal title="오류" id="err5" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">숫자가 중복됐습니다.</p>
        </b-modal>
      </div>
        <b-button id="result1" v-b-modal.res1 ref="showResult1">1등</b-button>
        <b-modal title="당첨 결과" id="res1" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">축하합니다! 1등 당첨입니다.</p>
        </b-modal>
        <b-button id="result2" v-b-modal.res2 ref="showResult2">2등</b-button>
        <b-modal title="당첨 결과" id="res2" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">축하합니다! 2등 당첨입니다.</p>
        </b-modal>
        <b-button id="result3" v-b-modal.res3 ref="showResult3">3등</b-button>
        <b-modal title="당첨 결과" id="res3" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">축하합니다! 3등 당첨입니다.</p>
        </b-modal>
        <b-button id="result4" v-b-modal.res4 ref="showResult4">4등</b-button>
        <b-modal title="당첨 결과" id="res4" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">축하합니다! 4등 당첨입니다.</p>
        </b-modal>
        <b-button id="result5" v-b-modal.res5 ref="showResult5">5등</b-button>
        <b-modal title="당첨 결과" id="res5" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">축하합니다! 5등 당첨입니다.</p>
        </b-modal>
        <b-button id="result6" v-b-modal.res6 ref="showResult6">낙첨</b-button>
        <b-modal title="당첨 결과" id="res6" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">낙첨입니다.</p>
        </b-modal>
      <div class="result">

      </div>
    </div>
    <div class="selectmenu">
      <b-button block id="check" @click="router.push('check')">뒤로 가기</b-button><br>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import axios from 'axios';
export default {
  name: 'onhandmenu',
  data() {
    return {
      router: router,
      number: '',
      one: '',
      two: '',
      three: '',
      four: '',
      five: '',
      six: '',
      datas: [],
      drwNo: [],
      drwtNo1 : [],
      drwtNo2 : [],
      drwtNo3 : [],
      drwtNo4 : [],
      drwtNo5 : [],
      drwtNo6 : [],
      bnusNo : []
    }
  },
  created() {
      const URI = "https://hyeokjoon.com/data/lottodata.php";
      axios.get(URI)
      .then((result) => {
        this.datas = result.data.datas;
        for(var index=0;index<=52;index++){
          this.drwNo[index] = this.datas[index].drwNo;
          this.drwtNo1[index] = this.datas[index].drwtNo1;
          this.drwtNo2[index] = this.datas[index].drwtNo2;
          this.drwtNo3[index] = this.datas[index].drwtNo3;
          this.drwtNo4[index] = this.datas[index].drwtNo4;
          this.drwtNo5[index] = this.datas[index].drwtNo5;
          this.drwtNo6[index] = this.datas[index].drwtNo6;
          this.bnusNo[index] = this.datas[index].bnusNo;
        }
      })
  },
  methods: {
    checkInput() { // 번호를 제대로 입력했는지 확인
      var set = new Set();
      var allNum = [this.number, this.one, this.two, this.three, this.four, this.five, this.six];
      var num = [this.one, this.two, this.three, this.four, this.five, this.six];
      for(var n of allNum) { // 숫자 7개를 모두 입력하지 않으면 경고
        if(n == "") {
          this.$refs.showError1.click();
          return false;
        }
      }
      if(parseInt(this.number) > parseInt(this.drwNo[52])) { // 업데이트 안된 회차면 경고
          this.$refs.showError2.click();
          return false;
      }
      if(parseInt(this.number) < parseInt(this.drwNo[0])) { // 기한이 지난 회차면 경고
          this.$refs.showError3.click();
          return false;
      }
      for(var m of num) { // 범위 벗어나면 경고
        if(parseInt(m) < 1 || parseInt(m) > 45) {
              this.$refs.showError4.click();
              return false;
        }
      }
      for(var k of num) {
        set.add(parseInt(k));
      }
      if(set.size != 6) { // 숫자가 중복되면 경고
          this.$refs.showError5.click();
          return false;
      }
      return true;
    },
    showResult() {
      var target = parseInt(this.number); // 입력한 회차
      var targetIndex = 52 - (parseInt(this.drwNo[52]) - target);
      var cnt = 0, bnusCnt = 0;
      var winNum = [this.drwtNo1[targetIndex], this.drwtNo2[targetIndex], this.drwtNo3[targetIndex], this.drwtNo4[targetIndex], this.drwtNo5[targetIndex], this.drwtNo6[targetIndex], this.bnusNo[targetIndex]];
      var inputArr = [this.one, this.two, this.three, this.four, this.five, this.six];
      for(var input of inputArr) {
          for(var i=0;i<6;i++) {
              if(parseInt(input) == parseInt(winNum[i])) {
                  cnt++;
              }
              if(parseInt(input) == parseInt(winNum[6])) {
                  bnusCnt++;
                  break;
              }
          }
      }
      if(cnt == 6) {
          this.$refs.showResult1.click();
          return;
      }
      else if(cnt == 5 && bnusCnt == 1) {
          this.$refs.showResult2.click();
          return;
      }
      else if(cnt == 5 && bnusCnt == 0) {
          this.$refs.showResult3.click();
          return;
      }
      else if(cnt == 4) {
          this.$refs.showResult4.click();
          return;
      }
      else if(cnt == 3) {
          this.$refs.showResult5.click();
          return;
      }
      else {
          this.$refs.showResult6.click();
          return;
      }
    },
    getInput() {
      if(this.checkInput()) {
        this.showResult();
      }
      this.number = "";
      this.one = "";
      this.two = "";
      this.three = "";
      this.four = "";
      this.five = "";
      this.six = "";
    }
  }
}
</script> 
<style scoped>
.inputlotto {
  padding-top: 100px;
  padding-bottom: 60px;
  padding-left: 10px;
  padding-right: 10px;
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

.form-control {
  text-align: center;
}

#drwNo, #drwtNo1, #drwtNo2, #drwtNo3, #drwtNo4, #drwtNo5, #drwtNo6, #bnusNo {
  height: 38px;
  font-size: 12px;
  padding: 1px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

#error1, #error2, #error3, #error4, #error5,
#result1, #result2, #result3, #result4, #result5, #result6 {
  display: none;
}
</style>