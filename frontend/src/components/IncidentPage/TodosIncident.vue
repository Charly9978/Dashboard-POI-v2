<template>
    <q-card>
        <q-card-section>
            <div class="text-h6">Suivi des actions</div>
        </q-card-section>
        <q-card-section>
            <OpenTodosIncident/>
        </q-card-section>
        <q-card-section>
            <CloseTodosIncident/>
        </q-card-section>
    </q-card>
</template>
<script setup lang="ts">
import OpenTodosIncident from './OpenTodosIncident.vue';
import CloseTodosIncident from './CloseTodosIncident.vue';
</script>