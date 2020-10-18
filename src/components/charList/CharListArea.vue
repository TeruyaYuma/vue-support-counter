<template>
    <div class="list-wrapper">

        <h1 class="title">Spell Counter</h1>

        <table class="role">
            <tbody>
                <tr>
                    <td :class="{ 'red': (choose.length === 0)}">top</td>
                    <td :class="{ 'red': (choose.length === 1)}">mid</td>
                    <td :class="{ 'red': (choose.length === 2)}">js</td>
                    <td :class="{ 'red': (choose.length === 3)}">sup</td>
                    <td :class="{ 'red': (choose.length === 4)}">adc</td>
                </tr>

                <tr>
                    <template v-for="char in choose">
                        <td :key="char.id">{{char.chanpion}}</td>
                    </template> 
                </tr>
            </tbody>
        </table>

        <input type="text" v-model="keyword">

        <ul style="color: white;" class="char">
            <template v-for="char in sortCharLists">
                <li style="width: 100px;" :key="char.id" @click="setCharList(char)">
                    <p>{{ char.chanpion}}</p>
                    <div>
                        <img style="width: 100%;" :src="require(`@/assets/images/${char.img}`)" alt="">
                    </div>
                </li>
            </template>
        </ul>

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
            choose: [],
            keyword: ""
        }
    },
    created() {
        console.log(this.charLists);
        console.log(this.choose.length);
    },
    methods: {
        setCharList(char) {
            //キャラクター選択上限 (バリデーション)
            if(this.choose.length === 5) return;
            //選択キャラクター重複チェック (バリデーション)
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
        },
        ////ソート関数////
        sortChanp() {
            return this.charLists.slice().sort( (a,b) => {
                        return (a.chanpion > b.chanpion)? 1 : -1;
                    })
        },
        searchChanp(chanp, keyword) {
            let searchChars = [];
            //検索
            for(let i in chanp) {
                let char = chanp[i];
                //ソートされた配列の中から一致する文字列を抽出
                //func kanaToHira;
                if(this.kanaToHira(char.chanpion).indexOf(this.kanaToHira(keyword)) !== -1) {
                    
                    searchChars.push(char);
                }
            }
            return searchChars;
        },
        kanaToHira(str) {
            return str.replace(/[\u30a1-\u30f6]/g, match => {
                console.log(match);
                var chr = match.charCodeAt(0) - 0x60;
                console.log(chr);
                return String.fromCharCode(chr);
            });
        }
    },
    computed: {
        sortCharLists() {
            let sortChars = [];
            let searchChars = [];
            //sortCharsにソートされた配列を格納
            sortChars = this.sortChanp();
            //keywordに文字が入力されたら検索をかける
            if(this.keyword) {
                //検索結果
                searchChars = this.searchChanp(sortChars, this.keyword);
                
                return searchChars
            } else {
                //検索ワードがなければそのままreturn
                return sortChars;
            }
        }
    }
}
</script>

<style scoped>
    .red {
        color: red;
    }
    p {
        margin: 0;
        padding: 0;
        text-align: center;
    }
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
        width: 30%;
        /* margin: 0 auto; */
        column-count: 2;
        background: rgba(0,0,0, 0.8);
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