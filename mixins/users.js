import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      users: "users/users",
    }),
  },

  async mounted() {
    await this.loadUsers();
  },

  methods: {
    ...mapActions({
      loadUsers: "users/load",
    }),
  },
};
