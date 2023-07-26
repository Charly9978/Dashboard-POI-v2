<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          DashBoard POI
        </q-toolbar-title>
        <q-btn flat round dense icon="apps" class="q-mr-xs" />
        <q-btn flat round dense icon="more_vert" />
        <q-avatar>
          <img :src="user?.picture">
        </q-avatar>
      </q-toolbar>
        <!--         <q-tabs align="center">
          <q-route-tab to="/page1" label="Page One" />
          <q-route-tab to="/page2" label="Page Two" />
          <q-route-tab to="/page3" label="Page Three" />
        </q-tabs> -->
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user';
import { ref } from 'vue'

    const leftDrawerOpen = ref(false)
  
      const toggleLeftDrawer = () => {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    
      const userStore = useUserStore()
      const user = userStore.user
    

</script>