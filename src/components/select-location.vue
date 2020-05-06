<template >
	<div class="row">
		<div class="col-md-12">
			<div id="basicList" class="card-list">
				<div class="input-icon">
					<input type="text" class="form-control" placeholder="make search ..." v-model="filter">
					<span class="input-icon-addon">
						<i class="fa fa-search"></i>
					</span>
				</div><br>
				<div class="alert alert-info" role="alert" v-show="filteredLocations.length == 0">
					No location information is available.
				</div>
				<div class="list" v-for="location in filteredLocations" v-show="filteredLocations.length">
					<div class="item-list">
						<div class="info-user ml-3">
							<div class="username">{{location.name}}</div>
							<div class="status">{{location.address}}</div>
						</div>
						<button class="btn btn-icon btn-primary btn-round btn-sm " :class="{'is-loading' : loading == true && location.id == currentProcessingId}" @click="linkLocation(location.id)">
							<i class="fa fa-plus"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template >
<script >
import _ from 'lodash'
import locationApi from '../api/location'
export default {
	name: "select-location",
	data () {
		return {
			filter: '',
			loading: false,
			isClicked: false,
			currentProcessingId: ''
		}
    },
	computed: {
		isLocations() {
			return this.$store.getters['location/getLocations'].length
		},
		isLinkedLocations () {
			return this.$store.getters['doctor/getLocations'].length
		},
		locations () {
			return this.$store.getters['location/getLocations']
		},
		linkedLocations () {
			return this.$store.getters['doctor/getLocations']
		},
		filteredLocations() {
			let excludedLinkedLocations = _.differenceBy(this.locations,this.linkedLocations, 'id');
			return excludedLinkedLocations.filter(ins => {
				return ins.name.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					ins.address.toLowerCase().includes(this.filter.toLowerCase().trim())
			})
		}
	},
	watch: {
	},
	methods: {
		linkLocation (id) {
			if(!this.isClicked){
				this.isClicked = true
				this.currentProcessingId = id
				this.loading = true
				locationApi.linkLocation(id).then(response=> {
					if(response.code == 200) {
						this.$store.dispatch('location/getLocations')
						this.$store.dispatch('doctor/getLocations')
						this.$notify.notification('success', response.message)
						this.loading = false
						this.isClicked = false
					}
				})
			}
		}
	},
	mounted () {
		if(!this.isLocations) {
			this.$store.dispatch('location/getLocations')
		}
		if(!this.isLinkedLocations) {
			this.$store.dispatch('doctor/getLocations')
		}
	}
}
</script >
<style scoped >
</style >
