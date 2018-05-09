



<template>
  <div v-if="alive" class="alert" :class="alertClass" >
        {{msg.txt}}
</div>
</template>

<script>
import $ from "jquery";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
export default {
  created() {
    EventBusService.$on(SHOW_MSG, msg => {
      console.log({ msg });
     this.$swal({
        title: `<span style='font-family: Shrikhand-Regular; color: orange'>${msg.txt}`,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        type: msg.type,
      });
    });
  },
  data() {
    return {
      alive: false,
      msg: null,
    };
  },
  computed: {
    alertClass() {
      if (!this.msg) return;
      return `alert-${this.msg.type}`;
    }
  }
};
</script>

<style>
@font-face {
  font-family: Shrikhand-Regular;
  src: url('../../public/fonts/Shrikhand/Shrikhand-Regular.ttf');
}
.sweet-alert{ 
  background-color: lightblue;
  
}
</style>


