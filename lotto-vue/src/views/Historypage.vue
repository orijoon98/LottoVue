<template>
  <div>
    <b-table class="historytable" striped hover :items="items" :fields="fields" dark></b-table>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'historypage',
  data() {
    return {
      datas: [],
      drwNo: [],
      drwNoDate: [],
      drwtNo1 : [],
      drwtNo2 : [],
      drwtNo3 : [],
      drwtNo4 : [],
      drwtNo5 : [],
      drwtNo6 : [],
      bnusNo : [],
      firstWinamnt : [],
      firstPrzwnerCo : [],
      firstAccumamnt : [],
      fields: ["회차", "당첨번호", "당첨자수", "1등 당첨금"],
      items: [],
    }
  },
  created() {
    this.items.length = 53;
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
        this.firstWinamnt[i] = this.datas[i].firstWinamnt;
        this.firstPrzwnerCo[i] = this.datas[i].firstPrzwnerCo;
        this.firstAccumamnt[i] = this.datas[i].firstAccumamnt;
        var winNumber = String(this.drwtNo1[i]) + ", " + String(this.drwtNo2[i]) + ", " + String(this.drwtNo3[i]) + ", " + String(this.drwtNo4[i]) + ", " + String(this.drwtNo5[i]) + ", " + String(this.drwtNo6[i]) + " + " + String(this.bnusNo[i]);
        var winamnt = String(this.firstWinamnt[i]);
        var winAmnt = "";
        var cnt = 0;
        for(var j=winamnt.length-1;j>=0;j--) {
            if(cnt == 3) {
                winAmnt += ",";
                cnt = 0;
            }
            winAmnt += winamnt[j];
            cnt++;
        }
        winAmnt = winAmnt.split("").reverse().join("");
        this.items.splice(52-i, 1, {
          "회차": this.drwNo[i],
          "당첨번호": winNumber,
          "당첨자수": this.firstPrzwnerCo[i],
          "1등 당첨금": winAmnt
        });
      }
    })
  },
};
</script>
<style scoped>
.historytable {
  margin: 0px;
  font-size: 12px;
  text-align: center;
}
</style>