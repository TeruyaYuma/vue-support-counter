<template>
    <div>
        <ul style="display: flex; color: white;">
            <li @click="changeRole('top')">top</li>
            <li @click="changeRole('mid')">mid</li>
            <li @click="changeRole('jg')">jg</li>
            <li @click="changeRole('sup')">sup</li>
            <li @click="changeRole('adc')">adc</li>
        </ul>
        
        <ul style="display: flex; color: white;">
            <template v-for="role in roles">
                <li :key="role" v-if="active === role">{{role}}</li>
            </template>
            
        </ul>
    </div>
</template>

<script>
export default {
    name: "Test",
    data(){
        return{
            roles:["top","mid","jg","sup","adc"],
            active: "top"
        }
    },
    methods: {
        changeRole(val) {
            this.active = val;
        }
    }
}
</script>