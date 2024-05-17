import type { ExtractPropTypes, ToRefs } from 'vue';

export const paginationProps = {
  pageTotal: {
    type: Number,
    required: true,
  },
  pagerCount: {
    type: Number,
    default: 5,
  },
} as const;

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const usePagination = (
  props: ToRefs<PaginationProps>,
  initializationPage: number = 1,
) => {
  debugger;
  const { pageTotal, pagerCount } = props;
  const current = ref(initializationPage);
  const halfTotal = computed(() => (pagerCount.value - 1) / 2)
  const pageCount = computed(() => pageTotal.value)
  const showPrevMore = computed(() => pageCount.value > pagerCount.value && current.value > pagerCount.value - halfTotal.value)
  const showNextMore = computed(() => pageCount.value > pagerCount.value && current.value < pageCount.value - halfTotal.value)
  const renderEl = computed(() => {
    const array = [];
    if (showPrevMore.value && !showNextMore.value) {
      const startPage = pageCount.value - (pagerCount.value - 2)
      for (let i = startPage; i < pageCount.value; i++) {
        array.push(i)
      }
    } else if (!showPrevMore.value && showNextMore.value) {
      for (let i = 2; i < pagerCount.value + 2; i++) {
        array.push(i)
      }
    } else if (showPrevMore.value && showNextMore.value) {
      const offset = Math.floor(pagerCount.value / 2) - 1
      for (let i = current.value - offset; i <= (current.value + offset * 2) + 1; i++) {
        array.push(i)
      }
    } else {
      for (let i = 2; i < pageCount.value; i++) {
        array.push(i)
      }
    }
    return array
  })

  const prevMore = () => {
    current.value = Math.max(current.value - pagerCount.value, 1)
  };
  const nextMore = () => {
    current.value = Math.min(pageTotal.value, current.value + pagerCount.value);
  };

  const jump = (to: number) => {
    current.value = to;
  }
  return { prevMore, nextMore, jump, current, renderEl, showPrevMore, showNextMore }
}
