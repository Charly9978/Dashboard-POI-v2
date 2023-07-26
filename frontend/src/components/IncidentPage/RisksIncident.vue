<template>
    <q-card v-if="incident">
        <q-card-section>
            <div class="text-h6">Risques</div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
            <q-checkbox v-model="incident.external_effect" label="Effets à l'extérieur du site" />
            <q-checkbox v-model="incident.risk_surpressure" label="Effets de surpression (explosion)" />
            <q-checkbox v-model="incident.risk_thermic" label="Effets thermiques" />
            <q-checkbox v-model="incident.risk_toxic" label="Effets toxiques" />
            <q-checkbox v-model="incident.risk_environmental" label="Effets sur l'environnement" />
            <q-checkbox v-model="incident.possibleRiskForPopulation" label="Risque possible pour la population" />
            <q-input filled v-model="incident.impact_on_site" type="textarea" label="Description de impacts sur le site" />
            <q-input filled v-model="incident.impact_outside" type="textarea" label="Description des impacts à l'extérieur du site" />




        </q-card-section>
    </q-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useIncidentStore } from '../../stores/incident'

const incidentStore = useIncidentStore()
const { incident } = storeToRefs(incidentStore)
</script>