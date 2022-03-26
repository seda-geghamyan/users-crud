export const state = () => {
  return {
    users: [],
  };
};

export const mutations = {
  SET_DATA(state, data) {
    for (const key in data) {
      state[key] = [...state[key], ...data[key]];
    }
  },

  ADD_DATA(state, data) {
    state[data.array].push(data.item);
  },

  UPDATE_DATA(state, data) {
    const index = state[data.array].findIndex((element) => {
      return element.id === data.id;
    });
    state[data.array][index].first_name = data.item.first_name;
  },

  DELETE_DATA(state, data) {
    state[data.array] = state[data.array].filter((element) => {
      return element.id !== data.id;
    });
  },
};

export const actions = {
  async load({ commit }, page = 1) {
    try {
      const users = await this.$axios.$get(
        `https://reqres.in/api/users?page=${page}`
      );
      users.data.length && commit("SET_DATA", { users: users.data });
    } catch (error) {
      console.error(error);
    }
  },

  async add({ commit }, item) {
    try {
      await this.$axios.$post(`https://reqres.in/api/users/`).then(() => {
        commit("ADD_DATA", { array: "users", item });
      });
    } catch (error) {
      console.error(error);
    }
  },

  async update({ commit }, { userId, data }) {
    try {
      await this.$axios
        .$put(`https://reqres.in/api/users/${userId}`, data)
        .then((r) => {
          commit("UPDATE_DATA", { array: "users", item: r, id: userId });
        });
    } catch (error) {
      console.error(error);
    }
  },

  async delete({ commit }, userId) {
    try {
      await this.$axios
        .$delete(`https://reqres.in/api/users/${userId}`)
        .then(() => {
          commit("DELETE_DATA", { array: "users", id: userId });
        });
    } catch (error) {
      console.error(error);
    }
  },
};

export const getters = {
  users: ({ users }) => users,
};
