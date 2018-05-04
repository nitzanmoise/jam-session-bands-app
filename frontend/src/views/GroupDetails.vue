<template>
     <section>
            <h1>Name: {{group.name}}</h1>
            {{members}}
    </section>
</template>

<script>
export default {
    
    data() {
        return {
            group :  { name: '' },
            members : {}
        }
    },
    created() {
        var groupId = this.$route.params.id
                console.log('this is groupid', groupId);
        this.$store.dispatch({type:'getGroupById',groupId})
            .then(group => {
                this.group = group
                // console.log('this i group', group);
                // console.log('this is members' ,group.members);
                // var groupMembers = group.members;
                // groupMembers.forEach(member => {
                //     var memberId = member.id
                //     console.log('this is member id', memberId);
                //     // var userId = '5aead65ef36d283836536805'
                //     this.$store.dispatch({type:'getUserById',memberId})
                //        .then(member => {
                //            console.log('this is member',member);
                           
                //        })
                // });
                this.$store.dispatch({type: 'getGroupMembers', group})
                /then(members =>{
                    console.log('this is group members' ,members);
                    this.members = members;
                })
                
            })
     
         
    }
}
</script>

<style>

</style>