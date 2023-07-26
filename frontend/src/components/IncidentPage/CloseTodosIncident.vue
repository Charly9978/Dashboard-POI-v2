<template>
            <q-table v-if="todoStore.openTodos" title="Actions Cloturées" :rows="todoStore.closedTodos" :columns="columns"
                row-key="name"
                :pagination="initialPagination"
                >
                <template v-slot:body-cell-reactive="props">
                    <q-td :props="props">
                        <q-btn round icon="refresh" @click="reactive(props.row.id)" flat dense />
                    </q-td>
                </template>
            </q-table>
</template>
<script setup lang="ts">
import { useTodosStore } from 'src/stores/todos-store';
import { Todo } from 'src/stores/incident';


const todoStore = useTodosStore()
const columns = [
  { name: 'close_at', label: 'Cloturée à', field: 'close_at', align:'left', format: (val:Todo['close_at']) => new Date(val).toLocaleString(), sortable: true },
  { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: false },
  { name: 'comment', align: 'left', label: 'Commentaire', field: 'comments', sortable: false },
  {name: 'reactive', align: 'center', label: 'Réouvrir', field: 'reactive'}
]

const reactive = async (id:number)=>{
    await todoStore.openTodo(id)
}

const initialPagination= {
        sortBy: 'close_at',
        descending: true,
        rowsPerPage: 10
      }

</script>