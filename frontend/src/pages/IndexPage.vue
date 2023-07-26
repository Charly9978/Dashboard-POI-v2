<template>
  <q-page class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="incident in incidents" :key="incident.id" class="my-card bg-grey-9 text-white">
      <q-card-section>
        <div class="text-overline">{{incident.is_exercice?"Exercice":"Incident réel"}}</div>
      </q-card-section>

      <q-separator dark />
      <q-card-section>
        <div class="text-subtitle2 q-mb-sm">Date: {{ new Date(incident.date).toLocaleDateString() }}</div>
        <div class="text-h6">{{incident.description}}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2 q-mt-sm ">Salle de crise: {{ incident.crisis_room.name }}</div>
        <div class="text-subtitle2 q-mt-sm">Status: {{ status(incident.status) }}</div>
      </q-card-section>

      <q-separator dark />

      <q-card-actions align="center">
        <q-btn :to="`/incidents/${incident.id}`" flat>Détails</q-btn>
      </q-card-actions>
    </q-card>
    <q-page-sticky position="bottom" :offset="[18, 18]">
            <q-btn fab @click="showDialog = !showDialog" icon="add" label="nouvel incident" color="accent"  />
          </q-page-sticky>
    <q-dialog v-model="showDialog">
      <create-incident></create-incident>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { api } from 'boot/axios'
import CreateIncident from 'src/components/CreateIncident.vue';
import {onMounted, ref } from 'vue'

enum IncidentStatus {
  FINISH = 'finish',
  CONTROLLED = 'controlled',
  EVOLUTION = 'inevolution',
}

interface Incident {
    'date': Date,
    'is_exercice': boolean,
    'description': string,
    'localisation': string,
    'status': IncidentStatus,
    'crisis_room': {
      'name': string,
    },
    'id': number,
}

const incidents = ref<Incident[]>([])

const loadIncidents = async () => {
  const response = await api.get('/incidents')
  incidents.value = response.data
}

onMounted(()=>{
  loadIncidents()
})

const showDialog = ref(false)

const status = (status: IncidentStatus)=>{
  switch(status){
    case IncidentStatus.EVOLUTION:
      return 'En évolution'
    case IncidentStatus.CONTROLLED:
      return 'En cours de maitrise'
    case IncidentStatus.FINISH:
      return 'Cloturé'
  }
}


</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
