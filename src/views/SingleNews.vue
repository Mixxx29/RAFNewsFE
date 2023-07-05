<template>
    <div class="single-news">
        <div class="flex">
            <h1 class="title">{{ news.title }}</h1>
            <p class="category">{{ news.category.name }}</p>
        </div>
        <h3 class="author">by {{ author }}</h3>
        <div class="flex">
            <p class="created_date">{{ date }}</p>
            <p class="visits">Visited: {{ news.visits }}</p>
        </div>
        <hr/>
        <div class="body flex">
            <p class="content">{{ news.content }}</p>
            <div class="right">
                <h2 class="comments-title">Comments</h2>
                <ul class="comments">
                    <li v-for="comment in comments" :key="comment.id">
                        <Comment :comment="comment"/>
                    </li>
                </ul>
                <GenericForm
                    :action-callback="postComment"
                    :fields="fields"
                    action-name="Comment"
                    button-class="btn-success"
                    class="comment-form"/>
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import Comment from "@/components/Comment.vue";
import GenericForm from "@/components/GenericForm.vue";
import jwtDecode from "jwt-decode";
import {token} from "@/global";
import api from "@/api";

export default defineComponent({
    name: "SingleNews",
    components: {GenericForm, Comment},
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            news: {},
            comments: [],
            author: "",
            date: "",
            maxLength: 950,
            fields: [
                {name: "content", label: "Your Comment", type: "textarea"},
            ]
        }
    },
    methods: {
        loadComments() {
            api.get(`/comments/news/${this.news.id}`)
                .then(result => {
                    this.comments = result.data;
                })
        },
        postComment(data) {
            const payload = jwtDecode(token.value)
            data.datetime = new Date();
            data.authorId = payload.id;
            data.newsId = this.news.id;
            console.log(data)
            api.post(`/comments`, data)
                .then(() => {
                    this.loadComments();
                })
        }
    },
    beforeMount() {
        api.get(`/news/title/${this.title}`)
            .then(result => {
                this.news = result.data;
                this.author = this.news.author.name + " " + this.news.author.surname;
                this.date = new Date(this.news.datetime)
                    .toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })

                this.loadComments();
            })
    }
})
</script>

<style scoped>
.single-news {
    width: 80vw;
    margin: 5vh auto;
    text-align: left;
}

h1 {
    font-weight: bold;
}

li {
    list-style: none;
}

.category {
    padding: 5px 10px;
    margin: 10px;
    background: hsla(160, 100%, 37%, 1);
    color: white;
}

.flex {
    vertical-align: middle;
}

.content {
    width: 50vw;
    font-size: 18px;
}

.right {
    width: 40vw;
    padding: 0 0 0 2vw;
}

.comments {
    width: 100%;
    padding: 0;
}

.comment-form {
    width: 100%;
}

.comments-title {
    text-align: center;
}
</style>