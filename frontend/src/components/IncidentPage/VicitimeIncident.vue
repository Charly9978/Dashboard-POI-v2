<template>
    <q-card v-if="incident">
        <q-card-section>
            <div class="text-h6">Victimes</div>
        </q-card-section>
        <q-card-section>
            <q-form class="q-gutter-md">
                <q-input type="number" v-model="incident.victims_involved" filled label="Nombre de victimes impliquées"/>
                <q-input type="number" v-model="incident.victims_ur" filled label="Nombre de victimes en urgence relative"/>
                <q-input type="number" v-model="incident.victims_ua" filled label="Nombre de victimes en urgence absolue"/>
                <q-input type="number" v-model="incident.victims_death" filled label="Nombre de victimes décédées"/>
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