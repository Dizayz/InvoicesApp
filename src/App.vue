<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from "./components/Sidebar.vue"
import ModalInvoice from './components/ModalInvoice.vue';
</script>

<template>
  <main>
    <div class="mainapp">
      <ModalInvoice></ModalInvoice>
      <Sidebar />
      <div class="viewSection">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>

  </main>
</template>

<style scoped>
.mainapp {
  min-height: 100vh;
  width: 100%;
  background-color: #1b1b3a;
  display: flex;
}

.viewSection {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.viewSection::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  z-index: -100;
}
</style>
