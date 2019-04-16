<template lang="pug"> 
  div.tooltip(:class="tooltip.type" v-if="tooltip.show")
    .tooltip__text {{tooltip.text}}
    button.tooltip__close(@click="tooltip.show = false")
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState('tooltips', {tooltip: state => state.tooltip})
  },
  methods: {
    ...mapActions('tooltips', ["hideTooltip"])
  }
}

</script>
<style lang="postcss" scoped>
.tooltip{
  position: fixed;
  bottom: 0;
  width: 391px;
  height: 75px;  
  transform: translateX(-50%);
  left: 50%;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 30px;
  z-index: 1000;
  background-color: #b13333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;
  &.error{
    background-color: #b13333;
  }
  &.success{
    background-color: #4bb133;
  }
  &__close{
    width: 20px;
    height: 20px;
    display: block;
    position: relative;
    background-color: transparent;
    border: none;
    padding: 0;
    &:before,
    &:after{
      content: '';
      display: block;
      position: absolute;
      top: 8px;
      width: 25px;
      height: 2px;      
      background-color: white;
      left: 0;
    }
    &:before{
      transform: rotate(45deg);
    }
    &:after{
      transform: rotate(-45deg);
    }
    &:hover{
      opacity: 0.6;
    }
  }
}
</style>