<template>
  <b-container>
    <sidebar-menu ref="sidebar" :menu="menu" @itemClick="onItemClick" @click="collapseSidebar"/>

    <b-col class="filtering">
      <b-input-group>
        <b-form-input v-model="newFilter" @change="setFilter" @input="setFilter" placeholder="Type to Search"></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!newFilter" @click="newFilter=''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-col>
    

    <b-table 
      id="my-table" 
      ref="myTable"
      hover
      selectable
      responsive 
      flex 
      striped 
      bordered
      :per-page="perPage"
      :current-page="currentPage"
      :items="objects" 
      :fields="fields" 
      :filter="filter"
      @filtered="onFiltered"
      @row-clicked="expandAdditionalInfo"
      :tbody-transition-props="transProps">  

      <template slot="row-details" slot-scope="row">
        <b-card>
          <p> Parameters: </p>
          <div v-for="(value, parameter) in row.item.data.parameters" :key="parameter">
            {{ parameter }} : {{ value }}
          </div>
        </b-card>
      </template>
    </b-table>

    <b-pagination
      v-if="rows/perPage>1"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table" 
      align="center"/>
  </b-container>
</template>

<script>
import setup from '../json/setup.json'

export default {
  name: 'IBMiBuild',
  data () {
    return {
      fields: ['program', 'description'], //, 'move'],
      name: 'servicePrograms',
      filter: null,
      newFilter: null, 
      number: [],
      currentPage: 1,
      perPage: 12,
      rows: 0,
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      menu: [
        {
          title: 'Files',
          child: [
            {
              title: 'Printer Files',
              value: 'printerFiles'
            },
            {
              title: 'Display Files',
              value: 'displayFiles'
            }
          ]
        },
        {
          title: 'Programs',
          child: [
            {
              title: 'Modules',
              value: 'modules'
            },
            {
              title: 'Service Programs',
              value: 'servicePrograms'
            },
            {
              title: 'Programs',
              value: 'programs'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.rows = this.objects.length
  },
  computed: {
    objects () {
      return this.table(setup[this.name].list)
    }
  },
  methods: {
    uncollapseSidebar () {
      if (!this.$refs.sidebar.isCollapsed) {
        this.$refs.sidebar.toggleCollapse()  
      }
    },
    collapseSidebar () {
      this.$refs.sidebar.toggleCollapse()
    },
    table (list) {
      let output = []
      for (const key in list) {
        output.push({program: key, description: list[key].description, data: list[key], _showDetails: false})
      }
      return output
    },
    move (list, name, index) {
      let tempList = this.setup[list]
      tempList.move(name, index)
    },
    onFiltered (filteredItems) {
      this.currentPage = 1
      this.rows = filteredItems.length
    },
    onItemClick (event, item) {
      if (item.value) {
        this.name = item.value
        this.rows = this.objects.length
      }
    },
    expandAdditionalInfo (row) {
      row._showDetails = !row._showDetails
    },
    setFilter () {
      setTimeout( () => {
        this.filter = this.newFilter 
      }, 500)
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
b-pagination {
  margin: auto;
}
.filtering {
  max-width: 50%;
  float: right;
  padding: 50px
}
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

</style>
