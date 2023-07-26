<template>
  <q-card v-if="incident">
    <q-card-section>
      <div class="text-h6">Généralités</div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md">
        <q-toggle v-model="incident.is_exercice" :label="incident.is_exercice ? 'Exercice' : 'Incident réel'"></q-toggle>
        <q-input filled type="textarea" v-model="incident.description" label="Description de l'incident" />

        <q-input filled v-model="incident.localisation" label="Localisation de l'incident" />

        <q-input filled v-model="formatedDate">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="formatedDate" mask="DD/MM/YYYY HH:mm" today-btn>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="formatedDate" mask="DD/MM/YYYY HH:mm" now-btn format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select filled v-model="incident.cinetic" :options="cineticOptions" emit-value map-options
          label="Cinétique de l'incident" />
        <q-select filled v-model="incident.status" :options="evolutionOptions" emit-value map-options
          label="Status de l'incident" />
      </q-form>
    </q-card-section>
    <q-card-section>
      <q-input filled type="textarea" v-model="incident.observations" label="Commentaires" />
    </q-card-section>

  </q-card>
</template>

<script setup lang="ts">
//ajouter la salle de crise
import { storeToRefs } from 'pinia';
import {useIncidentStore} from '../../stores/incident'
import { computed } from 'vue';
import { IncidentCinetic } from '../../stores/incident';
import { IncidentStatus } from '../../stores/incident';
import { date as quasarDate } from 'quasar';

const incidentStore = useIncidentStore()
const {incident} = storeToRefs(incidentStore)

const cineticOptions = [
  {
    value: IncidentCinetic.FAST,
    label: 'Rapide'
  },
  {
    value: IncidentCinetic.SLOW,
    label : 'Lente'
  }
]

const evolutionOptions = [
  {
    value: IncidentStatus.EVOLUTION,
    label: 'En évolution'
  },
  {
    value: IncidentStatus.CONTROLLED,
    label: 'En cours de maitrise'
  },
  {
    value: IncidentStatus.FINISH,
    label: 'Terminé'
  }
]

const formatedDate = computed({
  get:() => {
    if(incident.value){
      return new Date(incident.value.date).toLocaleString()
    }else{
      return null
    }
  },
  set:(value) => {
    if(incident.value && value){
      incident.value.date = quasarDate.extractDate(value,'DD/MM/YYYY HH:mm').toISOString()
    }
  }
})
</script>