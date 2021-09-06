<template>
  <div>
    <h1>{{title}}</h1>
    <button @click="getData">버튼</button>
    <button @click="setData">변경</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "변수"
    }
  },
  watch: {
    title() { // title의 변수값이 변경되는걸 확인

    }
  },
  methods: {
    getData() {
      alert(this.title)
    },
    setData() {
      this.title = "변수2"
    },
    beforeCreate() {
      
    },
    created() {
      
    },
    beforeMount() {
      
    },
    mounted() { // 화면에 표현
      
    },
    beforeUpdate() { // 데이터 변경 전
      
    },
    updated() { // 데이터 변경 후
      
    },
    beforeDestroy() {
      
    },
    destroyed() {
      
    },
  }
};
</script> 

// input value 대신 v-model
// onclick 대신 @click: