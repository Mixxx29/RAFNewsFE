
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
                            <button type="button" @click="openEditFormCallback(item.id)" class="edit-button btn btn-primary">Edit</button>
                            <button type="button" @click="deleteItemCallback(item)" class="delete-button btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" @click="openCreateFormCallback" class="create-button btn btn-success">Create New</button>
        </div>
    </div>
</template>

<script>
export default {
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
            default: () => { return ""; }
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
}
</script>

<style scoped>
    .generic-table {
        width: 80%;
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
    }

</style>