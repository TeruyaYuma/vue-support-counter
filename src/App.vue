<template>
  <div class="main">

    <template v-if="changeCmp">
      <clip-board></clip-board>   
    </template>

    <template v-else>
      <char-list-area :char-lists="charLists.lists" @on-set="onSet($event)"></char-list-area>
    </template>
    


    <div>
      <p>parentComponent</p>
      <p v-for="choose in chooseChars" :key="choose.id">{{choose.name}}</p>
    </div>
  </div>
</template>

<script>
import CharListArea from '@/components/CharListArea';
import ClipBoard from '@/components/ClipBoard';
import CharLists from '@/assets/charList.json';


export default {
  name: 'App',
  components: {
    "char-list-area": CharListArea,
    "clip-board": ClipBoard
  },
  data() {
    return {
      charLists: CharLists,
      chooseChars: [],
      changeCmp: true
    }
  },
  methods: {
    onSet(val) {
      //子から受け取ったキャラクターをセット
      this.chooseChars = val.choose;
      //画面切り替えフラグ
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
