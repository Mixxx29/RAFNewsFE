import {ref, watch} from 'vue';

const token = ref(localStorage.getItem('token') || '');
const username = ref(localStorage.getItem('username') || '');

const TYPE = [
    "ADMIN",
    "CONTENT_CREATOR"
]

export {
    token,
    username,
    TYPE
}

watch(token, (newValue) => {
    localStorage.setItem('token', newValue);
})

watch(username, (newValue) => {
    localStorage.setItem('username', newValue);
})
