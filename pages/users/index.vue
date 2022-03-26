<template>
  <div>
    <b-container>
      <h2 class="mt-5">Users List</h2>
      <b-button variant="success" class="mb-4" @click="isAddModalOpened = true">
        Add User
      </b-button>
      <div v-if="users.length">
        <b-table
          small
          :fields="fields"
          :items="users"
          responsive="sm"
          id="my-table"
          :per-page="perPage"
          :current-page="currentPage"
          class="users-list"
        >
          <template #cell(index)="data">
            {{ data.id }}
          </template>

          <template #cell(avatar)="data">
            <nuxt-link
              :to="`/users/${data.item.id}`"
              class="text-center d-block"
            >
              <b-avatar size="6rem" :src="data.item.avatar" fluid alt="" />
            </nuxt-link>
          </template>

          <template #cell(full_name)="data">
            <nuxt-link
              :to="`/users/${data.item.id}`"
              class="text-info text-nowrap text-capitalize text-center d-block"
            >
              {{ data.item.first_name }} {{ data.item.last_name }}
            </nuxt-link>
          </template>

          <template #cell(email)="data">
            <p class="text-center">
              {{ data.item.email }}
            </p>
          </template>

          <template #cell(actions)="data">
            <div class="d-flex">
              <b-button
                variant="warning"
                class="mr-2 ml-auto"
                @click="selectUser(data.item.id, 'isEditModalOpened')"
              >
                Edit
              </b-button>
              <b-button
                variant="danger"
                @click="selectUser(data.item.id, 'isDeleteModalOpened')"
              >
                Delete
              </b-button>
            </div>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="users.length"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
          @change="changePage"
        />
      </div>

      <b-alert v-else variant="info" show>
        <h4 class="alert-heading text-capitalize text-center mb-0">
          records not found
        </h4>
      </b-alert>
    </b-container>

    <popups-user-add
      :isAddModalOpened.sync="isAddModalOpened"
      :selectedUser="selectedUser"
      @add="addUser"
    />
    <popups-user-edit
      :isEditModalOpened.sync="isEditModalOpened"
      :selectedUser="selectedUser"
      @edit="editUser"
    />
    <popups-user-delete
      :isDeleteModalOpened.sync="isDeleteModalOpened"
      :selectedUser="selectedUser"
      @delete="deleteUser"
    />
  </div>
</template>
<style lang="scss" scoped>
.users {
  &-list {
    min-height: 570px;
  }
}
</style>
<script>
import { mapActions } from "vuex";
import users from "@/mixins/users";

export default {
  mixins: [users],
  middleware: ["auth"],

  data() {
    return {
      selectedUser: {},
      isAddModalOpened: false,
      isEditModalOpened: false,
      isDeleteModalOpened: false,
      perPage: 5,
      page: 1,
      currentPage: 1,
      fields: [
        "id",
        { key: "avatar", class: "text-center" },
        { key: "full_name", label: "Name", class: "text-center" },
        { key: "email", class: "text-center" },
        { key: "actions", label: "" },
      ],
    };
  },

  methods: {
    ...mapActions({
      addUsers: "users/add",
      loadUsers: "users/load",
      updateUsers: "users/update",
      deleteUsers: "users/delete",
    }),

    changePage() {
      this.page++;
      this.loadUsers(this.page);
    },

    async editUser(option) {
      try {
        this.toggleModal("isEditModalOpened");
        await this.updateUsers({ userId: this.selectedUser.id, data: option });

        this.makeToaster({
          description: "Data succesfully updated",
          title: "Success",
          variant: "success",
        });
      } catch (error) {
        console.error(error);
        this.makeToaster({
          description: "Something went wrong.",
          title: "Error",
          variant: "danger",
        });
      }
    },

    async addUser(option) {
      try {
        this.toggleModal("isAddModalOpened");
        await this.addUsers(option);

        this.makeToaster({
          description: "Data succesfully added",
          title: "Success",
          variant: "success",
        });
      } catch (error) {
        console.error(error);
        this.makeToaster({
          description: "Something went wrong.",
          title: "Error",
          variant: "danger",
        });
      }
    },

    async deleteUser() {
      try {
        this.toggleModal("isDeleteModalOpened");
        await this.deleteUsers(this.selectedUser.id);

        this.makeToaster({
          description: "Data succesfully deleted",
          title: "Success",
          variant: "success",
        });
      } catch (error) {
        console.error(error);
        this.makeToaster({
          description: "Something went wrong.",
          title: "Error",
          variant: "danger",
        });
      }
    },

    selectUser(userId, modal) {
      const user = this.users.find((item) => item.id === userId);
      this.selectedUser = user;
      this.toggleModal(modal);
    },

    toggleModal(modal) {
      this[modal] = !this[modal];
    },

    makeToaster(option) {
      this.$bvToast.toast(option.description, {
        title: option.title,
        variant: option.variant,
        solid: true,
        toaster: "b-toaster-top-right",
        appendToast: true,
      });
    },
  },
};
</script>
