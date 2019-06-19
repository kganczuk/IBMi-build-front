<template>
  <b-container class="bv-example-row">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <sidebar-menu :menu="menu" :collapsed=true theme="white-theme" @itemClick="onItemClick" />

    
      <b-col width="10px">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="newFilter" @input="setFilter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!newFilter" @click="newFilter=''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    

    <b-table id="my-table" 
      hover
      responsive 
      flex 
      striped 
      :per-page="perPage"
      :current-page="currentPage"
      :items="objects" 
      :fields="fields" 
      :filter="filter"
      @filtered="onFiltered"
      @row-clicked="expandAdditionalInfo">  

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
      types: Object.keys(setup),
      number: [],
      currentPage: 1,
      perPage: 10,
      rows: 0,
      clicked: 0,
      menu: [
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
      this.name = item.value
    },
    expandAdditionalInfo (row) {
      row._showDetails = !row._showDetails
    },
    setFilter () {
      setTimeout(function () {
        this.filter = this.newFilter
      }.bind(this), 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
b-pagination {
  margin: auto
}
</style>
