
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
                            <button type="button" class="edit-button btn btn-primary">Edit</button>
                            <button type="button" class="delete-button btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="button" class="create-button btn btn-success">Create New</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "GenericTable",
    props: {
        columns: {
            type: Array,
            required: true
        },
        api: {
            type: String,
            required: true
        },
        rowClassCallback: {
            type: Function,
            default: () => { return ""; }
        }
    },
    data() {
        return {
            items: null
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get(this.api).then(items => {
                this.items = items.data;
            }).catch(error => console.log(error.message));
        },
        getRowClass(item) {
            return this.rowClassCallback(item);
        }
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