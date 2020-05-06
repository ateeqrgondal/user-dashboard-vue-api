<template >
	<div class="wrapper classic-wrapper">
		<portal-header></portal-header>
		<div class="classic-grid">
			<sidebar></sidebar>
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Locations</h4>
							<div class="btn-group btn-group-page-header ml-auto">
								<button type="button" class="btn btn-light btn-round btn-page-header-dropdown dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i class="fa fa-ellipsis-h"></i>
								</button>
								<div class="dropdown-menu">
									<div class="arrow"></div>
									<a class="dropdown-item" href="#">Add New Location</a>
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
											<div class="card-title">Locations where you work</div>
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
														<button type="button" class="btn btn-primary btn-round btn-sm " data-toggle="modal" data-target="#add_location">
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
									<div class="card-body">
										<table class="table table-head-bg-primary">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">name</th>
													<th scope="col">address</th>
													<th scope="col">status</th>
													<th scope="col">actions</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="location in filteredLocations">
													<td>{{location.id}}</td>
													<td>{{location.name}}</td>
													<td>{{location.address}}</td>
													<td>{{location.status}}</td>
													<td>
														<div class="btn-group btn-group-page-header ml-auto">
															<button type="button" class="btn btn-light btn-round btn-page-header-dropdown " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																<i class="fa fa-ellipsis-h"></i>
															</button>
															<div class="arrow"></div>
															<div class="dropdown-menu">
																<a class="dropdown-item" href="#">send message</a>
																<a class="dropdown-item" href="#">view page</a>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
										<div v-show="filteredLocations.length == 0" class="alert alert-secondary" role="alert">No locations info found. Please add in the list.</div>
										<div id="myChartLegend"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="add_location" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">Add Patient</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<select-location></select-location>
					</div>
				</div>
			</div>
		</div>

	</div>
</template >
<script >

import Sidebar from "../../components/doctor/sidebar";
import PortalHeader from "../../components/doctor/portal-header";
import SelectLocation from "../../components/select-location";
import router from '../../router'
export default {
  name: "locations",
  components: { SelectLocation, PortalHeader, Sidebar },
  data () {
	return {
		filter: ''
    }
  },
  computed: {
	locations (){
		return this.$store.getters['doctor/getLocations']
	},
	filteredLocations () {
		return this.locations.filter(location => {
			return location.name.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					location.address.toLowerCase().includes(this.filter.toLowerCase().trim())
		})
	}
  },
  methods: {
	getLocations() {
		this.$store.dispatch('doctor/getLocations')
	}
  },
  mounted () {
	$('#locationsmenu').addClass('active')
	this.getLocations()
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
