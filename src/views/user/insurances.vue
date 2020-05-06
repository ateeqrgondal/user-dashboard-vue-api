<template >
	<div class="wrapper classic-wrapper">
		<portal-header></portal-header>
		<div class="classic-grid">
			<sidebar></sidebar>
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Insurances</h4>
							<div class="btn-group btn-group-page-header ml-auto">
								<button type="button" class="btn btn-light btn-round btn-page-header-dropdown dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i class="fa fa-ellipsis-h"></i>
								</button>
								<div class="dropdown-menu">
									<div class="arrow"></div>
									<a class="dropdown-item" href="#">Add New Insurance</a>
									<a class="dropdown-item" href="#">Another action</a>
									<a class="dropdown-item" href="#">Something else here</a>
									<div class="dropdown-divider"></div>
									<a class="dropdown-item" href="#">Separated link</a>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="card">
									<div class="card-header">
										<div class="card-head-row">
											<div class="card-title">Insurances that you are accepting</div>
											<div class="card-tools">
												<div class="form-inline">
													<div class="form-group ">
														<div class="input-icon">
															<input type="text" class="form-control" placeholder="make search ..." v-model="filter">
															<span class="input-icon-addon">
															<i class="fa fa-search"></i>
														</span>
														</div>
													</div>
													<div class="form-group">
														<button type="button" class="btn btn-primary btn-round btn-sm " data-toggle="modal" data-target="#add_insurance">
															<span class="btn-label">
																<i class="fa fa-plus"></i>
															</span>
															Add New
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="card-body" >
										<table class="table table-head-bg-primary">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">title</th>
													<th scope="col">company</th>
													<th scope="col">website</th>
													<th scope="col">email</th>
													<th scope="col">action</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(insurance, index) in filteredInsurances">
													<td>{{index+1}}</td>
													<td>{{insurance.title}}</td>
													<td>{{insurance.company}}</td>
													<td>{{insurance.website}}</td>
													<td>{{insurance.email}}</td>
													<td><button class="btn btn-secondary btn-sm btn-round" :class="{'is-loading' : loading == true && insurance.id == currentProcessingId}" @click="unlinkInsurance(insurance.id)">UNLINK</button></td>
												</tr>
											</tbody>
										</table>
										<div v-show="filteredInsurances.length == 0" class="alert alert-secondary" role="alert">No insurance info found. Please add in the list.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="add_insurance" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">Add Patient</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<select-insurance></select-insurance>
					</div>
				</div>
			</div>
		</div>

	</div>
</template >
<script >

import Sidebar from "../../components/doctor/sidebar";
import PortalHeader from "../../components/doctor/portal-header";
import SelectInsurance from "../../components/select-insurance";
import insuranceApi from '../../api/insurance'
import router from '../../router'
export default {
  name: "insurances",
  components: { SelectInsurance, PortalHeader, Sidebar },
  data () {
	return {
		filter: '',
		loading: false,
		isClicked: false,
		currentProcessingId: ''
	}
  },
  computed: {
	insurances (){
		return this.$store.getters['doctor/getLinkedInsurances']
	},
	filteredInsurances() {
	return this.insurances.filter(ins => {
		return ins.title.toLowerCase().includes(this.filter.toLowerCase().trim()) |
			ins.company.toLowerCase().includes(this.filter.toLowerCase().trim()) |
			ins.website.toLowerCase().includes(this.filter.toLowerCase().trim())
		})
	}
  },
  methods: {
	getInsurances() {
		this.$store.dispatch('doctor/getInsurances')
	},
	unlinkInsurance (id) {
		if(!this.isClicked){
			this.isClicked = true
			this.currentProcessingId = id
			this.loading = true
			insuranceApi.unlinkInsurance(id).then(response=> {
			if(response.code == 200) {
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
	this.getInsurances()
    $('#insurancemenu').addClass('active')
  },
	beforeRouteEnter(to, from, next) {
		let role = localStorage.getItem('role1')
		if(to.meta.role == role) {
			next()
		} else {
			router.push('/')
		}
	}
}
</script >
<style scoped >
</style >
