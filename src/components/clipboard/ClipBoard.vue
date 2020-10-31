<template>
    <div class="container">

        <timer @onTime="onTime($event)"></timer>

        <spell-list :chooseChars="chooseChar" :time="time"></spell-list>
    </div>
</template>

<script>
import Timer from "@/components/clipboard/Timer";
import SpellList from "@/components/clipboard/SpellList";

export default {
    name: "ClipBoard",
    components: {
        'timer': Timer,
        'spell-list': SpellList
    },
    props:["chooseChars"],
    data() {
        return {
            chooseChar: this.chooseChars,
            time: 0
        }
    },
    methods: {
        onTime(val) {
            this.time = val;
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