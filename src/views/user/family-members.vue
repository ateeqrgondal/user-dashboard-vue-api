<template >
	<div class="wrapper horizontal-layout-2">
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Family Members</h4>
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
														<button type="button" class="btn btn-primary btn-round btn-sm " data-toggle="modal" data-target="#add_patient">
															<span class="btn-label">
																<i class="fa fa-plus"></i>
															</span>
															Add Family Member
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
													<th scope="col">Ref #</th>
													<th scope="col">first Name</th>
													<th scope="col">last Name</th>
													<th scope="col">actions</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="member in filteredFamilyMembers">
													<td>{{member.id}}</td>
													<td>{{member.referenceId}}</td>
													<td>{{member.firstName}}</td>
													<td>{{member.lastName}}</td>
													<td>
														<div class="btn-group btn-group-page-header ml-auto">
															<button type="button" class="btn btn-light btn-round btn-page-header-dropdown " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																<i class="fa fa-ellipsis-h"></i>
															</button>
															<div class="arrow"></div>
															<div class="dropdown-menu">
																<a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_appointment">Book Appointment</a>
																<a class="dropdown-item" href="#">Send Message</a>
																<a class="dropdown-item" href="#">View Profile</a>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
										<div v-show="filteredFamilyMembers.length == 0" class="alert alert-secondary" role="alert">No familyMembers info found. Please add in the list.</div>

										<div id="myChartLegend"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal To Add Patient -->
		<div v-show="showModal == true" class="modal fade" id="add_patient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">Add Member</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<family-form></family-form>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal To Add Appointment -->
		<div  class="modal fade" id="add_appointment" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template >
<script >
import PortalHeader from "../../components/portal-header";
import FamilyForm from "../../components/family-form";

export default {
  name: "family-members",
  components: { FamilyForm,  PortalHeader },
  data () {
	return {
		filter: '',
		showModal: true,
		patient: {
			firstName: '',
			lastName: '',
			age: '',
			gender: '',
			email: '',
			status: ''
		}
	}
  },
  computed: {
	familyMembers (){
		return this.$store.getters['patient/getFamilyMembers']
	},
	filteredFamilyMembers () {
		return this.familyMembers.filter(member => {
			return member.firstName.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					member.lastName.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					(member.firstName + ' ' + member.lastName).toLowerCase().includes(this.filter.toLowerCase().trim())
		})
	}
  },
  methods: {
	getFamilyMembers() {
		this.$store.dispatch('patient/getFamilyMembers')
	},
  },
	mounted () {
	this.getFamilyMembers()
	$('#family_menu').addClass('active')
	},
}
</script >
<style scoped >
</style >
