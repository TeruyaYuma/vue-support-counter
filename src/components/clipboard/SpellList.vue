<template>
    <div>
        <ul style="display: flex;">
            <template v-for="role in roles">
                <li @click="changeTab(role.id)" :key="role.id">{{ role.name }}</li>
            </template>
        </ul>

        <template v-for="(ch, index) in chooseChar">
            <template v-if="index === active">
                <div :key="ch.id" style="backgroundColor: gray;">

                    <ul class="spel-list">
                        <template v-for="spell in spellList">
                            <li 
                                class="spel-item" 
                                :key="spell.id"
                                @click="setTimeCount(spell)"
                            >
                                {{spell.name}}
                            </li>
                        </template>
                    </ul>

                    <p>{{ch.chanpion}}</p>
                    <p @click="setTimeCount(ch)">{{ch.CD}}</p>

                </div>
            </template>
        </template>

        
        <div>{{ result }}</div>
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
            this.timeNum = this.time;
            this.result = this.chooseChar[this.active].chanpion + ' ' + val.name + ' ' + this.counterFormat(val.CD + this.timeNum);
        },
        counterFormat(num) {
            let s = num % 60;
            let m = Math.floor(num / 60);
            let h = Math.floor(m / 60);
            if(s < 10) s = "0" + s;
            if(m < 10) m = "0" + m;
            if(h < 10) h = "0" + h;
            return h+ ":" +m+ ":" +s
        }
    }
}
</script>