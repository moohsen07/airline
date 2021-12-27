<template>
  <q-form @submit="submit" class="q-gutter-sm">
    <div v-if="this.errorMsg.length" class="error-msg q-pa-sm">
      <span class="text-subtitle1 text-grey">{{ errorMsg }}</span>
    </div>
    <q-input
      v-model="user.userName"
      type="text"
      outlined
      color="primary"
      label="user name"
      :rules="[(val) => val.length || 'Type your user name']"
    >
      <template v-slot:prepend>
        <q-icon name="las la-user-circle" color="primary" />
      </template>
    </q-input>
    <q-input
      v-model="user.password"
      type="password"
      outlined
      color="primary"
      label="password"
      :rules="[
        (val) =>
          type == 'admin' ||
          val.length >= 5 ||
          'password must be more than or equal 5',
      ]"
      lazy-rules
    >
      <template v-slot:prepend>
        <q-icon name="las la-lock" color="primary" />
      </template>
    </q-input>
    <div class="">
      <q-btn
        class="full-width"
        label="Submit"
        type="submit"
        color="primary"
        text-color="dark"
      />
    </div>
  </q-form>
</template>

<script>
import axios from "axios";
export default {
  props: {
    type: {
      required: false,
      default: "user",
    },
  },
  data() {
    return {
      user: {
        userName: "",
        password: "",
      },
      errorMsg: "",
    };
  },
  methods: {
    submit() {
      if (this.type == "user") {
        this.$store
          .dispatch("createUser", this.user)
          .then((result) => {
            console.log(result);
            this.$q.notify({
              message: `Hello ${this.user.userName}`,
              position: "top-right",
              color: "secondary",
            });
            this.$router.push("/user");
          })
          .catch((err) => {
            this.errorMsg = err.msg;
          });
        return;
      }
      if (this.user.userName != "admin" && this.user.password != "12345678") {
        this.errorMsg = "The user name or password is not valid";
      } else {
        this.$router.push("/admin");
      }
    },
  },
};
</script>

<style lang="scss">
.error-msg {
  background-color: rgba($color: $red, $alpha: 0.2);
  border: 1px solid $red;
}
</style>
