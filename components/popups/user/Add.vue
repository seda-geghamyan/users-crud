<template>
  <b-modal
    v-model="isAddModalOpened"
    hide-footer
    title="Add user"
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
          required
        ></b-form-input>
      </b-form-group>

      <div class="text-right mt-3">
        <b-button
          variant="info"
          @click="$emit('update:isAddModalOpened', false)"
        >
          Cancel
        </b-button>
        <b-button variant="danger" type="submit"> Add </b-button>
      </div>
    </form>
  </b-modal>
</template>
<script>
export default {
  props: {
    isAddModalOpened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      first_name: null,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("add", { first_name: this.first_name, id: Date.now() });
    },
  },
  watch: {
    isAddModalOpened(to) {
      if (!to) {
        this.first_name = this.last_name = null;
      }
    },
  },
};
</script>
