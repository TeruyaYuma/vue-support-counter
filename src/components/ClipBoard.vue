<template>
    <div class="container">
        <ul style="display: flex;">
            <li @click="changeTab(0)">top</li>
            <li @click="changeTab(1)">mid</li>
            <li @click="changeTab(2)">jg</li>
            <li @click="changeTab(3)">sup</li>
            <li @click="changeTab(4)">adc</li>
        </ul>
        <template v-for="(ch, index) in chooseChar">
            <template v-if="index === active">
                <div :key="ch.id" style="backgroundColor: gray;">

                    <ul class="spel-list">
                        <template v-for="spell in SpellList.spells">
                            <li class="spel-item" :key="spell.id">
                                {{spell.name}} : {{spell.CD}}
                            </li>
                        </template>
                    </ul>

                    <p>{{ch.name}}</p>
                    <p>{{ch.R}}</p>

                </div>
            </template>
        </template>

    </div>
</template>

<script>
import SpellList from "@/assets/spells.json";

export default {
    name: "ClipBoard",
    props:["chooseChars"],
    data() {
        return {
            SpellList: SpellList,
            chooseChar: this.chooseChars,
            active: 0
        }
    },
    methods: {
        changeTab(val) {
            this.active = val;
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