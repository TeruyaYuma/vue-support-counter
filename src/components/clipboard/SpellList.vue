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

                    <p>{{ch.name}}</p>
                    <p>{{ch.R}}</p>

                </div>
            </template>
        </template>

        <div>{{ time }}</div>
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
            times: this.time,
            spellList: SpellList.spells,
            roles: Role.role,
            active: 0,
            result: ""
        }
    },
    methods: {
        changeTab(val) {
            this.active = val;
        },
        setTimeCount(val) {
            this.result = this.chooseChar[this.active].name + ' ' + this.chooseChar[this.active].R + ' ' + val.name + ' ' + val.CD;
        }
    }
}
</script>