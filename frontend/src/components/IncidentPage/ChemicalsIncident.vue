<template>
    <q-card v-if="incident">
        <q-card-section>
            <div class="text-h6">Incident Chimique</div>
        </q-card-section>
        <q-card-section>
            <q-form class="q-gutter-md">
                <q-input filled v-model="incident.chemical_name" type="textarea" label="Nom du ou des produits chimique impliqués" />
                <q-input filled v-model="incident.chemical_qty" type="textarea" label="Quantité de produits chimique impliqués" />
            </q-form>
        </q-card-section>
    </q-card>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useIncidentStore } from '../../stores/incident'
import { ref } from 'vue';

const incidentStore = useIncidentStore()
const { incident } = storeToRefs(incidentStore)

</script>