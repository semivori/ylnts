<template>
  <div id="app" class="container">
    <h4 class="text-center">Welcome to the Club!</h4>
    <h5>New member</h5>

    <form @submit.prevent="add">
      <form-field
        v-model="name"
        :label="'Name'"
        :required="true"
        :error="getError('name')"
      />
      <form-field
        v-model="email"
        :label="'Email'"
        :required="true"
        :type="'email'"
        :error="getError('email')"
      />

      <div class="row">
        <div class="col-sm-2"></div>
        <div class="d-flex justify-content-between col-sm-6">
          <button @click="add" type="button" class="btn btn-sm btn-primary">
            Add
          </button>
          <button @click="clear" type="button" class="btn btn-sm btn-secondary">
            Clear
          </button>
        </div>
      </div>
    </form>

    <hr class="mb-5" />
    <h5 class="text-center">Members</h5>
    <div v-if="members.length" class="table-responsive">
      <table class="table table-sm table-stripped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registration date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, idx) in members" :key="member.id">
            <td>
              {{ idx + 1 }}
            </td>
            <td>
              {{ member.name }}
            </td>
            <td>
              <a :href="`mailto:${member.email}`">{{ member.email }}</a>
            </td>
            <td>
              {{ formatDate(member.created_at) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No members yet.</p>
  </div>
</template>

<script>
import moment from "moment";
import FormField from "./components/FormField.vue";
import Api from "./services/Api";

export default {
  components: { FormField },
  name: "App",
  data: () => ({
    name: "",
    email: "",

    form_errors: [],

    members: [],
  }),
  methods: {
    formatDate(d) {
      return moment(d).format("DD.MM.YYYY");
    },
    getError(attr) {
      if (this.form_errors[attr] && this.form_errors[attr].length) {
        return this.form_errors[attr].at(-1);
      }

      return null;
    },
    load() {
      Api.members
        .get()
        .then((r) => {
          this.members = r.data.members;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    add() {
      Api.members
        .add({ name: this.name, email: this.email })
        .then((r) => {
          this.members.push(r.data.model);
          this.clear();
          this.$toasted.show('Done', {position: 'bottom-right', duration: 2000})
        })
        .catch((e) => {
          this.form_errors = e.response.data.errors;
        });
    },
    clear() {
      this.name = "";
      this.email = "";
    },
  },
  mounted() {
    this.load();

    console.log(
      process.env.VUE_APP_API_BASE_URL
    );
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
