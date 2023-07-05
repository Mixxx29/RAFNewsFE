<template>
    <div class="generic-table">
        <div v-if="items == null" id="spinner" class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else>
            <table class="table">
                <thead class="bg-dark">
                <tr>
                    <th v-for="column in columns" :key="column.field">
                        {{ column.label }}
                    </th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items"
                    :key="item.id"
                    :class="getRowClass(item)">
                    <td v-for="column in columns" :key="column.field">
                        {{ item[column.field] }}
                    </td>
                    <td>
                        <button class="edit-button btn btn-primary" type="button"
                                @click="openEditFormCallback(item.id)">Edit
                        </button>
                        <button class="delete-button btn btn-danger" type="button" @click="deleteItemCallback(item)">
                            Delete
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <button class="create-button btn btn-success" type="button" @click="openCreateFormCallback">Create New
            </button>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "GenericTable",
    props: {
        columns: {
            type: Array,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        rowClassCallback: {
            type: Function,
            default: () => {
                return "";
            }
        },
        openCreateFormCallback: {
            type: Function,
            required: true
        },
        openEditFormCallback: {
            type: Function,
            required: true
        },
        deleteItemCallback: {
            type: Function,
            required: true
        }
    },
    methods: {
        getRowClass(item) {
            return this.rowClassCallback(item);
        },
    }
})
</script>

<style scoped>
.generic-table {
    width: 80vw;
    margin: auto;
}

#spinner {
    margin-top: 5vh;
    scale: 2;
}

tr {
    align-items: center;
}

th {
    color: whitesmoke;
    border: whitesmoke solid 1px;
}

td {
    border: black 1px solid;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 15vw;
}

</style>