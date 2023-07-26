<template>
            <q-table v-if="todoStore.openTodos" title="Actions ouvertes" :rows="todoStore.openTodos" :columns="columns"
                row-key="name"
                :pagination="initialPagination"
                >
                <template v-slot:top>
                    <div class="col-2 q-table__title">Actions en cours</div>
                    <q-space />
                    <q-btn fab icon="add" color="accent" @click="onCreate=true" />
                </template>
                <template v-slot:body-cell="props">
                    <q-td :props="props" :class="new Date(props.row.objectifDate)<liveDate?'bg-red-3 text-black':'bg-white text-black'">
                        {{ props.value }}
                    </q-td>
                </template>
                <template v-slot:body-cell-edit="props">
                    <q-td :props="props" :class="new Date(props.row.objectifDate)<liveDate?'bg-red-3 text-black':'bg-white text-black'">
                        <q-btn round icon="edit" @click="edit(props.row.id)" flat dense />
                    </q-td>
                </template>
                <template v-slot:body-cell-done="props">
                    <q-td :props="props" :class="new Date(props.row.objectifDate)<liveDate?'bg-red-3 text-black':'bg-white text-black'">
                        <q-btn round icon="check_box_outline_blank" flat dense @click="close(props.row.id)" />
                    </q-td>
                </template>
            </q-table>
    <q-dialog v-model="onEdit" v-if="todoIdToEdit">
        <EditTodoIncident :todoIdToEdit='todoIdToEdit' @updated="onEdit=false" />
    </q-dialog>
    <q-dialog v-model="onCreate" >
        <CreateTodoIncident @created="onCreate=false" />
    </q-dialog>
</template>
<script setup lang="ts">
import { useTodosStore } from 'src/stores/todos-store';
import { Todo } from 'src/stores/todos-store';
import { onMounted, ref, watch } from 'vue';
import EditTodoIncident from './EditTodoIncident.vue'
import CreateTodoIncident from './CreateTodoIncident.vue';
import { useIncidentStore } from 'src/stores/incident';

const onEdit = ref(false)
const todoIdToEdit = ref<number>()

const onCreate = ref(false)

const todoStore = useTodosStore()
const incidentStore = useIncidentStore()
const columns = [
  {name: 'edit', align: 'left', label: '', field: 'edit'},
  { name: 'objectifDate', label: 'Délais', field: 'objectifDate', align:'left', format: (val:Todo['objectifDate']) => new Date(val).toLocaleString(), sortable: true },
  { name: 'description', align: 'left', label: 'Description', field: (row:Todo) => incidentStore.incident?.is_exercice?row.exerciceDescription:row.description , sortable: false },
  { name: 'comment', align: 'left', label: 'Commentaire', field: 'comments', sortable: false },
  {name: 'done', align:'center', label: 'Fait', field: 'done'}
]

const close = async (id:number)=>{
    await todoStore.closeTodo(id)
}

const edit = (id:number) => {
    onEdit.value = true,
    todoIdToEdit.value = id
}

watch(onEdit,(value)=>{
    if(value == false){
        todoIdToEdit.value = undefined
    }
})

const initialPagination= {
        sortBy: 'objectifDate',
        descending: false,
        rowsPerPage: 10
      }

const liveDate = ref(new Date())

onMounted(()=>{
setInterval(()=>{
    liveDate.value = new Date()
},1000*60)
})
</script>