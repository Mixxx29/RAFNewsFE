<template>
    <div class="news-preview">
        <div class="flex">
            <h2 class="title">{{ news.title }}</h2>
            <p class="category">{{ news.category.name }}</p>
        </div>
        <h3 class="author">by {{ author }}</h3>
        <div class="flex">
            <p class="created_date">{{ date }}</p>
            <p class="visits">Visited: {{ news.visits }}</p>

        </div>

        <hr/>
        <p class="content">{{ content }}</p>
        <p class="read-more" @click="readMore">Read more</p>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import router from "@/router";

export default defineComponent({
    name: "NewsPreview",
    props: {
        news: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            author: "",
            content: "",
            date: "",
            maxLength: 950
        }
    },
    mounted() {
        this.author = this.news.author.name + " " + this.news.author.surname;
        this.date = new Date(this.news.datetime)
            .toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })
        this.content = this.news.content;
        if (this.content.length > this.maxLength) {
            this.content = this.content.substring(0, this.maxLength) + "..."
        }
    },
    methods: {
        readMore() {
            router.push(`/news/${this.news.title}`);
        }
    }
})
</script>

<style scoped>
.news-preview {
    margin: 5vh;
    padding: 3vh;
    border: #2c3e50 solid 1px;
    box-shadow: #2c3e50 3px 3px 10px;
    text-align: left;
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.news-preview:hover {
    transform: scale(1.02);
}

* {
    word-wrap: break-word;
}

p {
    margin: 0;
}

h2 {
    font-weight: bold;
}

.category {
    padding: 5px 10px;
    margin: 5px;
    background: hsla(160, 100%, 37%, 1);
    color: white;
}

.read-more {
    color: hsla(160, 100%, 37%, 1);
    text-decoration: underline;
    text-align: right;
    margin-top: 10px;
    cursor: pointer;
}
</style>