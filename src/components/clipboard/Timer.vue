<template>
    <div class="time">
        <div class="time__txt">{{counterFormat}}</div>
        <div class="time__btn">
            <button class="btn btn--timer" @click="startCount()">スタート</button>
            <button class="btn btn--timer" @click="resetCount()">リセット</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "Timer",
    data(){
        return{
            timeNum: 0,
            doTimeFlg: false,
            intervalFlg: false
        }
    },
    methods: {
        startCount() {
            //スタートタイムの重複防止
            if(this.doTImeFlg) return;
            this.doTImeFlg = true;
            //clearIntervalの作動フラグを初期化
            this.intervalFlg = false;
            
            let timerID = 
                setInterval( () => {
                    //リセットが押されたら止める
                    if(this.intervalFlg) {
                        clearInterval(timerID);
                        this.setTime();
                        return;
                    }

                    this.timeNum++;

                    this.setTime();   
                },1000)
        },
        resetCount() {
            this.intervalFlg = true;
            this.doTImeFlg = false;
            this.timeNum = 0
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

<style scoped>
.time {
    text-align: center;
    margin-bottom: 120px;
}
.time__txt {
    margin-bottom: 16px;
    font-size: 48px;
}
.time__btn {
    display: flex;
    justify-content: space-between;
}
.btn {
    border: none;
    border-radius: 16px;
}
.btn--timer {
    width: 49%;
}
</style>