<template>
  <div class="main">
    <char-list-area :char-lists="charLists.lists" @on-set="onSet($event)"></char-list-area>

    <div>
      <p>parentComponent</p>
      <p v-for="choose in chooseChars" :key="choose.id">{{choose.name}}</p>
    </div>
  </div>
</template>

<script>
import CharListArea from '@/components/charListArea';
import CharLists from '@/assets/charList.json';


export default {
  name: 'App',
  components: {
    "char-list-area": CharListArea
  },
  data() {
    return {
      charLists: CharLists,
      chooseChars: [],
      changeCmp: false
    }
  },
  methods: {
    onSet(val) {
      //選択されたキャラクターをセット
      console.log(val);
      this.chooseChars = val;
      this.changeCmp = true;

    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.main {
  width: 100%;
  height: 100vh;
  background-image: url("https://www.gamespark.jp/imgs/zoom/51250.jpg");
  background-size: cover;
  background-position: center;
  
}
</style>
