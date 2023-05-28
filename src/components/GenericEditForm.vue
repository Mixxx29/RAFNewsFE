<template>
    <div id="edit-form">
        <form @submit.prevent="onSubmit(formData)">
            <div v-for="field in fields" :key="field.name">
                <label :for="field.name">{{ field.label }}</label>
                <select v-if="field.type === 'select'"
                        :id="field.name"
                        v-model="formData[field.name]"
                        class="form-select">
                    <option :value="null" disabled>
                        {{ "Select " + field.label }}
                    </option>
                    <option v-for="option in field.options" :key="option.field" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
                <input v-else
                       class="form-control"
                       :type="field.type"
                       :id="field.name"
                       v-model="formData[field.name]"
                       :placeholder="'Enter ' + field.label"/>
            </div>
            <button type="submit" class="btn btn-success">Save</button>
            <button type="button" @click="cancelCallback" class="btn btn-outline-dark">Cancel</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "GenericEditForm",
    props: {
        fields: {
            type: Array,
            required: true
        },
        editDataCallback: {
            type: Function,
            required: true
        },
        cancelCallback: {
            type: Function,
            required: true
        },
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            formData: {}
        }
    },
    methods: {
        onSubmit(data) {
            this.editDataCallback(data);
            this.cancelCallback();
        }
    },
    mounted() {
        this.formData = this.item;
        for (const field of this.fields) {
            if (field.type === "select") {
                for (const option of field.options) {
                    if (option.label === this.formData[field.name]) {
                        this.formData[field.name] = option.value;
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
    #edit-form {
        width: 30%;
        margin: auto;
    }

    label {
        margin: 20px 0 5px 0;
        font-weight: bold;
    }

    button {
        margin: 20px 10px;
    }
</style>