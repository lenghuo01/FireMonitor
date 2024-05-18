<template>
  <div style="height: 100%;width: 100%;">
    <!-- Your Vue component template -->
    <div id="alertOverlay">
      <div>nkjn</div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
export default {
  name: 'FullscreenRedAlert',
  setup() {
   onMounted(()=>{
    setAlertState(true)
   })
   function setAlertState(active) {
      var alertOverlay = document.getElementById("alertOverlay");
      if (active) {
        alertOverlay.classList.add("alert-active");
      } else {
        alertOverlay.classList.remove("alert-active");
      }
    }
    
    return {

    }
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}


#alertOverlay::before,
#alertOverlay::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
}

#alertOverlay>div::before,
#alertOverlay>div::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100px;
}

#alertOverlay::before {
  background: linear-gradient(to right, red, transparent);
  top: 0;
  left: 0;
  transform: rotate(0deg);
}

#alertOverlay::after {
  background: linear-gradient(to left, red, transparent);
  top: 0%;
  left: 100%;
  transform: rotate(0deg) translate(calc(-1 * 100px), 0px);
}

#alertOverlay>div::before {
  background: linear-gradient(to top, red, transparent);
  top: 0;
  left: 0;
  transform: rotate(180deg);
}

#alertOverlay>div::after {
  background: linear-gradient(to top, red, transparent);
  top: 100%;
  left: 0;
  transform: rotate(0deg) translate(0px, calc(-1 * 100px));
}

#alertOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  opacity: 1;
  transition: opacity 0.5s;
  pointer-events: none;
  z-index: 1;
}

.alert-active {
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}
</style>
