<template>
    <div class="container">
        <h1 class="title">Spell Counter</h1>

        <table class="role">
            <tbody>
                <tr class="role__raw role__raw--title">
                    <td class="role__txt" :class="{ 'red': (choose.length === 0)}">top</td>
                    <td class="role__txt" :class="{ 'red': (choose.length === 1)}">mid</td>
                    <td class="role__txt" :class="{ 'red': (choose.length === 2)}">js</td>
                    <td class="role__txt" :class="{ 'red': (choose.length === 3)}">sup</td>
                    <td class="role__txt" :class="{ 'red': (choose.length === 4)}">adc</td>
                </tr>

                <tr class="role__raw role__raw--body">
                    <template v-for="char in choose">
                        <td class="role__col" :key="char.id">
                            <p class="role__txt">{{char.chanpion}}</p>

                                <div style="
                                    margin: 0 auto;
                                    width: 50%; 
                                    height: 60%;
                                    borderRadius: 50%;
                                    overflow: hidden;"
                                >
                                    <img :src="require(`@/assets/images/${char.img}`)" alt="">
                                </div>
                        </td>
                    </template> 
                </tr>
            </tbody>
        </table>

        <input type="text" v-model="keyword">

        <ul style="color: white;" class="char">
            <template v-for="char in sortCharLists">
                <li style="width: 100px;" :key="char.id" @click="setCharList(char)">
                    <p>{{ char.chanpion}}</p>
                    <div style="width: 100%; height: 100px;">
                        <img :src="require(`@/assets/images/${char.img}`)" alt="">
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
    img {
        width: 100%;
        height: 100%;
    }
    .container {
        margin: 0 auto;
        width: 80%;
    }
    .title {
        margin-bottom: 32px;
        text-align: center;
        font-size: 80px;
        color: white;
    }
    .role {
        margin: 0 auto 16px auto;
        width: 100%;
        table-layout: fixed;
        text-align: center;
        font-size: 32px;
        color: white;
    }
    .role__raw {
        width: 100%;
    }
    .role__raw--title {
        box-sizing: border-box;
        padding: 10px;
        height: 40px;
    }
    .role__raw--body {
        height: 100px;
    }
    .role__txt {
        font-size: 24px;
        font-weight: bold;
        vertical-align: middle;
    }
    .role__col {
        /* height: 100px; */
    }
    .char {
        column-count: 6;
        background: rgba(0,0,0, 0.8);
        box-sizing: border-box;
        padding: 20px;
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

    .red {
        color: red;
    }
</style>