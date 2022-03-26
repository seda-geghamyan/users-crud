<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <b-container fluid="lg">
        <b-navbar-brand href="#">TCOtask</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" />
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/users">Users</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>Admin </em>
              </template>
              <b-dropdown-item-btn @click="logOut">
                Sign Out
              </b-dropdown-item-btn>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
export default {
  computed: {
    async user() {
      const user = await this.$localForage.getItem("loggedUser");
      return user;
    },
  },
  methods: {
    async logOut() {
      await this.$localForage.removeItem("loggedUser");
      this.$router.push("/login");
    },
  },
};
</script>
