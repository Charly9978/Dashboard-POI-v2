<template>
    <q-card v-if="todoIdToEdit" class="my-card">
        <q-card-section>
            <div class="text-h6">Formulaire de modification</div>
        </q-card-section>
        <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
                <q-input type="text" :rules="[val => !!val || 'Field is required']" autogrow label="Description" v-model="todoToEdit.description" />
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
                <q-input type="text" autogrow label="Commentaire" v-model="todoToEdit.comments" />
                <div class="row">
                    <q-btn label="Modifier" type="submit" color="primary"/>
                    <q-btn label="Annuler" type="reset" color="primary" flat class="q-ml-sm" />
                    <q-space/>
                    <q-btn flat round dense color="primary" @click="deleteTodo(todoIdToEdit)">
                        <q-icon name="delete" />
                     </q-btn>
                </div>

            </q-form>
        </q-card-section>
    </q-card>
</template>
<script setup lang="ts">
import { useTodosStore } from 'src/stores/todos-store';
import { Todo } from 'src/stores/incident';
import { ref, computed } from 'vue';
import {date} from 'quasar'


const props = defineProps<{
    todoIdToEdit: number
}>()

const emit = defineEmits(['updated'])

const todoStore = useTodosStore()
const {getTodoById,updateTodo} = todoStore
const todoToEdit = ref({...getTodoById(props.todoIdToEdit) as Todo})

const formatedDate = computed({
    get(){
        return new Date(todoToEdit.value.objectifDate).toLocaleString()
    },
    set(value){
        todoToEdit.value.objectifDate = date.extractDate(value,'DD/MM/YYYY HH:mm').toISOString()
    }
})

const onSubmit = async ()=>{
        await updateTodo(todoToEdit.value)
        emit('updated')
}

const onReset = ()=>{
    emit('updated')
}

const deleteTodo = async(id: number) => {
    console.log('test', id)
    await todoStore.deleteTodo(id)
    emit('updated')
}

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>