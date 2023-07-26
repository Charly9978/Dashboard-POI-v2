<template>
  <q-page padding>
    <div class="row q-col-gutter-md ">
      <div class="col-12">
        <TodosIncident/>
      </div>
      <div class="col-8">
        <GeneralityIncident/>
      </div>
      <div class="col-3">
        <PoiIncident/>
      </div>
      <div class="col-3">
        <VicitimeIncident/>
      </div>
      <div class="col-3">
        <RisksIncident/>
      </div>
      <div class="col-3">
        <ActionsIncident/>
      </div>
      <div class="col-3">
        <ChemicalsIncident/>
      </div>
    </div>
  </q-page>
  <q-btn label="test" @click="update"></q-btn>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {useIncidentStore} from 'stores/incident'
import GeneralityIncident from '../components/IncidentPage/GeneralityIncident.vue'
import VicitimeIncident from 'src/components/IncidentPage/VicitimeIncident.vue';
import ActionsIncident from 'src/components/IncidentPage/ActionsIncident.vue';
import RisksIncident from 'src/components/IncidentPage/RisksIncident.vue';
import ChemicalsIncident from 'src/components/IncidentPage/ChemicalsIncident.vue';
import PoiIncident from 'src/components/IncidentPage/PoiIncident.vue';
import TodosIncident from 'src/components/IncidentPage/TodosIncident.vue';

const route = useRoute()
const incidentStore = useIncidentStore()

onMounted(async () => {
  const id = route.params.id as string
  await incidentStore.getIncident(id)
/*   setInterval(async()=>{
    await incidentStore.getIncident(id)
  },1000*30) */
})

const update = async ()=>{
  await incidentStore.updateIncident()
}
</script>
