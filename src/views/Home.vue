<template>
  <div class="text-center">
    <h1>Beba água! <b-img v-bind='iconeAgua' src='../assets/agua.svg' alt='' />
    </h1>
    <p>Utilize nossa plataforma para rastrear seu consumo de água e seja mais hidratado! </p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      iconeAgua: { height: '70px', width: '70px' }
    }
  }
}
</script>
