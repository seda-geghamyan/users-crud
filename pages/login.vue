<template>
  <login-form />
</template>

<script>
export default {
  layout: "login",
  async middleware({ $localForage, redirect }) {
    // If the user is authenticated
    const user = await $localForage.getItem("loggedUser");
    if (user) {
      return redirect("/users");
    }
  },
};
</script>
