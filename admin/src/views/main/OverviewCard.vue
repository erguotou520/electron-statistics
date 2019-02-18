<template>
  <div class="card">
    <div class="title">{{title}}</div>
    <div class="number">{{animatedNumber}}{{unit}}</div>
  </div>
</template>
<script>
import Tween from 'gsap/TweenLite'
export default {
  props: {
    title: String,
    number: Number,
    unit: String,
    fixedCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tweenedNumber: this.number
    }
  },
  computed: {
    animatedNumber () {
      return this.tweenedNumber.toFixed(this.fixedCount)
    }
  },
  watch: {
    number (newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue })
    }
  }
}
</script>
