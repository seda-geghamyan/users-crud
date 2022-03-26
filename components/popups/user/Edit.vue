<template>
  <b-modal
    v-model="isEditModalOpened"
    hide-footer
    title="Edit user"
    centered
    :no-close-on-backdrop="true"
    :hide-header-close="true"
  >
    <form ref="form" @submit.prevent="onSubmit">
      <b-form-group
        label="First Name"
        label-for="first-name-input"
        invalid-feedback="First Name is required"
      >
        <b-form-input
          id="first-name-input"
          v-model="first_name"
          :placeholder="selectedUser.first_name"
          required
        ></b-form-input>
      </b-form-group>

      <div class="text-right mt-3">
        <b-button
          variant="info"
          @click="$emit('update:isEditModalOpened', false)"
        >
          Cancel
        </b-button>
        <b-button variant="danger" type="submit"> Edit </b-button>
      </div>
    </form>
  </b-modal>
</template>
<script>
export default {
  props: {
    isEditModalOpened: {
      type: Boolean,
      default: false,
    },
    selectedUser: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      first_name: null,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("edit", { first_name: this.first_name });
    },
  },
  watch: {
    isEditModalOpened(to) {
      if (!to) {
        this.first_name = this.last_name = null;
      }
    },
  },
};
</script>
