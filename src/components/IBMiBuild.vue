<template>
  <b-container class="bv-example-row">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <sidebar-menu :menu="menu" @itemClick="onItemClick" />

    <b-row>
      <b-col>
        <b-form-group label-cols-sm="3" label="Choose type" class="mb-0">
          <b-dropdown :text="name">
            <b-dropdown-item v-for="type in types" :key="type" @click="name=type"> {{ type }} </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table" />

    <b-table id="my-table" 
      :per-page="perPage"
      :current-page="currentPage"
      :items="objects" 
      :fields="fields" 
      :filter="filter"
      @filtered="onFiltered">      
      <template slot="expand" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? '-' : '+'}}
        </b-button>
      </template>

      <!-- <template slot="move" slot-scope="row">
        <b-input-group>
          <b-form-input v-model="number[row.item.program]" placeholder=""></b-form-input>
          <b-input-group-append>
            <b-button @click="move(name, row.item.program, number[row.item.program])">Move</b-button>
          </b-input-group-append>
        </b-input-group>
      </template> -->

      <template slot="row-details" slot-scope="row">
        <b-card>
          <p> Parameters: </p>
          <div v-for="(value, parameter) in row.item.data.parameters" :key="parameter">
            {{ parameter }} : {{ value }}
          </div>
        </b-card>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import setup from '../json/setup.json'

export default {
  name: 'IBMiBuild',
  data () {
    return {
      fields: ['expand', 'program', 'description'], //, 'move'],
      name: 'servicePrograms',
      filter: null,
      types: Object.keys(setup),
      number: [],
      currentPage: 1,
      perPage: 10,
      menu: [
        {
          title: 'Modules',
          value: 'modules',
          visibleOnCollapse: true
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
    },
    rows () {
      return this.objects.length
    }
  },
  methods: {
    table (list) {
      let output = []
      for (const key in list) {
        output.push({program: key, description: list[key].description, data: list[key]})
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
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .program {
    width: 60%;
    text-align: center;
    color: black;
    background: white;
    border: 0;
  }
  .container {
    width: 100%;
    letter-spacing: 1px;
    font-family: sans-serif;
    font-size: .8rem;
  }
  .details {
    width: 100%;
  }
</style>
