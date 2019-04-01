<template lang="pug">
  .user
    .user__img
      img(:src="user[0].photo" alt="")
    .user__name {{ user[0].name }}

</template>

<script>
export default {
  name: "User",
  computed: {
    user() {
      return this.$store.getters.getUsers
    }
  },
};

</script>

<style lang="postcss">
@import "../../styles/mixins.pcss";
.user{
  display: flex;
  align-items: center;
  &__img{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    img{
      display: block;
      max-width: 100%;
      border-radius: 50%;
    }
  }
  &__name{
    color: white;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    padding-left: 19px;
    @include tablets{
      font-size: 16px;
      padding-left: 10px;
      padding-bottom: 24px;
    }
  }
}
</style>
  