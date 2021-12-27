<template>
  <q-page class="flex flex-center">
    <transition appear enter-active-class="animated fadeInDown slower">
      <q-card style="max-width: 400px; width: 350px">
        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="user" label="User" />
          <q-tab name="admin" label="Admin" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="user">
            <app-form></app-form>
          </q-tab-panel>

          <q-tab-panel name="admin">
            <app-form type="admin"></app-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </transition>
  </q-page>
</template>

<script>
import AppForm from "src/components/AppForm.vue";
export default {
  components: { AppForm },
  data() {
    return {
      tab: "user",
    };
  },
};
</script>
