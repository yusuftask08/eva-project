<template>
  <column />
</template>

<script>
import Column from "../components/High-chart/Column/index.vue";
import { mapGetters } from "vuex";
import { FETCH_COLUMN_DATA } from "@/store/actions.type";
export default {
  name: "Home",

  components: {
    Column,
  },

  created() {
    this.$store.dispatch(FETCH_COLUMN_DATA);
  },
};
</script>
