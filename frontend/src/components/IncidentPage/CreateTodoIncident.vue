<template>
<q-card class="my-card">
        <q-card-section>
            <div class="text-h6">Nouvelle action</div>
        </q-card-section>
        <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
                <q-input type="text" :rules="[val => !!val || 'Field is required']" autogrow label="Description" v-model="todoToCreate.description" />
                <q-input v-model="formatedDate" label="Délais">
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date v-model="formatedDate" today-btn mask="DD/MM/YYYY HH:mm">
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
                                <q-time v-model="formatedDate" mask="DD/MM/YYYY HH:mm" format24h>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <q-input type="text" autogrow label="Commentaire" v-model="todoToCreate.comments" />
                <div>
                    <q-btn label="Enregistrer" type="submit" color="primary"/>
                    <q-btn label="Annuler" type="reset" color="primary" flat class="q-ml-sm" />
                </div>

            </q-form>
        </q-card-section>
    </q-card>
</template>
<script setup lang="ts">
import { useTodosStore } from 'src/stores/todos-store';
import { ref, computed } from 'vue';
import {date} from 'quasar'
import { useRoute } from 'vue-router';

const route = useRoute()
const todoToCreate = ref({
    comments: null,
    description:'',
    objectifDate: new Date().toISOString(),
    incidentId: route.params.id
})

const formatedDate = computed({
    get(){
        return new Date(todoToCreate.value.objectifDate).toLocaleString()
    },
    set(value){
        todoToCreate.value.objectifDate = date.extractDate(value,'DD/MM/YYYY HH:mm').toISOString()
    }
})

const emit = defineEmits(['created'])
const todoStore = useTodosStore()
const {createTodo} = todoStore
const onSubmit = async ()=>{
        await createTodo(todoToCreate.value)
        emit('created')
}

const onReset = ()=>{
    emit('created')
}

</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>