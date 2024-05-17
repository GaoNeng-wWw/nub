<script setup lang="ts">
const formData = reactive({
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
  for (const [,item] of Object.entries(formData)) {
    item.invalide = item.data.length === 0
  }
}

const hasInvalide = computed(() => {
  return Object.entries(formData).some(([, { invalide }]) => invalide)
})

const login = useLogin()
const storage = useSessionStorage('admin_token', '');

const onLogin = () => {
  valide();
  if (hasInvalide.value) {
    return;
  }
  login({
    username: formData.username.data,
    password: formData.password.data,
  })
    .then(({ token }) => {
      storage.value = token;
      console.log('Login success')
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
              class="p-2 rounded outline-none transition"
              :class="{
                'bg-red-200 hover:bg-red-200 text-red-500': item.invalide,
                'bg-zinc-200 hover:bg-zinc-300': !item.invalide,
              }"
              @blur="() => valide(key)"
            >
          </div>
        </div>
        <button class="w-full text-center bg-blue-500 text-zinc-50 py-2 rounded-md" @click="onLogin">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
