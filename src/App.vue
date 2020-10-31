<template>
  <div class="main main--bg-image">
    <div class="main main--bg-color">

      <div class="mail">
        <a class="mail__link" href="">メール</a>
      </div>
    
      <template v-if="changeCmp">
        <clip-board :choose-chars="chooseChars"></clip-board>   
      </template>

      <template v-else>
        <char-list-area :char-lists="charLists.lists" @on-set="onSet($event)"></char-list-area>
      </template>

    </div>
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
.main {
  width: 100%;
  height: 100vh;
}
.main--bg-image{
  background-image: url("https://www.gamespark.jp/imgs/zoom/51250.jpg");
  background-size: cover;
  background-position: center;
}
.main--bg-color {
  background: rgba(0, 0, 0, 0.7);
  box-sizing: border-box;
  padding: 32px 10px;
}
.mail {
  width: 100%;
  height: 50px;
  text-align: right;
  line-height: 50px;
}
.mail__link {
  margin-right: 20px;
  text-decoration: none;
  color: white;
}
</style>
