<template>
    <div>
        <form name="form-sw" action="">
            <input type="text" :value="counterFormat">
            <input type="button" name="start" value="スタート" @click="startCount()" :disabled="ps">
            <input type="button" name="restart" value="リセット" @click="resetCount()">
        </form>
    </div>
</template>

<script>

export default {
    name: "Timer",
    data(){
        return{
            timeNum: 0,
            ps: false,
            inervalFlg: false
        }
    },
    methods: {
        resetCount() {
            this.inervalFlg = true;
            this.timeNum = 0
        },
        startCount() {
            let timerID = 
                setInterval( () => {
                    if(this.inervalFlg) {
                        clearInterval(timerID);
                        return;
                    }
                    this.ps = true;
                    this.timeNum++;
                    console.log(this.timeNum);
                    this.setTime();
                },1000)
        },
        setTime() {
            this.$emit("onTime",this.timeNum);
        }

    },
    computed: {
        counterFormat() {
            let s = this.timeNum % 60;
            let m = Math.floor(this.timeNum / 60);
            let h = Math.floor(m / 60);
            if(s < 10) s = "0" + s;
            if(m < 10) m = "0" + m;
            if(h < 10) h = "0" + h;
            return h+ ":" +m+ ":" +s
        }
    }
}
</script>