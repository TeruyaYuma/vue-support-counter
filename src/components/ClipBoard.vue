<template>
    <div class="container">
        <ul class="spel-list">
            <template v-for="spell in SpellList.spells">
                <li class="spel-item" :key="spell.id">{{spell.name}}</li>
            </template>
        </ul>
    </div>
</template>

<script>
import SpellList from "@/assets/spells.json";

export default {
    name: "ClipBoard",
    data() {
        return {
            SpellList: SpellList
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