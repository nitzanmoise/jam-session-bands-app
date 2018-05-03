<template>
     <section>
         <h1>lalalalallallalalalal</h1>
            <h1>Name: {{group.name}}</h1>
    </section>
</template>

<script>
export default {
    
    data() {
        return {
            group :  ''
        }
    },
    created() {
        var groupId = this.$route.params.id
                console.log('this is groupid', groupId);
        this.$store.dispatch({type:'getGroupById',groupId})
            .then(group => {
                console.log('this i group', group);
                
                this.group = group
            })
    }
}
</script>

<style>

</style>