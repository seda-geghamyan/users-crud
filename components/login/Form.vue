<template>
  <b-container class="bv-example-row">
    <b-col col md="10" lg="8" class="mx-auto">
      <div class="bg-light py-3 px-5 mt-5 rounded">
        <h2 class="text-capitalize text-center">log in</h2>
        <b-form
          @submit.prevent="onSubmit"
          @reset="onReset"
          v-if="show"
          class="mt-4"
        >
          <b-form-group
            class="mb-4"
            id="input-group-1"
            label="Your Name:"
            label-for="input-1"
            :class="{
              'text-danger': $v.name.$error,
            }"
          >
            <b-form-input
              :class="{
                'is-invalid': $v.name.$error,
              }"
              id="input-1"
              v-model.trim="name"
              placeholder="Enter name"
            />
          </b-form-group>

          <b-form-group
            class="mb-4"
            id="input-group-2"
            label="Email address:"
            label-for="input-2"
            :class="{
              'text-danger': $v.email.$error,
            }"
          >
            <b-form-input
              :class="{
                'is-invalid': $v.email.$error,
              }"
              id="input-2"
              v-model.trim="email"
              type="email"
              placeholder="Enter email"
            />
          </b-form-group>

          <b-form-group
            class="mb-4"
            id="input-group-3"
            label="Your password:"
            label-for="input-3"
            :class="{
              'text-danger': $v.password.$error,
            }"
          >
            <b-form-input
              id="input-3"
              type="password"
              :class="{
                'is-invalid': $v.password.$error,
              }"
              v-model.trim="password"
              placeholder="Enter password"
            />
          </b-form-group>
          <div class="text-right">
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>
        </b-form>
      </div>
    </b-col>
  </b-container>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      show: true,
    };
  },

  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      email,
      required,
      minLength: minLength(10),
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },

  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const form = {
        name: this.name,
        email: this.email,
      };

      await this.$localForage.setItem("loggedUser", form);
      this.$router.push("/users");
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.name = this.email = this.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
