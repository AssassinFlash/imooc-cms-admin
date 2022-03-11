<!-- 在项目中使用的 icon 图标分为两类，一类是 element-plus，一类是自定义svg图标 -->
<template>
  <!-- 展示 element-plus 图标或者是其他外部资源的图标 -->
  <div
    v-if="isExternal"
    :class="className"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
  />

  <!-- 展示自定义的svg图标 -->
  <svg v-else :class="className" class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { isExternal as external } from '@/utils/validate'
import { defineProps, computed } from 'vue'

const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 类名
  className: {
    type: String,
    default: ''
  }
})

// 判断当前图标是否为外部图标
const isExternal = computed(() => external(props.icon))

// 外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

// 内部图标样式
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-external-icon {
  display: inline-block;
  mask-size: cover !important;
  background-color: currentColor;
}

.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
