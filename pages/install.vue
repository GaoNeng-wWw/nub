<script setup lang="ts">
const formData = reactive({
  siteName: {
    label: '站点名称',
    type: 'string',
    data: ref(''),
    invalide: ref(false),
  },
  username: {
    label: '管理员用户名',
    type: 'string',
    data: ref(''),
    invalide: ref(false),
  },
  password: {
    label: '管理员密码',
    type: 'password',
    data: ref(''),
    invalide: ref(false),
  },
})

const valide = (key?: keyof typeof formData) => {
  if (key) {
    formData[key].invalide = formData[key].data.length === 0
    return;
  }
  for (const [key, item] of Object.entries(formData)) {
    item.invalide = item.data.length === 0
  }
}

const hasInvalide = computed(() => {
  return Object.entries(formData).some(([, { invalide }]) => invalide)
})

const installSite = async () => {
  valide();
  if (hasInvalide.value) {
    return;
  }
  const payload = Object.entries(formData).map(([key, { data }]) => {
    return { [key]: data }
  }).reduce((pre, cur) => {
    return {
      ...pre,
      ...cur,
    }
  }, {});
  const router = useRouter();
  $fetch('/api/install', { method: 'post', body: payload })
    .then(() => {
      router.replace('/');
    })
    .catch((reason) => {
      // TODO: Message
      console.log(reason);
    })
}
</script>

<template>
  <div class="w-full flex justify-center items-center h-full">
    <div class="min-w-64 h-fit p-2 bg-zinc-50 rounded shadow">
      <h1 class="text-lg text-center">
        Install
      </h1>
      <div class="space-y-2">
        <div v-for="(item, key) of formData" :key="key">
          <div class="flex flex-col space-y-1">
            <label class="text-zinc-700 text-sm after:content-['*'] after:text-red-500 after:ml-1">
              {{ item.label }}
            </label>
            <input
              v-model="item.data"
              :type="item.type"
              class="bg-zinc-200 p-2 rounded outline-none hover:bg-zinc-300 transition"
              :class="{
                'bg-red-200 hover:bg-red-200 text-red-500': item.invalide,
                'bg-zinc-200 hover:bg-zinc-30': !item.invalide,
              }"
              @blur="() => valide(key)"
            >
          </div>
        </div>
        <button class="w-full text-center bg-blue-500 text-zinc-50 py-2 rounded-md" @click="installSite">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
