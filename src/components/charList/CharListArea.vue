<template>
    <div class="char-list-area">
        <!-- <h1 class="cahr-list-area__title">Spell Counter</h1> -->

        <table class="role">
            <tbody>
                <tr class="role-row role-row--title">
                    <template v-for="role in roles">
                        <td class="role-row__txt" :class="{ 'red': (choose.length === role.id)}" :key="role.id">{{ role.name }}</td>
                    </template>
                </tr>

                <tr class="role-row role-row--body">
                    <template v-for="char in choose">
                        <td class="role-row__col" :key="char.id">
                            <p class="role-row__txt">{{char.chanpion}}</p>

                            <div class="role-row__img">    
                                <img :src="require(`@/assets/images/${char.img}`)" alt="">
                            </div>
                        </td>
                    </template> 
                </tr>
            </tbody>
        </table>

        <div class="search-area">
            <input type="text" class="serch-area__input" v-model="keyword" placeholder="検索">
        </div>

        <ul class="char">
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
    props: ['charLists','roles'],
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
        ////////////////////////////////////////
        ////////////////ソート関数////////////////
        ////////////////////////////////////////
        //アイウエオ順
        //func kanaToHira;
        sortChanp() {
            return this.charLists.slice().sort( (a,b) => {
                        // 文字列をひらがなにして文字コードを基準に変換
                        return (this.kanaToHira(a.chanpion) > this.kanaToHira(b.chanpion))? 1 : -1;
                    })
        },
        //検索
        //func kanaToHira;
        searchChanp(chanp, keyword) {
            let searchChars = [];
            
            for(let i in chanp) {
                let char = chanp[i];
                //ソートされた配列の中から一致する文字列を抽出
                if(this.kanaToHira(char.chanpion).indexOf(this.kanaToHira(keyword)) !== -1) {
                    
                    searchChars.push(char);
                }
            }
            return searchChars;
        },
        //ひらがな変換
        kanaToHira(str) {
            return str.replace(/[\u30a1-\u30f6]/g, match => {
                let chr;
                chr = match.charCodeAt(0) - 0x60;

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
                //検索があれば検索ワードを元に検索して返す
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
    .char-list-area {
        width: 100%;
    }
    .cahr-list-area__title {
        margin-bottom: 8px;
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
    .role-row {
        width: 100%;
    }
    .role-row--title {
        height: 40px;
    }
    .role-row--body {
        height: 135px;
    }
    .role-row__txt {
        font-size: 24px;
        font-weight: bold;
        vertical-align: middle;
        box-sizing: border-box;
        padding: 5px;
    }
    .role-row__col {
        /* height: 100px; */
    }
    .role-row__img{
        height: 100px;
        width: 100px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 50%;
        border: none;
    }
    .search-area {
        width: 100%;
        margin-bottom: 8px;
        text-align: right;
    }
    .char {
        box-sizing: border-box;
        padding: 20px;
        width: 100%;
        height: 400px;
        /* column-count: 6; */
        background: rgba(0,0,0, 0.8);
        color: white;
        overflow-y: scroll;
        display: flex;
        flex-wrap: wrap;
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
        transform: scale(1.3);
        transition: all 0.1s ease-out;
    }
</style>