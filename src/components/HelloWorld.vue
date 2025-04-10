<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <v-card>
    <v-card-item>
      <v-card-title>{{ msg }}</v-card-title>
    </v-card-item>

    <v-card-text>
      <v-btn color="primary" @click="count++">Count: {{ count }}</v-btn>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>

      <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
          create-vue
        </a>
        , the official Vue + Vite starter
      </p>

      <p>
        Learn more about IDE Support for Vue in the
        <a
          href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
          target="_blank"
        >
          Vue Docs Scaling up Guide
        </a>
      </p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
