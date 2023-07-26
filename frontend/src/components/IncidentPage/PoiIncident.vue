<template>
    <q-card v-if="incident">
        <q-card-section>
            <div class="text-h6">Organisation POI</div>
        </q-card-section>
        <q-card-section>
                <q-toggle v-model="poiOpen" :label="poiOpen?'POI déclenché':'POI non déclenché'"/>
                <div v-if="incident.poi_open_at" class="q-gutter-md">
                    <div>Date de déclenchement: {{ new Date(incident.poi_open_at).toLocaleString()}}</div>
                    <q-toggle v-model="contactMunicipalty" label="Contacter les mairies?" />
                    <q-toggle v-model="contactNeighbourhood" label="Contacter le voisinage?"/>
                </div>
        </q-card-section>
        <q-card-section>
        <div class="row">
            <div class="text-subtitle2">Salle de crise</div>
            <q-space/>
            <q-btn v-if="!editMode" icon="edit" round flat dense @click="editRoom()"/>
            <q-btn v-else icon="save" round flat dense @click="saveRoom()"/>
        </div>
            <div class="q-gutter-md" v-if="editMode">
                <q-select filled v-model="roomId" :options="roomsOption" emit-value map-options/>
                <q-input filled readonly label="Batiment" :model-value="selectedRoom?.building"/>
                <q-input filled readonly label="Etage" :model-value="selectedRoom?.level"></q-input>
                <q-input filled readonly label="Téléphone" :model-value="selectedRoom?.phone_number"></q-input>   
            </div>
            <div class="q-gutter-md" v-else>
                <q-input filled readonly label="Nom" v-model="incident.crisis_room.name"></q-input>
                <q-input filled readonly label="Batiment" v-model="incident.crisis_room.building" ></q-input>
                <q-input filled readonly label="Etage" v-model="incident.crisis_room.level"></q-input>
                <q-input filled readonly label="Téléphone" v-model="incident.crisis_room.phone_number"></q-input>   
            </div>

        </q-card-section>
    </q-card>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {Room, useIncidentStore} from '../../stores/incident';
import {useTodosStore, Recipient} from '../../stores/todos-store'
import {computed, ref} from 'vue'
import { api } from 'src/boot/axios';

interface RoomOption {
    label: string,
    value: number,
    building: string,
    level: string,
    phone_number: string
}
const incidentStore = useIncidentStore()
const {incident} = storeToRefs(incidentStore)

const todosStore = useTodosStore()
const roomsOption = ref<RoomOption[]>([])
const editMode = ref(false)
const roomId = computed({
    get: ()=>incident.value?.crisisRoomId,
    set: (value) => {
        if(value){
            incident.value!.crisisRoomId = value
        }
    }
})
const selectedRoom = computed(()=>roomsOption.value.find(r=>r.value == roomId.value))

const editRoom = async() => {
    const resp = await api.get<Room[]>('/rooms')
    resp.data.forEach(room=>{
        const roomOption:RoomOption= {
            label: room.name,
            value: room.id,
            building: room.building,
            level: room.level,
            phone_number: room.phone_number
        }
        roomsOption.value.push(roomOption)
    })  
    editMode.value = true
}

const saveRoom = async ()=>{
    await incidentStore.updateIncident()
    roomsOption.value = []
    editMode.value = false
}

const poiOpen = computed({
    get:()=>{
            return incident.value?.poi_open_at?true:false
    },
    set: async (value: boolean) =>{
        if(incident.value){
            if(value && incident.value){
                incident.value.poi_open_at = new Date().toISOString()
            }else{
                incident.value.poi_open_at = null
            }
            await manageTodo(value,Recipient.AUTORITY)
            await incidentStore.updateIncident()
        }
    }
})

const contactMunicipalty = computed({
    get: ()=>incident.value?.contactMunicipalty?true:false,
    set: async (value:boolean) => {
        incident.value!.contactMunicipalty = value
        await manageTodo(value,Recipient.MUNICIPALTY)
        await incidentStore.updateIncident()
    }
})

const contactNeighbourhood = computed({
    get: ()=>incident.value?.contactNeighbourhood?true:false,
    set: async (value:boolean) => {
        incident.value!.contactNeighbourhood = value
        await manageTodo(value,Recipient.NEIGHBOURHOOD)
        await incidentStore.updateIncident()
    }
})

const manageTodo = async (value:boolean, recipient:Recipient) => {
    if(value &&incident.value){
        await todosStore.createTodoFor(incident.value.id,recipient)
    }else{
        await todosStore.deleteTodoFor(recipient)
    }
}
</script>