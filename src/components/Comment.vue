<template>
    <div class="comment">
        <div class="flex">
            <h3 class="author">{{ author }}</h3>
            <p class="date">{{ date }}</p>
        </div>
        <p class="content">- {{ comment.content }}</p>
    </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "Comment",
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            author: "",
            date: ""
        }
    },
    mounted() {
        this.author = this.comment.author.name + " " + this.comment.author.surname;
        this.date = new Date(this.comment.datetime)
            .toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })
    }
})
</script>

<style scoped>

p {
    margin: 0;
}

.comment {
    border: black solid 1px;
    padding: 10px;
    margin-bottom: 20px;
}

.flex {
    vertical-align: middle;
    justify-content: space-between;
}

.content {
    font-style: italic;
}
</style>