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
				<div class="alert alert-info" role="alert" v-show="filteredSpecializations.length == 0">
					No specialization information is available.
				</div>
				<div class="list" v-for="spec in filteredSpecializations" v-show="filteredSpecializations.length">
					<div class="item-list">
						<div class="info-user ml-3">
							<div class="username">{{spec.title}}</div>
						</div>
						<button class="btn btn-icon btn-primary btn-round btn-sm " :class="{'is-loading' : loading == true && spec.id == currentProcessingId}" @click="linkSpecialization(spec.id)">
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
import specializationApi from '../api/specialization'
export default {
	name: "select-specialization",
	data () {
		return {
			filter: '',
			loading: false,
			isClicked: false,
			currentProcessingId: ''
		}
    },
	computed: {
		isSpecializations () {
			return this.$store.getters['specialization/getSpecializations'].length
		},
		isLinkedSpecializations () {
			return this.$store.getters['doctor/getSpecializations'].length
		},
		specializations () {
			return this.$store.getters['specialization/getSpecializations']
		},
		linkedSpecializations () {
			return this.$store.getters['doctor/getSpecializations']
		},
		filteredSpecializations() {
			let excludedLinkedSpecializations = _.differenceWith(this.specializations,this.linkedSpecializations, _.isEqual);
			return excludedLinkedSpecializations.filter(ins => {
				return ins.title.toLowerCase().includes(this.filter.toLowerCase().trim())
			})
		}
	},
	watch: {
	},
	methods: {
		linkSpecialization (id) {
			if(!this.isClicked){
				this.isClicked = true
				this.currentProcessingId = id
				this.loading = true
				specializationApi.linkSpecialization(id).then(response=> {
					if(response.code == 200) {
						this.$store.dispatch('specialization/getSpecializations')
						this.$store.dispatch('doctor/getSpecializations')
						this.$notify.notification('success', response.message)
						this.loading = false
						this.isClicked = false
						this.filter = ''
					}
				})
			}
		}
	},
	mounted () {
		if(!this.isSpecializations) {
			this.$store.dispatch('specialization/getSpecializations')
		}
		if(!this.isLinkedSpecializations) {
			this.$store.dispatch('doctor/getSpecializations')
		}
	}
}
</script >
<style scoped >
</style >
