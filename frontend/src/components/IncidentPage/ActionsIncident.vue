<template>
    <q-card v-if="incident">
        <q-card-section>
            <div class="text-h6">Actions</div> 
        </q-card-section>
        <q-card-section>
            <q-form class="q-gutter-md">
                <q-checkbox v-model="incident.containment" label="Confinement du personnel" />
                <q-checkbox v-model="incident.evacuation" label="Evacuation du personnel" />
                <q-checkbox v-model="incident.emergency_call" label="Appel des secours extérieur" />
                <q-checkbox v-model="incident.facilities_stop" label="Arrêt d'installation technique" />
                <q-input filled type="textarea" v-model="incident.facilties_actions" label="Actions sur les installations techniques"/>
                <q-input filled type="textarea" v-model="incident.external_communication" label="Actions de communication"/>
            </q-form>
        </q-card-section>
    </q-card>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useIncidentStore} from '../../stores/incident'

const incidentStore = useIncidentStore()
const {incident} = storeToRefs(incidentStore)
</script>