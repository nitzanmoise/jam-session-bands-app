<template>
  <div class="group-list">
   <ul>
      <li v-for="group in groups" :key="group._id">
        {{group.name}
        <groupPriview></groupPriview>
        <button @click="deleteGroup(group._id)">Delete</button>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
   props: ["groups"],
   components:{
        GroupPreview
    }
}
</script>

<style scoped lang="scss">

</style>
