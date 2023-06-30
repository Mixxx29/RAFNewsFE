<template>
  <div class="pageable justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <span v-if="index === 1"
                aria-label="First page"
                class="page-link disabled"
          >
            First
          </span>
          <span v-else
                aria-label="Previous"
                class="page-link"
                @click="selectPage(1);"
          >
            First
          </span>
        </li>
        <li class="page-item">
          <span v-if="index === 1"
                aria-label="Previous"
                class="page-link disabled"
          >
            &laquo;
          </span>
          <span v-else
                aria-label="Previous"
                class="page-link"
                @click="selectPage(index - 1);"
          >
            &laquo;
          </span>
        </li>
        <li v-for="i in getDisplayedPages" :key="i" class="page-item">
          <span v-if="i === index" class="page-link selected" @click="selectPage(i)">{{ i }}</span>
          <span v-else class="page-link" @click="selectPage(i)">{{ i }}</span>
        </li>
        <li class="page-item">
          <span v-if="index === lastPage"
                aria-label="Previous"
                class="page-link disabled"
          >
            &raquo;
          </span>
          <span v-else
                aria-label="Next"
                class="page-link"
                @click="selectPage(index + 1);"
          >
            &raquo;
          </span>
        </li>
        <li class="page-item">
          <span v-if="index === lastPage"
                aria-label="Previous"
                class="page-link disabled"
          >
            Last
          </span>
          <span v-else
                aria-label="Next"
                class="page-link"
                @click="selectPage(lastPage);"
          >
            Last
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Pagination",
  data() {
    return {
      index: 1,
      displayedPages: [],
      displayedPagesMaxSize: 5.0
    }
  },
  props: {
    pageIndex: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true
    },
    onClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    selectPage(index) {
      this.index = index;
      this.onClick(this.index);
    }
  },
  mounted() {
    this.index = this.pageIndex;
    this.onClick(this.index);
  },
  computed: {
    getDisplayedPages() {
      let start = this.index - Math.floor(this.displayedPagesMaxSize / 2);
      start = start < 1 ? 1 : start;

      let end = start + this.displayedPagesMaxSize - 1;
      if (end > this.lastPage) {
        end = this.lastPage;
        start = end - this.displayedPagesMaxSize + 1;
        start = start < 1 ? 1 : start;
      }

      let numbers = [];
      for (let i = start; i <= end; i++) numbers.push(i);
      return numbers;
    },
  }
})
</script>

<style scoped>
.pageable {
  margin-top: 5vh;
}

.page-link {
  cursor: pointer;
}

.page-link {
  margin: 1px;
}

.selected {
  border: solid 1px cornflowerblue;
}
</style>