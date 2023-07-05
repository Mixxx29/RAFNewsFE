<template>
    <div id="home">
        <h1 class="green">{{ title }}</h1>
        <div class="previews scroll-container">
            <NewsPreview v-for="news in allNews" :key="news.id" :news="news" class="scroll-item"/>
        </div>
    </div>
</template>

<script>
import NewsPreview from "@/components/NewsPreview.vue";
import axios from "axios";

export default {
    name: "Home.vue",
    components: {NewsPreview},
    props: {
        api: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            allNews: []
        }
    },
    mounted() {
        axios.get(this.api).then(result => {
            this.allNews = result.data;
        });
    }

}
</script>

<style scoped>

#home {

}

h1 {
    margin-top: 1vh;
}

.previews {
    width: 60vw;
    margin: auto;
}

</style>
