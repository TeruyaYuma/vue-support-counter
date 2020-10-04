<template>
    <div class="container">
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

        <div>{{ result }}</div>
    </div>
</template>

<script>
import SpellList from "@/assets/spells.json";
import Role from "@/assets/role.json";

export default {
    name: "ClipBoard",
    props:["chooseChars"],
    data() {
        return {
            spellList: SpellList.spells,
            roles: Role.role,
            chooseChar: this.chooseChars,
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

<style scoped>
    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 50%;
        height: 200px;
        box-sizing: border-box;
        padding: 20px;
        color: white;
        background: black;
        border-radius: 5px;
    }
    .spel-list {
        display: flex;
        flex-wrap: wrap;
        width: 60%;
        height: 50%;
    }
    .spel-item {
        margin-right: 10px;
    }
</style>