<template lang="pug">
  .user
    .user__img
      img(src="../../admin/assets/img/user.jpg" alt="")
    .user__name {{ $store.state.admin.name }}

</template>

<script>
export default {
  name: "User"
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
  