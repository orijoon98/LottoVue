<template>
  <div>
    <div v-if="searching">
      <qrcode-stream @decode="onDecode" @init="onInit" />
      <div id="qrtext">
        <span> QR 코드를 촬영하세요. </span>
      </div>
    </div>
    <div class="content" v-if="searched">
        <div class="recentLotto">
            <span id="drwNo">{{target[0]}}</span><span id="blue">회</span>
            <span> 당첨번호</span>
        </div>
        <div class="recentDate">
            <span id="drwNoDate">{{target[1]}}</span>
            <span> 추첨</span>
        </div>
        <div class="firstNumber">
            <div v-bind:class="circles[0]" id="drwtNo1">{{target[2]}}</div>
            <div v-bind:class="circles[1]" id="drwtNo2">{{target[3]}}</div>
            <div v-bind:class="circles[2]" id="drwtNo3">{{target[4]}}</div>
            <div v-bind:class="circles[3]" id="drwtNo4">{{target[5]}}</div>
            <div v-bind:class="circles[4]" id="drwtNo5">{{target[6]}}</div>
            <div v-bind:class="circles[5]" id="drwtNo6">{{target[7]}}</div>
            <div id="plus">+</div>
            <div v-bind:class="circles[6]" id="bnusNo">{{target[8]}}</div>
        </div>
    </div>
    <div class="total-result" v-if="searched">
      <strong v-if="win">당첨입니다</strong>
      <strong v-if="lose">낙첨입니다</strong>
    </div>
    <div v-if="searched">
      <table>
        <tr v-for="item in items" :key="item.id">
          <td class="input-result"><div v-html="item.result"></div></td>
          <td class="input-num">
            <div :class="{'yellow': checkNum(item.one) && item.one >= 1 && item.one <= 10, 'blue': checkNum(item.one) && item.one >= 11 && item.one <= 20, 'red': checkNum(item.one) && item.one >= 21 && item.one <= 30, 'gray': checkNum(item.one) && item.one >= 31 && item.one <= 40, 'green': checkNum(item.one) && item.one >= 41 && item.one <= 45}" id="one" v-html="item.one"></div>
            <div :class="{'yellow': checkNum(item.two) && item.two >= 1 && item.two <= 10, 'blue': checkNum(item.two) && item.two >= 11 && item.two <= 20, 'red': checkNum(item.two) && item.two >= 21 && item.two <= 30, 'gray': checkNum(item.two) && item.two >= 31 && item.two <= 40, 'green': checkNum(item.two) && item.two >= 41 && item.two <= 45}" id="two" v-html="item.two"></div>
            <div :class="{'yellow': checkNum(item.three) && item.three >= 1 && item.three <= 10, 'blue': checkNum(item.three) && item.three >= 11 && item.three <= 20, 'red': checkNum(item.three) && item.three >= 21 && item.three <= 30, 'gray': checkNum(item.three) && item.three >= 31 && item.three <= 40, 'green': checkNum(item.three) && item.three >= 41 && item.three <= 45}" id="three" v-html="item.three"></div>
            <div :class="{'yellow': checkNum(item.four) && item.four >= 1 && item.four <= 10, 'blue': checkNum(item.four) && item.four >= 11 && item.four <= 20, 'red': checkNum(item.four) && item.four >= 21 && item.four <= 30, 'gray': checkNum(item.four) && item.four >= 31 && item.four <= 40, 'green': checkNum(item.four) && item.four >= 41 && item.four <= 45}" id="four" v-html="item.four"></div>
            <div :class="{'yellow': checkNum(item.five) && item.five >= 1 && item.five <= 10, 'blue': checkNum(item.five) && item.five >= 11 && item.five <= 20, 'red': checkNum(item.five) && item.five >= 21 && item.five <= 30, 'gray': checkNum(item.five) && item.five >= 31 && item.five <= 40, 'green': checkNum(item.five) && item.five >= 41 && item.five <= 45}" id="five" v-html="item.five"></div>
            <div :class="{'yellow': checkNum(item.six) && item.six >= 1 && item.six <= 10, 'blue': checkNum(item.six) && item.six >= 11 && item.six <= 20, 'red': checkNum(item.six) && item.six >= 21 && item.six <= 30, 'gray': checkNum(item.six) && item.six >= 31 && item.six <= 40, 'green': checkNum(item.six) && item.six >= 41 && item.six <= 45}" id="six" v-html="item.six"></div>
          </td>
        </tr>
      </table>
    </div>
    <div class="selectmenu">
      <b-button block id="check" @click="router.push('check')">뒤로 가기</b-button><br>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import axios from "axios";
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: 'qrcodemenu',
  components: { QrcodeStream },
  data () {
    return {
      router: router,
      searching: true,
      searched: false,
      win: false,
      lose: true,
      url: "",
      datas: [],
      drwNo: [],
      drwNoDate: [],
      drwtNo1: [],
      drwtNo2: [],
      drwtNo3: [],
      drwtNo4: [],
      drwtNo5: [],
      drwtNo6: [],
      bnusNo: [],
      target: [],
      numbers: [],
      circles: [],
      tIndex: 0,
      inputs: [],
      items: [],
      winNum: []
    }
  },
  created() {
      const URI = "https://hyeokjoon.com/data/lottodata.php";
      axios.get(URI)
      .then((result) => {
        this.datas = result.data.datas;
        for(var i=0;i<=52;i++) {
          this.drwNo[i] = this.datas[i].drwNo;
          this.drwNoDate[i] = this.datas[i].drwNoDate;
          this.drwtNo1[i] = this.datas[i].drwtNo1;
          this.drwtNo2[i] = this.datas[i].drwtNo2;
          this.drwtNo3[i] = this.datas[i].drwtNo3;
          this.drwtNo4[i] = this.datas[i].drwtNo4;
          this.drwtNo5[i] = this.datas[i].drwtNo5;
          this.drwtNo6[i] = this.datas[i].drwtNo6;
          this.bnusNo[i] = this.datas[i].bnusNo;
        }
      })
  },
  methods: {
    onDecode (result) {
      this.url = result;
      this.decodeQR();
      this.target = [this.drwNo[this.tIndex], this.drwNoDate[this.tIndex], this.drwtNo1[this.tIndex], this.drwtNo2[this.tIndex], this.drwtNo3[this.tIndex], this.drwtNo4[this.tIndex], this.drwtNo5[this.tIndex], this.drwtNo6[this.tIndex], this.bnusNo[this.tIndex]];
      this.numbers = [this.drwtNo1[this.tIndex], this.drwtNo2[this.tIndex], this.drwtNo3[this.tIndex], this.drwtNo4[this.tIndex], this.drwtNo5[this.tIndex], this.drwtNo6[this.tIndex], this.bnusNo[this.tIndex]];
      this.setCircleColor();
      this.searching = false;
      this.searched = true;
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        console.log(error);
      }
    },
    setCircleColor() {
        var i = 0;
        for(var number of this.numbers) {
          var cur = parseInt(number);
            if(cur >= 1 && cur <= 10) {
                this.circles[i] = "yellow";
            }
            else if(cur >= 11 && cur <= 20) {
                this.circles[i] = "blue";
            }
            else if(cur >= 21 && cur <= 30) {
                this.circles[i] = "red";
            }
            else if(cur >= 31 && cur <= 40) {
                this.circles[i] = "gray";
            }
            else {
                this.circles[i] = "green";
            }
            i++;  
        }
    },
    checkNum(snum) {
      for(var q of this.winNum) {
        if(parseInt(snum) == parseInt(q)) {
          return true;
        }
      }
      return false;
    },
    decodeQR() {
      var str = this.url;
      str = str.replace(/[^0-9]/g, '');
      this.tIndex = 52 - (parseInt(this.drwNo[52]) - parseInt(str.substr(0, 4)));
      var cnt = Math.floor((str.length - 4) / 12);
      for(var i=0;i<cnt;i++) {
        this.inputs[i] = str.substr(4 + 12 * i, 12);
        var one = parseInt(this.inputs[i].substr(0, 2));
        var two = parseInt(this.inputs[i].substr(2, 2));
        var three = parseInt(this.inputs[i].substr(4, 2));
        var four = parseInt(this.inputs[i].substr(6, 2));
        var five = parseInt(this.inputs[i].substr(8, 2));
        var six = parseInt(this.inputs[i].substr(10, 2));
        this.winNum = [this.drwtNo1[this.tIndex], this.drwtNo2[this.tIndex], this.drwtNo3[this.tIndex], this.drwtNo4[this.tIndex], this.drwtNo5[this.tIndex], this.drwtNo6[this.tIndex], this.bnusNo[this.tIndex]];
        var curNums = [one, two, three, four, five, six];
        var Cnt = 0, bnusCnt = 0;
        for(var v of curNums) {
          for(var x=0;x<6;x++) {
              if(parseInt(v) == parseInt(this.winNum[x])) {
                  Cnt++;
              }
              if(parseInt(v) == parseInt(this.winNum[6])) {
                  bnusCnt++;
                  break;
              }
          }
        }
        var resultStr = ""
        if(Cnt == 6) {
          resultStr = "1등";
          this.win = true;
          this.lose = false;
        }
        else if(Cnt == 5 && bnusCnt == 1) {
          resultStr = "2등";
          this.win = true;
          this.lose = false;
        }
        else if(Cnt == 5 && bnusCnt == 0) {
          resultStr = "3등";
          this.win = true;
          this.lose = false;
        }
        else if(Cnt == 4) {
          resultStr = "4등";
          this.win = true;
          this.lose = false;
        }
        else if(Cnt == 3) {
          resultStr = "5등";
          this.win = true;
          this.lose = false;
        }
        else {
          resultStr = "낙첨";
        }
        this.items[i] = {
          "id" : i,
          "result" : resultStr,
          "one" : one,
          "two" : two,
          "three" : three,
          "four" : four,
          "five" : five,
          "six" : six
        };
      }
    },
  },
};
</script> 
<style scoped>
#qrtext {
  text-align: center;
  font-size: 30px;
}

.content {
    text-align: center;
    color: white;
    margin: 20px;
}

#drwNo, #blue {
    color: #54a0ff;
}

.recentLotto {
    font-size: 40px;
    margin-top: 40px;
    margin-bottom: 10px;
}

.recentDate {
    font-size: 18px;
    margin-bottom: 30px;
}

.firstNumber {
    display: table;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
}

#plus {
    float: left;
    margin: 3px;
    width: 35px;
    height: 35px;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
}

#drwtNo1, #drwtNo2, #drwtNo3, #drwtNo4, #drwtNo5, #drwtNo6, #bnusNo {
    float: left;
    margin: 3px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
}

.total-result {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  font-size: 30px;
}

table {
  color: white;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

td {
  margin-top: 5px;
  margin-bottom: 5px;
}

.input-result {
  width: 70px;
}

.input-num {
  display: table;
  width: 200px;
}

#one, #two, #three, #four, #five, #six {
  float: left;
  margin: 3px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 12px;
  line-height: 25px;
  color: white;
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

.yellow {
    background-color: #f1c40f;
}

.blue {
    background-color: #3498db;
}

.red {
    background-color: #e74c3c;
}

.gray {
    background-color: #bdc3c7;
}

.green {
    background-color: #2ecc71;
}
</style>