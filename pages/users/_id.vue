<template>
  <b-container>
    <b-col lg="10" xl="8" class="mx-auto">
      <b-card no-body class="overflow-hidden mt-5">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="user.avatar"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="`${user.first_name} ${user.last_name}`">
              <b-card-title class="text-info">{{ user.email }}</b-card-title>
              <b-card-text>
                This is a wider card with supporting text as a natural lead-in
                to additional content. This content is a little bit longer.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-container>
</template>
<script>
import users from "~/mixins/users";
export default {
  mixins: [users],
  middleware: ["auth"],

  computed: {
    user() {
      return this.users.find((item) => {
        return item.id === +this.$route.params.id;
      });
    },
  },
};
</script>
