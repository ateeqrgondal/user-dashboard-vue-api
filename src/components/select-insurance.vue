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
				<div class="alert alert-info" role="alert" v-show="filteredInsurances.length == 0">
					No insurance information is available.
				</div>
				<div class="list" v-for="insurance in filteredInsurances" v-show="filteredInsurances.length">
					<div class="item-list">
						<div class="info-user ml-3">
							<div class="username">{{insurance.title}}</div>
							<div class="status">{{insurance.website}}</div>
						</div>
						<button class="btn btn-icon btn-primary btn-round btn-sm " :class="{'is-loading' : loading == true && insurance.id == currentProcessingId}" @click="linkInsurance(insurance.id)">
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
import insuranceApi from '../api/insurance'
export default {
	name: "select-insurance",
	data () {
		return {
			filter: '',
			loading: false,
			isClicked: false,
			currentProcessingId: ''
		}
    },
	computed: {
		isInsurances () {
			return this.$store.getters['insurance/getInsurances'].length
		},
		isLinkedInsurances () {
			return this.$store.getters['insurance/getInsurances'].length
		},
		insurances () {
			return this.$store.getters['insurance/getInsurances']
		},
		linkedInsurances () {
			return this.$store.getters['doctor/getLinkedInsurances']
		},
		filteredInsurances() {
			let excludedLinkedInsurances = _.differenceWith(this.insurances,this.linkedInsurances, _.isEqual);
			return excludedLinkedInsurances.filter(ins => {
				return ins.title.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					ins.company.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					ins.website.toLowerCase().includes(this.filter.toLowerCase().trim())
			})
		}
	},
	watch: {
	},
	methods: {
		linkInsurance (id) {
			if(!this.isClicked){
				this.isClicked = true
				this.currentProcessingId = id
				this.loading = true
				insuranceApi.linkInsurance(id).then(response=> {
					if(response.code == 200) {
						this.$store.dispatch('insurance/getInsurances')
						this.$store.dispatch('doctor/getInsurances')
						this.$notify.notification('success', response.message)
						this.loading = false
						this.isClicked = false
					}
				})
			}
		}
	},
	mounted () {
		if(!this.isInsurances) {
			this.$store.dispatch('insurance/getInsurances')
		}
		if(!this.isLinkedInsurances) {
			this.$store.dispatch('doctor/getInsurances')
		}
	}
}
</script >
<style scoped >
</style >
