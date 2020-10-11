<template>
  <div class="main">
    
    <template v-if="changeCmp">
      <clip-board :choose-chars="chooseChars"></clip-board>   
    </template>

    <template v-else>
      <char-list-area :char-lists="charLists.lists" @on-set="onSet($event)"></char-list-area>
    </template>
    


  </div>
</template>

<script>
import CharListArea from '@/components/charList/CharListArea';
import ClipBoard from '@/components/clipboard/ClipBoard';
import CharLists from '@/assets/charList.json';

// import test from '@/components/test';


export default {
  name: 'App',
  components: {
    "char-list-area": CharListArea,
    "clip-board": ClipBoard,
    // "test": test
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
      //子から受け取ったキャラクターをセット
      this.chooseChars = val;
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
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url("https://www.gamespark.jp/imgs/zoom/51250.jpg");
  background-size: cover;
  background-position: center;
  
}
</style>
