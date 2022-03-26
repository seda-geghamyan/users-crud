<template>
  <b-modal
    v-model="isDeleteModalOpened"
    hide-footer
    centered
    title="Delete user"
    :no-close-on-backdrop="true"
    :hide-header-close="true"
  >
    <p>
      You are going to delete
      <nuxt-link
        :to="`/users/${selectedUser.id}`"
        class="text-info text-capitalize"
      >
        {{ selectedUser.first_name }} {{ selectedUser.last_name }}
      </nuxt-link>
    </p>
    <div class="text-right mt-3">
      <b-button
        variant="info"
        @click="$emit('update:isDeleteModalOpened', false)"
      >
        Cancel
      </b-button>
      <b-button variant="danger" @click="$emit('delete')"> Delete </b-button>
    </div>
  </b-modal>
</template>
<script>
export default {
  props: {
    isDeleteModalOpened: {
      type: Boolean,
      default: false,
    },
    selectedUser: {
      type: Object,
      require: true,
    },
  },
};
</script>
