<template>
  <div>
    <div class="content">
        <div class="recentLotto">
            <span id="drwNo">{{drwNo}}</span><span id="blue">회</span>
            <span> 당첨번호</span>
        </div>
        <div class="recentDate">
            <span id="drwNoDate">{{drwNoDate}}</span>
            <span> 추첨</span>
        </div>
        <div class="firstNumber">
            <div v-bind:class="circles[0]" id="drwtNo1">{{drwtNo1}}</div>
            <div v-bind:class="circles[1]" id="drwtNo2">{{drwtNo2}}</div>
            <div v-bind:class="circles[2]" id="drwtNo3">{{drwtNo3}}</div>
            <div v-bind:class="circles[3]" id="drwtNo4">{{drwtNo4}}</div>
            <div v-bind:class="circles[4]" id="drwtNo5">{{drwtNo5}}</div>
            <div v-bind:class="circles[5]" id="drwtNo6">{{drwtNo6}}</div>
            <div id="plus">+</div>
            <div v-bind:class="circles[6]" id="bnusNo">{{bnusNo}}</div>
        </div>
        <div class="firstPrize">
            <span>1등 1게임당 당첨금액</span><br>
            <span id="price">약 </span>
            <span id="firstWinamnt">{{firstWinamnt}}</span>
            <span id="price">억원</span>
        </div>
        <div class="firstPrizeTot">
            <span>1등 </span>
            <span id="firstPrzwnerCo">{{firstPrzwnerCo}}</span><span>게임 총 당첨금액</span><br>
            <span id="price">약 </span>
            <span id="firstAccumamnt">{{firstAccumamnt}}</span>
            <span id="price">억원</span>
        </div>
    </div>  
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'homepage',
  data() {
    return {
      datas: [],
      drwNo: "500",
      drwNoDate: "2000-01-01",
      drwtNo1 : "1",
      drwtNo2 : "2",
      drwtNo3 : "3",
      drwtNo4 : "4",
      drwtNo5 : "5",
      drwtNo6 : "6",
      bnusNo : "7",
      firstWinamnt : "1000000000",
      firstPrzwnerCo : "5",
      firstAccumamnt : "10000000000",
      circles: ["one", "two", "three", "four", "five", "six", "seven"],
      numbers: []
    }
  },
  created() {
      const URI = "http://112.169.11.3:30080/data/lottodata.php";
      axios.get(URI)
      .then((result) => {
        this.datas = result.data.datas;
        this.drwNo = this.datas[52].drwNo;
        this.drwNoDate = this.datas[52].drwNoDate;
        this.drwtNo1 = this.datas[52].drwtNo1;
        this.drwtNo2 = this.datas[52].drwtNo2;
        this.drwtNo3 = this.datas[52].drwtNo3;
        this.drwtNo4 = this.datas[52].drwtNo4;
        this.drwtNo5 = this.datas[52].drwtNo5;
        this.drwtNo6 = this.datas[52].drwtNo6;
        this.bnusNo = this.datas[52].bnusNo;
        this.firstWinamnt = this.datas[52].firstWinamnt;
        this.firstPrzwnerCo = this.datas[52].firstPrzwnerCo;
        this.firstAccumamnt = this.datas[52].firstAccumamnt;
        this.numbers = [this.drwtNo1, this.drwtNo2, this.drwtNo3, this.drwtNo4, this.drwtNo5, this.drwtNo6, this.bnusNo];
        this.setCircleColor();
        this.setWinPrice();
      })
  },
  methods: {
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
    setWinPrice() {
        var price = parseInt(this.firstWinamnt); // 1등 1게임당 당첨금액
        var totPrice = parseInt(this.firstAccumamnt); // 1등 총 당첨금액
        price = Math.floor(price / 100000000)
        totPrice = Math.floor(totPrice / 100000000)
        this.firstWinamnt = String(price);
        this.firstAccumamnt = String(totPrice);
    }
  }
}
</script> 
<style scoped>
.content {
    background-color: #718093;
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
    margin-bottom: 60px;
}

.firstNumber {
    display: table;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 80px;
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

.firstPrize, .firstPrizeTot {
    margin: 30px;
    font-size: 25px;
}

.firstPrize {
    margin-bottom: 70px;
}

#firstWinamnt, #firstAccumamnt, #price {
    font-size: 40px;
}
</style>