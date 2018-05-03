<template>
     <section>
         <h1>lalalalallallalalalal</h1>
            <h1>Name: {{user.fullName}}</h1>
    </section>
</template>

<script>
export default {
    
    data() {
        return {
            user :  ''
        }
    },
    created() {
        var userId = this.$route.params.id
                console.log('this is userid', userId);
        this.$store.dispatch({type:'getUserById',userId})
            .then(user => {
                console.log('this i user', user);
                
                this.user = user
            })
    }
}
</script>

<style>

</style>