<template>
  <transition appear enter-active-class="animated flipInX slower">
    <q-card class="ticket">
      <div class="inner-ticket">
        <div class="flight-way flex items-center">
          <div class="from">
            <div class="flex items-center text-red-5">
              <span class="from-abbr text-uppercase">
                {{ ticket.from.substring(3, -1) }}
              </span>
              <div class="pulse q-mx-md bg-red-5"></div>
            </div>
          </div>
          <div class="line flex flex-center column">
            <q-icon name="las la-fighter-jet" color="secondary" size="26px" />
          </div>
          <div class="to">
            <div class="flex items-center text-teal-5">
              <div class="pulse q-mx-md bg-teal-5"></div>
              <span class="to-abbr text-uppercase">
                {{ ticket.to.substring(3, -1) }}
              </span>
            </div>
          </div>
        </div>

        <div class="secondary-flight-way flex justify-between q-mb-lg">
          <span class="text-uppercase text-grey">{{ ticket.from }}</span>
          <span class="flight-duration text-weight-bold text-primary q-mr-lg"
            >11H 00M</span
          >
          <span class="text-uppercase text-grey">{{ ticket.to }}</span>
        </div>
        <div class="times flex justify-between">
          <div>
            <div class="take_off">{{ ticket.take_off | time }}</div>
            <div class="date">{{ ticket.date | formateDate }}</div>
          </div>
          <div>
            <div class="landing">{{ ticket.landing | time }}</div>
            <div class="flight-no">Flight No : 25</div>
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <div class="inner-ticket">
        <div class="flight-company flex flex-center">
          <img :src="`/${ticket.company}.png`" width="60" alt="" />
        </div>
      </div>
    </q-card>
  </transition>
</template>

<script>
import { date } from "quasar";
export default {
  props: ["ticket"],
  filters: {
    time(val) {
      const subVal = val.substring(0, 2);
      let time;
      +subVal > 12
        ? (time = subVal - 12 + ":00" + " " + "PM")
        : (time = subVal + ":00" + " " + "AM");
      return time;
    },
    formateDate(val) {
      return date.formatDate(val, "DD MMM, YYYY");
    },
  },
  created() {
    const subVal = this.ticket.landing.substring(0, 2);
    let jj;
    +subVal > 12 ? (jj = subVal - 12 + "PM") : (jj = subVal + "AM");
    console.log(jj);
  },
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
.ticket {
  margin-bottom: 30px;
  border-radius: 20px;
  .inner-ticket {
    padding: 20px;
    .flight-way {
      .from,
      .to {
        .from-abbr,
        .to-abbr {
          font-size: 28px;
          font-weight: bold;
        }
        .pulse {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          &::before {
            content: "";
            position: absolute;
            top: -4px;
            left: -4px;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            background-color: inherit;
            opacity: 0.4;
            animation: pulse 1000ms cubic-bezier(0.17, 0.67, 0.83, 0.67)
              infinite;
          }
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            background-color: inherit;
            opacity: 0.1;
          }
        }
      }
      .line {
        position: relative;
        margin: 0 10px;
        flex-grow: 1;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          border-bottom: 2px dashed $grey;
          width: 100%;
        }
      }
    }
    .times {
      .take_off,
      .landing {
        font-size: 25px;
        font-family: none;
        font-weight: bold;
      }
      .date,
      .flight-no {
        color: $grey;
      }
    }
  }
  .blank {
    position: relative;
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
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
