<template>
  <transition appear enter-active-class="animated flipInX slower">
    <q-card class="flight-card flex justify-between">
      <div class="company-logo flex flex-center">
        <img :src="`/${airflight.company}.png`" alt="" />
      </div>
      <div class="flight-from flex column items-center">
        <span class="text-weight-medium city text-uppercase">{{
          airflight.from
        }}</span>
        <span class="text-grey text-subtitle1 q-mt-sm">{{
          airflight.take_off
        }}</span>
      </div>
      <div class="flight-details flex items-center column">
        <span class="company-name text-uppercase">
          {{ airflight.company }}
        </span>
        <span class="flight-duration text-weight-bold text-primary"
          >11H 00M</span
        >
        <span class="flight-date text-uppercase text-secondary">{{
          airflight.date.replaceAll("/", "-")
        }}</span>
      </div>
      <div class="flight-to flex column items-center">
        <span class="text-weight-medium city text-uppercase">{{
          airflight.to
        }}</span>
        <span class="text-grey text-subtitle1 q-mt-sm">{{
          airflight.landing
        }}</span>
      </div>
      <div class="price flex flex-center column">
        <span class="text-weight-bolder">${{ airflight.price }}</span>
        <slot></slot>
      </div>
    </q-card>
  </transition>
</template>

<script>
export default {
  props: ["airflight"],
  computed: {},
};
</script>

<style lang="scss">
@mixin pseudo-circle {
  content: "";
  position: absolute;
  bottom: -12.5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #121212;
  z-index: 1;
}
.flight-card {
  border-radius: 20px;
  position: relative;
  padding: 40px 20px;
  &:not(:last-child) {
    border-bottom: 3px dashed $primary;
    &::before {
      @include pseudo-circle;
      left: -12.5px;
    }
    &::after {
      @include pseudo-circle;
      right: -12.5px;
    }
  }
  > div {
    width: 20%;
  }
  .company-logo {
    img {
      width: 90px;
      height: auto;
    }
  }
  .city {
    font-size: 20px;
  }
  .flight-details {
    .company-name {
      font-size: 10px;
    }
    .flight-duration {
      font-size: 15px;
    }
    .flight-stop {
      font-size: 17px;
    }
  }
}
</style>
