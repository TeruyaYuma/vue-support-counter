<template>
  <div class="bg-image">
    <div class="overray">

      <header>
        <div class="mail">
          <a class="mail__link" href="">メール</a>
        </div>
      </header>

      <main>
        <template v-if="changeCmp">
          <clip-board :choose-chars="chooseChars"></clip-board>   
        </template>

        <template v-else>
          <char-list-area :char-lists="charLists.lists" :roles="roles.role" @on-set="onSet($event)"></char-list-area>
        </template>
      </main>

      <!-- footer -->

    </div>
  </div>
</template>

<script>
import CharListArea from '@/components/charList/CharListArea';
import ClipBoard from '@/components/clipboard/ClipBoard';
import CharLists from '@/assets/charList.json';
import Roles from '@/assets/role.json';

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
      roles: Roles,
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
header {
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bg-image{
  width: 100%;
  height: 100vh;
  background-image: url("https://www.gamespark.jp/imgs/zoom/51250.jpg");
  background-size: cover;
  background-position: center;
}
.overray {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
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
