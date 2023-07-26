<template>
  <q-card style="width: 450px">
    <q-card-section>
      <div class="text-h6">Nouvel incident</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-toggle v-model="is_exercice" :label="is_exercice ? 'Exercice' : 'Incident réel'"></q-toggle>
        <q-input filled v-model="description" label="Description de l'incident" type="textarea" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <q-input filled v-model="date" label="Date et heure de l'incident">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date" mask="DD/MM/YYYY HH:mm" default-date>
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
                <q-time v-model="date" mask="DD/MM/YYYY HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input filled v-model="localisation" label="Localisation" lazy-rules hint="ex: Bunker chimie batD Bernin1"
          :rules="[val => val && val.length > 0 || 'Please type something']" />

          <q-select filled v-model="roomId" :options="roomsOption" emit-value map-options label="Salle de crise" >
            <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
          </q-select>

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Close" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">

import { date as dateQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router';

interface Room {
  id: number
  level: string
  building: string
  phone_number: string
  name: string
}
 interface RoomOption {
  value: number
      label: string,
      description: string
 }


const is_exercice = ref(true)
const description = ref('')
const timeStamp = Date.now()
const formattedString = dateQuasar.formatDate(timeStamp, 'DD/MM/YYYY HH:mm')
const date = ref(formattedString)
const localisation = ref('')
const roomsOption = ref<RoomOption[]>([])
const roomId = ref<number | null>(null)

const router = useRouter()

onMounted(async ()=>{
  const resp = await api.get('/rooms')
  const rooms = resp.data as Room[]
  rooms.forEach(room=>{
    const roomOption ={
      value: room.id,
      label: room.name,
      description: `batiment: ${room.building}, étage: ${room.level}`
    }
    roomsOption.value.push(roomOption)
  })
  })




const onSubmit = async ()=>{
  const resp = await api.post('/incidents',{
    is_exercice: is_exercice.value,
    description: description.value,
    localisation: localisation.value,
    crisisRoomId: roomId.value,
    date: dateQuasar.extractDate(date.value,'DD/MM/YYYY HH:mm')
  })
  const incidentId = resp.data.id
  router.push(`/incidents/${incidentId}`)
}

const onReset = () => {console.log('coucoou')}
</script>
