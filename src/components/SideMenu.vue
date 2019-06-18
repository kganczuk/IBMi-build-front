<template>
  <sidebar-menu :menu="menu" />
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          href: '/modules',
          title: 'Modules'
        },
        {
          href: '/servicePrograms',
          title: 'Service Programs'
        },
        {
          href: '/programs',
          title: 'Programs'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
