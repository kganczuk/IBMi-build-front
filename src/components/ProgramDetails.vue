<template>
  <div>
    <div>{{ program.description }} </div>
    <div v-for="(value, name) in parameters" :key="name">{{ name }}: {{ value }} </div>
  </div>
</template>

<script>
import { servicePrograms } from '../json/setup.json'

export default {
  name: 'ProgramDetails',
  data () {
    return {
      program: servicePrograms.list[this.$route.params.name],
      parameters: servicePrograms.list[this.$route.params.name].parameters
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
