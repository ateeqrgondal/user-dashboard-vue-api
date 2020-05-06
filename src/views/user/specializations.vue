<template >
	<div class="wrapper classic-wrapper">
		<portal-header></portal-header>
		<div class="classic-grid">
			<sidebar></sidebar>
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Specializations</h4>
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
											<div class="card-title">Your Specializations</div>
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
													<th scope="col">description</th>
													<th scope="col">action</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="spec in filteredSpecializations">
													<td>{{spec.id}}</td>
													<td>{{spec.title}}</td>
													<td>{{spec.description}}</td>
													<td><button class="btn btn-secondary btn-sm btn-round" :class="{'is-loading' : loading == true && spec.id == currentProcessingId}" @click="unlinkSpecialization(spec.id)">UNLINK</button></td>
												</tr>
											</tbody>
										</table>
										<div v-show="filteredSpecializations.length == 0" class="alert alert-secondary" role="alert">No specialization info found. Please add in the list.</div>
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
						<h5 class="modal-title" id="exampleModalLongTitle">Add Specializations</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<select-specialization></select-specialization>
					</div>
				</div>
			</div>
		</div>
	</div>
</template >
<script >

import Sidebar from "../../components/doctor/sidebar";
import PortalHeader from "../../components/doctor/portal-header";
import specializationApi from '../../api/specialization'
import SelectSpecialization from "../../components/select-specialization";
import router from "../../router";
export default {
  name: "specializations",
  components: { SelectSpecialization, PortalHeader, Sidebar },
  data () {
	return {
		filter: '',
		loading: false,
		isClicked: false,
		currentProcessingId: ''
	}
  },
  computed: {
	specializations (){
		return this.$store.getters['doctor/getSpecializations']
	},
	filteredSpecializations() {
	return this.specializations.filter(ins => {
		return ins.title.toLowerCase().includes(this.filter.toLowerCase().trim())
		})
	}
  },
  methods: {
	getSpecializations() {
		this.$store.dispatch('doctor/getSpecializations')
	},
	unlinkSpecialization (id) {
		if(!this.isClicked){
			this.isClicked = true
			this.currentProcessingId = id
			this.loading = true
			specializationApi.unlinkSpecialization(id).then(response=> {
			if(response.code == 200) {
				this.$store.dispatch('doctor/getSpecializations')
				this.$notify.notification('success', response.message)
				this.loading = false
				this.isClicked = false
			}
			})
		}
	}

  },
  mounted () {
	this.getSpecializations()
    $('#specializationsmenu').addClass('active')
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
