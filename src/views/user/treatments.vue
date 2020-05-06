<template >
	<div class="wrapper classic-wrapper">
		<portal-header></portal-header>
		<div class="classic-grid">
			<sidebar></sidebar>
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Treatments</h4>
							<div class="btn-group btn-group-page-header ml-auto">
								<button type="button" class="btn btn-light btn-round btn-page-header-dropdown dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i class="fa fa-ellipsis-h"></i>
								</button>
								<div class="dropdown-menu">
									<div class="arrow"></div>
									<a class="dropdown-item" href="#">Book Appointment</a>
									<a class="dropdown-item" href="#">Send Message</a>
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
											<div class="card-title">List of treatments</div>
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
														<button type="button" class="btn btn-primary btn-round btn-sm " data-toggle="modal" data-target="#add_treatment">
															<span class="btn-label">
																<i class="fa fa-plus"></i>
															</span>
															Add Treatment
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="card-body">
										<table class="table table-head-bg-primary ">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">title</th>
													<th scope="col">description</th>
													<th scope="col">price</th>
													<th scope="col">actions</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="treatment in filteredTreatments">
													<td>{{treatment.id}}</td>
													<td>{{treatment.title}}</td>
													<td>
														{{treatment.description.length > 50 ? treatment.description.slice(0,50) + '...' : treatment.description}}
													</td>
													<td>{{treatment.price}}</td>
													<td>
														<div class="btn-group btn-group-page-header ml-auto">
															<button type="button" class="btn btn-light btn-round btn-page-header-dropdown " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																<i class="fa fa-ellipsis-h"></i>
															</button>
															<div class="arrow"></div>
															<div class="dropdown-menu">
																<a class="dropdown-item" href="javascript:;" @click="deleteTreatment(treatment.id)">delete</a>
																<a class="dropdown-item" href="#">view details</a>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
										<div v-show="filteredTreatments.length == 0" class="alert alert-secondary" role="alert">No treatments info found. Please add in the list.</div>
										<div id="myChartLegend"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal To Add Treatment -->
		<div v-show="showModal == true" class="modal fade" id="add_treatment" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">Add Treatment</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<treatment-form></treatment-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template >
<script >

import Sidebar from "../../components/doctor/sidebar";
import PortalHeader from "../../components/doctor/portal-header";
import router from '../../router'
import TreatmentForm from "../../components/treatment-form";

export default {
  name: "treatments",
  components: { TreatmentForm, PortalHeader, Sidebar },
  data () {
	return {
		filter: '',
		showModal: true,
	}
  },
  computed: {
	treatments (){
		return this.$store.getters['doctor/getTreatments']
	},
	filteredTreatments() {
		return this.treatments.filter(treatment => {
			return treatment.title.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					treatment.description.toLowerCase().includes(this.filter.toLowerCase().trim())
		})
	}
  },
  methods: {
	getTreatments() {
		this.$store.dispatch('doctor/getTreatments')
	},
	deleteTreatment (id) {
		this.$store.dispatch('doctor/deleteTreatment', id).then(response => {
			if(response.errors) {
				_.forEach(response.errors, (error => {
					this.$notify.notification('error', error, 'danger')
				}))
			} else if(response.success){
				this.$notify.notification('success', response.message)
				this.$store.dispatch('doctor/getTreatments')
			}
		})
	}
  },
  mounted () {
	this.getTreatments()
	$('#treatmentsmenu').addClass('active')
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
