<template>
  <div class="text-center">
    <h1>Beba água! <v-img contain height='100px'
    width='150px' src='../assets/agua.svg' alt='' />
    </h1>
    <p>Utilize nossa plataforma para rastrear seu consumo de água e seja mais hidratado! </p>
  </div>
</template>
<script>
export default {
  computed: {
    iconeAgua: function () {
      return 'height: 100px width: 150px'
    }
  }
}
</script>
