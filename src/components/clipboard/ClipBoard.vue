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
        margin: 0 auto;
        width: 50%;
        height: 200px;
        box-sizing: border-box;
        padding: 20px;
        color: white;
    }
</style>