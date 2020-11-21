<template>
    <div>
        
        <ul class="role-list">
            <template v-for="(role, index) in roles">
                <li class="role-item" :class="(index === active) ? 'active': '' " @click="changeTab(role.id)" :key="role.id">{{ role.name }}</li>
            </template>
        </ul>

        <div class="bg">
            <template v-for="(ch, index) in chooseChar">
                <template v-if="index === active">
                    <div :key="ch.id" class="spell">

                        <div class="spell-ch">
                            <div class="spell-ch__img">
                                <img :src="require(`@/assets/images/${ch.img}`)" alt="">
                            </div>
                            <p @click="setTimeCount(ch)">{{ch.CD[0]}}</p>
                        </div>

                        <ul class="spell-list">
                            <template v-for="spell in spellList">
                                <li 
                                    class="spell-item" 
                                    :key="spell.id"
                                    @click="setTimeCount(spell)"
                                >
                                    <p class="spell-item__txt">{{spell.name}}</p>

                                    <div class="spell-item__img">
                                        <img :src="require(`@/assets/images/${spell.img}`)" alt="">
                                    </div>
                                </li>
                            </template>
                        </ul>

                    </div>
                </template>
            </template>
            
            <div class="result" @click="addClipBoard($event)">
                <p class="result__txt">{{ result }}</p>
                <i>O</i>
            </div>
        </div>

    </div>
</template>

<script>
import SpellList from "@/assets/spells.json";
import Role from "@/assets/role.json";

export default {
    name: "SpellList",
    props:[
        "chooseChars",
        "time"
    ],
    data() {
        return {
            chooseChar: this.chooseChars,
            spellList: SpellList.spells,
            roles: Role.role,
            timeNum: 0,
            active: 0,
            result: ""
        }
    },
    methods: {
        changeTab(val) {
            this.active = val;
        },
        setTimeCount(val) {
            console.log(val);
            //リアルタイムをクリック時にエスケープ
            this.timeNum = this.time;
            //func counterFormat
            this.result = this.chooseChar[this.active].chanpion + ' ' + val.name + ' ' + this.counterFormat(val.CD[0] + this.timeNum);
        },
        counterFormat(num) {
            let s = num % 60;
            let m = Math.floor(num / 60);
            let h = Math.floor(m / 60);

            if(s < 10) s = "0" + s;
            if(m < 10) m = "0" + m;
            if(h < 10) h = "0" + h;

            return h+ ":" +m+ ":" +s
        },
        addClipBoard() {
            console.log(this.result);
            //クリップボードにコピー
            navigator.clipboard.writeText(this.result);
        }
    }
}
</script>

<style scoped>
.role-list {
    display: flex;
}
.role-item {
    /* border: 1px solid black; */
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    border-radius: 3px 3px 0 0;
    background: gray;
    width: 97px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
}
.role-item.active {
    border-bottom: 1px solid gray;
    transition: all 0.1s ease-out;
}
.spell {
    display: flex;
    flex-direction: row-reverse;
    border-radius: 5px;
}
.spell-list {
    display: flex;
    flex-wrap: wrap;
    flex-basis: 63;
    height: 260px;
}
.spell-item {
    margin-right: 5px;
    margin-bottom: 5px;
    width: 75px;
}
.spell-item__txt {
    text-align: center;
    margin-bottom: 5px;
}
.spell-item__img {
    width: 100%;
}
.spell-ch {
    text-align: center;
    flex-basis: 37%;
}
.spell-ch__img {
    border-radius: 50%;
    overflow: hidden;
}
.result {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 25px;
    background: white;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    color: black;
}
.bg {
    width: 100%;
    background: rgb(128, 128, 128, 0.8);
    box-sizing: border-box;
    padding: 15px;
    border-radius: 0 5px 5px 5px;
}
</style>