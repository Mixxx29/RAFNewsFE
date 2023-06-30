<template>
    <div class="form">
        <form @submit.prevent="onSubmit">
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
                <textarea v-else-if="field.type === 'textarea'"
                          v-model="formData[field.name]"
                          class="form-control"
                          rows="5"
                          :placeholder="'Enter ' + field.label">
                </textarea>
                <input v-else
                       class="form-control"
                       :type="field.type"
                       :id="field.name"
                       v-model="formData[field.name]"
                       :placeholder="'Enter ' + field.label"/>
            </div>
            <button type="submit" :class="'btn ' + buttonClass">{{ actionName }}</button>
            <button v-if="cancelCallback" type="button" @click="cancelCallback" class="btn btn-outline-dark">
                Cancel
            </button>
        </form>
    </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
    name: "GenericForm",
    props: {
        item: {
            type: Object,
            default: null
        },
        actionName: {
          type: String,
          required: true
        },
        buttonClass: {
            type: String,
            required: true
        },
        fields: {
            type: Array,
            required: true
        },
        actionCallback: {
            type: Function,
            required: true
        },
        cancelCallback: {
            type: Function
        },
    },
    data() {
        return {
            formData: {}
        }
    },
    methods: {
        onSubmit() {
            this.actionCallback(this.formData);
            if (this.cancelCallback) this.cancelCallback();
        }
    },
    beforeMount() {
        if (this.item != null) this.formData = this.item;
        for (const field of this.fields) {
            if (field.type === "select") {
                for (const option of field.options) {
                    if (this.item != null) {
                        if (option.label === this.formData[field.name]) {
                            this.formData[field.name] = option.value;
                        }
                        continue;
                    }
                    this.formData[field.name] = null;
                }
            }
        }
    },
})
</script>

<style scoped>
    .form {
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