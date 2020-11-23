<template>
  <div class="bg-image">
    <div class="overray">

      <header class="header">
        <h1 class="header__title">SpellCounter</h1>
        <div class="mail">
          <font-awesome-icon 
          icon="envelope" 
          class="mail__icon"
          @click="formToggle()"
          >
          </font-awesome-icon>
        </div>
      </header>

      <main>
        <div class="form-container" :class="{'active': isForm}">
          <div class="close">
              <font-awesome-icon 
              icon="times-circle" 
              class="close__icon"
              @click="formClose()"
              >
            </font-awesome-icon>
          </div>

          <form class="form" action="">
            <h2 class="form__title">お問い合わせ</h2>

            <label class="form_label" for="">件名</label>
            <input class="form__input" type="text">
            
            <label class="form_label" for="">内容</label>
            <textarea class="form_txtarea" name="" id=""></textarea>
            
            <button class="btn btn--form">送信</button>
          </form>
        </div>

        <div class="contaier">
          <template v-if="changeCmp">
            <clip-board :choose-chars="chooseChars"></clip-board>   
          </template>

          <template v-else>
            <char-list-area :char-lists="charLists.lists" :roles="roles.role" @on-set="onSet($event)"></char-list-area>
          </template>
        </div>
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
      changeCmp: false,
      isForm: false
    }
  },
  methods: {
    onSet(val) {
      //子から受け取ったキャラクターをセット
      this.chooseChars = val;
      //画面切り替えフラグ
      this.changeCmp = true;

    },
    formToggle() {
      this.isForm = !this.isForm;
    },
    formClose() {
      this.isForm = false;
    }
  }
}
</script>

<style>
header {
  width: 100%;
}
main {
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
input {
  outline: none;
  box-sizing: border-box;
}
textarea {
  box-sizing: border-box;
}
button {
  outline: none;
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
.contaier {
  width: 80%;
  margin: 0 auto;
}
.header {
  margin-bottom: 16px;
  padding: 0 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background: rgb(178, 34, 34);
}
.header__title {
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: white;
}
.mail {
  text-align: right;
  line-height: 50px;
}
.mail__icon {
  color: white; 
  font-size: 32px;
  vertical-align: middle;
  cursor: pointer;
}
.form-container {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 500px;
  z-index: 1;
}
.form-container.active {
  display: block;
}
.form {
  border: none;
  box-sizing: border-box;
  padding: 64px 160px;
  border-radius: 5px;
  background: white;
  text-align: center;
}
.close {
  position: relative;
}
.close__icon {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 40px;
}
.form__title {
  margin-bottom: 40px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
}
.form_label {
  display: block;
  margin-bottom: 8px;
  text-align: left;
}
.form__input {
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 16px;
}
.form_txtarea {
  display: block;
  width: 100%;
  height: 128px;
  margin-bottom: 16px;
}
.btn {
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  transition: all 0.1s ease-out;
  transform: translateY(-1px);
  box-shadow: 5px 5px 7px 3px rgb(0, 0, 0, 0.8);
}
.btn--form {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
}
</style>
