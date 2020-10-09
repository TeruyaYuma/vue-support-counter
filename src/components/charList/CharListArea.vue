<template>
    <div class="list-wrapper">

        <h1 class="title">Spell Counter</h1>

        <table class="role">
            <tbody>
                <tr>
                    <td>top</td>
                    <td>mid</td>
                    <td>js</td>
                    <td>sup</td>
                    <td>adc</td>
                </tr>

                <tr>
                    <template v-for="char in choose">
                        <td :key="char.id">{{char.chanpion}}</td>
                    </template> 
                </tr>
            </tbody>
        </table>

        
        <ul class="char">
            <template v-for="char in charLists">
                <li :key="char.id" @click="setCharList(char)">{{ char.chanpion}}</li>
            </template>
        </ul>

        <!-- <div v-for="char in choose" :key="char.id">{{char}}</div> -->

        <button @click="reset()">キャンセル</button>
        <button @click="set()">決定</button>
    </div>
</template>

<script>
export default {
    name: "CharListArea",
    props: ['charLists'],
    data() {
        return {
            choose: []
        }
    },
    created() {
        console.log(this.charLists);
    },
    methods: {
        setCharList(char) {
            //キャラクター選択上限
            if(this.choose.length === 5) return;
            //選択キャラクター重複チェック
            if(this.choose.length !== 0){
                for(let i=0; i<this.choose.length; i++ ){
                    if(this.choose[i].id === char.id) return;
                }
            }
            //問題なければ
            //chooseにcharオブジェクトを配列として追加
            this.choose.push(char);
        },
        reset() {
                this.choose = [];
        },
        set() {
            //選択キャラ項目が全てセットされてないと終了
            if(this.choose.length !== 5) return;
            //選択キャラを親へ送信
            this.$emit('on-set',this.choose);
        }
    }
}
</script>

<style scoped>
    /* .list-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: white;
        background: black;
        border-radius: 5px;
    } */
    .title {
        text-align: center;
        font-size: 80px;
        color: white;
    }
    .role {
        margin: 0 auto;
        width: 92%;
        table-layout: fixed;
        text-align: center;
        font-size: 32px;
        color: white;
    }
    .char {
        width: 92%;
        margin: 0 auto;
    }
    .choose-lists {
        display: flex;
        justify-content: space-around;
    }
    .char-lists {
        margin-top: 32px;
        border: 5px solid white;
        border-radius: 5px;
    }
</style>