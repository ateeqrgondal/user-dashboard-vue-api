<template >
	<div class="wrapper classic-wrapper">
		<portal-header></portal-header>
		<div class="classic-grid">
			<sidebar></sidebar>
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Weekly Schedule</h4>
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
											<div class="card-title">Weekly schedule at different locations</div>
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
															Add Schedule
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="card-body">
										<table class="table table-head-bg-secondary">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">date</th>
													<th scope="col">start time</th>
													<th scope="col">end time</th>
													<th scope="col">actions</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(schedule,index) in filteredSchedule">
													<td>{{index+1}}</td>
													<td>{{schedule.date}}</td>
													<td>{{schedule.startTime}}</td>
													<td>{{schedule.endTime}}</td>
													<td>
														<div class="btn-group btn-group-page-header ml-auto">
															<button type="button" class="btn btn-light btn-round btn-page-header-dropdown " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																<i class="fa fa-ellipsis-h"></i>
															</button>
															<div class="arrow"></div>
															<div class="dropdown-menu">
																<a class="dropdown-item" href="#" data-toggle="modal" data-target="#slots" @click="getTimeSlots(schedule.id)">View Details</a>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
										<div v-show="filteredSchedule.length == 0" class="alert alert-secondary" role="alert">No schedule info found. Please add in the list.</div>

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
						<h5 class="modal-title" id="exampleModalLongTitle">Add Schedule</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<schedule-form></schedule-form>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal To Add Patient -->
		<div v-show="showModal == true" class="modal fade" id="slots" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" >Time slots</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="card-body">
							<table class="table table-head-bg-secondary">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">start time</th>
										<th scope="col">end time</th>
										<th scope="col">availability</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(slot,index) in timeSlots">
										<td>{{index+1}}</td>
										<td>{{slot.startTime}}</td>
										<td>{{slot.endTime}}</td>
										<td>
											<label class="switch">
												<input type="checkbox" :checked="slot.status == 'available'" :value="slot.id" @change="updateStatus(slot.id)">
												<span class="slider round"></span>
											</label>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
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
import ScheduleForm from "../../components/schedule-form";

export default {
  name: "doctor-schedule",
  components: { ScheduleForm, PortalHeader, Sidebar },
  data () {
	return {
		filter: '',
		scheduleId: 4,
		showModal: true,
		slotButton: []
	}
  },
  computed: {
	isSchedule (){
		return this.$store.getters['doctor/getSchedule'].length !==0
	},
	schedule (){
		return this.$store.getters['doctor/getSchedule']
	},
	timeSlots() {
		if(this.schedule.length) {
			return this.schedule.find(sch => {
				return sch.id == this.scheduleId
			}).slots
		}
	} ,
	filteredSchedule() {
		return this.schedule.filter(schedule => {
			return schedule.date.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					schedule.startTime.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					schedule.endTime.toLowerCase().includes(this.filter.toLowerCase().trim())
		})
	}
  },
	methods: {
	updateStatus(id) {
		this.$store.dispatch('doctor/updateSlotStatus', id).then(response => {
			if(response.errors) {
				_.forEach(response.errors, (error => {
					this.$notify.notification('error', error, 'danger')
				}))
			} else if(response.success){
				// this.$store.dispatch('doctor/getSchedule')
			}
		})
    },
	getTimeSlots (id) {
		this.scheduleId = id
	},
	getSchedule() {
		this.$store.dispatch('doctor/getSchedule')
	},
  },
	mounted () {
	if(!this.isSchedule){
		this.getSchedule()
    }

	$('#schedulemenu').addClass('active')
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

	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: .4s;
		transition: .4s;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: .4s;
		transition: .4s;
	}

	input:checked + .slider {
		background-color: #2196F3;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #2196F3;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style >
