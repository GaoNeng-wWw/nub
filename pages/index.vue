<script setup lang="ts">
import LoginModal from '~/components/LoginModal.vue';

const logged = useLogged();
const showLoginModel = ref(false);
const { data } = await useUserInfo(logged);
</script>

<template>
  <nuxt-layout>
    <template #header>
      <div class="w-full">
        <div class="flex justify-between items-center max-w-screen-lg w-full mx-auto px-4">
          <div />
          <nav>
            <ul class="flex gap-2 p-2 bg-zinc-200 rounded-md my-4">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
            </ul>
          </nav>
          <div>
            <div
              v-if="!logged"
              class="w-fit bg-zinc-200 p-1.5 rounded-full cursor-pointer"
              @click="() => showLoginModel = true"
            >
              <icon-login class="w-6 h-6" />
            </div>
            <img v-else class="w-8 h-8 rounded-full" :src="data?.data?.avatar_url">
          </div>
        </div>
      </div>
    </template>
    <div class="w-full max-w-screen-sm mx-auto">
      <nub-list-item
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique quam dolorem odit, hic quod eius, ullam, dolorum dignissimos voluptatem pariatur omnis possimus minima ea qui rerum laboriosam aperiam assumenda!"
        :date="0"
        :tags="[]"
      />
    </div>
    <nub-modal v-if="showLoginModel">
      <LoginModal />
    </nub-modal>
  </nuxt-layout>
</template>
