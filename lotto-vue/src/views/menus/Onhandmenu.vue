<template>
  <div>
    <div class="inputlotto">
      <b-input-group prepend="번호" class="mb-2">
        <b-form-input type="number" pattern="\d*" v-model="number" aria-label="number" class="form-control" id="drwNo" placeholder="회차" @focus="$event.target.placeholder=''; $event.target.select();" @blur="$event.target.placeholder='회차'" oninput="javascript: if (this.value.length >= 4) {this.value = this.value.slice(0, 4); document.getElementById('drwtNo1').focus();}"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="one" aria-label="one" class="form-control" id="drwtNo1" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo2').focus();}"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="two" aria-label="two" class="form-control" id="drwtNo2" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo3').focus();}"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="three" aria-label="three" class="form-control" id="drwtNo3" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo4').focus();}"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="four" aria-label="four" class="form-control" id="drwtNo4" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo5').focus();}"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="five" aria-label="five" class="form-control" id="drwtNo5" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo6').focus();}"></b-form-input>
        <b-form-input type="number" pattern="\d*" v-model="six" aria-label="six" class="form-control" id="drwtNo6" @focus="$event.target.select()" oninput="javascript: if (this.value.length >= 2) {this.value = this.value.slice(0, 2); document.getElementById('drwtNo6').blur();}"></b-form-input>
        <div class="input-group-append">
          <b-button class="btn btn-secondary" type="button" id="inputbtn" style="background-color: #576574" @click="getInput()">입력</b-button>
        </div>
      </b-input-group>

      <div class="alertContainer">
        <b-button v-b-modal.error1>문자입력오류</b-button>
        <b-modal id="error1" title="오류" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">숫자만 입력 가능합니다.</p>
        </b-modal>
        <b-button v-b-modal.error2>숫자범위오류</b-button>
        <b-modal id="error2" title="오류" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">1 부터 45까지의 숫자만 입력 가능합니다.</p>
        </b-modal>
        <b-button v-b-modal.error3>숫자중복오류</b-button>
        <b-modal id="error3" title="오류" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">숫자가 중복됐습니다.</p>
        </b-modal>
        <b-button v-b-modal.error4>유효기간오류</b-button>
        <b-modal id="error4" title="오류" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">유효기간 1년이 지난 회차입니다.</p>
        </b-modal>
        <b-button v-b-modal.error5>업데이트오류</b-button>
        <b-modal id="error5" title="오류" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">아직 업데이트가 안된 회차입니다.</p>
        </b-modal>
        <b-button v-b-modal.error5>숫자개수오류</b-button>
        <b-modal id="error5" title="오류" ok-only ok-title="확인" hide-header-close>
          <p class="my-4">숫자 7개를 모두 입력해야합니다.</p>
        </b-modal>
      </div>

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
    }
  },
  methods: {
    getInput() {
      console.log(this.number);
      console.log(this.one);
      console.log(this.two);
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
</style>