<template>
    <div>
        
        <ul class="role-list">
            <template v-for="role in roles">
                <li class="role-item" @click="changeTab(role.id)" :key="role.id">{{ role.name }}</li>
            </template>
        </ul>
        <div class="bg">
        <template v-for="(ch, index) in chooseChar">
            <template v-if="index === active">
                <div :key="ch.id" class="spell">

                    <ul class="spell-list">
                        <template v-for="spell in spellList">
                            <li 
                                class="spell-item" 
                                :key="spell.id"
                                @click="setTimeCount(spell)"
                            >
                            <div>
                                <p class="spell-item__txt">{{spell.name}}</p>

                                <div class="spell-item__img">
                                    <img :src="require(`@/assets/images/${spell.img}`)" alt="">
                                </div>
                            </div>
                            </li>
                        </template>
                    </ul>

                    <div class="spell-ch">
                        <p>{{ch.chanpion}}</p>

                        <p @click="setTimeCount(ch)">{{ch.CD[0]}}</p>
                    </div>

                </div>
            </template>
        </template>
        
        <div class="result" @click="addClipBoard($event)">
            <p class="result__txt">{{ result }}aaaaaaaaa</p>
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
    border-radius: 3px;
    background: gray;
    width: 56px;
    height: 24px;
    text-align: center;
    line-height: 24px;
}
.role-item:nth-child(1) {
    border-bottom: 1px solid gray;
}
.spell {
    display: flex;
    box-sizing: border-box;
    padding: 16px;
    background: gray;
    border-radius: 5px;
}
.spell-list {
    display: flex;
    flex-wrap: wrap;
    width: 63%;
    height: 260px;
}
.spell-item {
    margin-right: 5px;
    margin-bottom: 5px;
    width: 63px;
    height: 63px;
}
.spell-item__txt {
    text-align: center;
    padding: 5px;
}
.spell-item__img {
    width: 100%;
    height: 100%;
}
.spell-ch {
    text-align: center;
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
    background: gray;
}
</style>