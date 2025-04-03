<template>
  <div v-if="!canSort" :class="className">
    {{ title }}
  </div>
  <div v-else :class="['flex items-center space-x-2', className]">
    <Button
      variant="ghost"
      @click="toggleSorting"
      @keydown="handleKeyDown"
      tabindex="0"
      aria-label="Sırala"
    >
      <span>{{ title }}</span>
      <ChevronDown v-if="sortDir === 'desc'" class="ml-2 h-4 w-4" />
      <ChevronUp v-else-if="sortDir === 'asc'" class="ml-2 h-4 w-4" />
      <ArrowDownUp v-else class="ml-2 h-4 w-4" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, ChevronUp, ArrowDownUp } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";
import { computed } from "vue";

const props = defineProps({
  column: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  className: {
    type: [String, Array, Object],
    default: ""
  }
});

// Güvenli bir şekilde column özelliklerine erişim için computed değerleri
const canSort = computed(() => {
  return props.column && typeof props.column.getCanSort === 'function' ? props.column.getCanSort() : false;
});

const sortDir = computed(() => {
  return props.column && typeof props.column.getIsSorted === 'function' ? props.column.getIsSorted() : null;
});

const toggleSorting = () => {
  if (props.column && typeof props.column.getIsSorted === 'function' && typeof props.column.toggleSorting === 'function') {
    const currentSort = props.column.getIsSorted();
    if (currentSort === "asc") {
      props.column.toggleSorting(true); // to desc
    } else {
      props.column.toggleSorting(false); // to asc
    }
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleSorting();
  }
};
</script>
