<script setup lang="ts">
import { Button } from '@miraiui-org/vue-button';

const props = defineProps({
  error: Object,
})

const { data } = props.error;
const dataObj = JSON.parse(data);

setTimeout(() => {
  clearError({ redirect: dataObj.redirect })
}, 5000);
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center flex-col gap-2 bg-slate-100">
    <h1 class="text-4xl">
      {{ props.error.statusCode }}
    </h1>
    <p class="text-lg">
      {{ dataObj.reason }}
    </p>
    <Button type="warning" @click="() => clearError({ redirect: dataObj.redirect })">
      带我离开
    </Button>
  </div>
</template>
