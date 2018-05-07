



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
         background: "orange",
        title: msg.txt,
        position: "center",
        showConfirmButton: false,
        timer: 3000
      });
    });
  },
  data() {
    return {
      alive: false,
      msg: null
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
.sweet-alert {
  background-color: rgb(255, 255, 255);
}
</style>


