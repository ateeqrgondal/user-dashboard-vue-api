<template >
	<div class="wrapper horizontal-layout-2" >
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Cancelled Appointments</h4>
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
											<div class="card-title">Cancelled Appointments List <span class="badge badge-secondary">{{appointmentStats.rejected}}</span></div>
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
														<button type="button" class="btn btn-secondary btn-round btn-sm " data-toggle="collapse" data-target="#daterange" aria-expanded="false" aria-controls="collapseExample">
															<span class="btn-label">
																<i class="fa fa-arrow-down"></i>
															</span>
															date range
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="card-header collapse" id="daterange">
										<div class="card-head-row">
													<div class="col-md-5">
														<div class="form-group" :class="{'has-error has-feedback' : errors.has('start date')}">
															<div class="input-group">
																<input type="text" class="form-control datepicker"  placeholder="start date" name="start date"  v-model="dateRange.startDate" v-validate="'required'" >
																<div class="input-group-append">
																	<span class="input-group-text">
																		<i class="fa fa-calendar"></i>
																	</span>
																</div>
															</div>
															<small class="form-text text-muted" v-show="errors.has('start date')">{{errors.first('start date')}}</small>
														</div>
													</div>
													<div class="col-md-5">
														<div class="form-group" :class="{'has-error has-feedback' : errors.has('end date')}">
															<div class="input-group">
																<input type="text" class="form-control datepicker"  placeholder="end date" name="end date"  v-model="dateRange.endDate" v-validate="'required'" >
																<div class="input-group-append">
																	<span class="input-group-text">
																		<i class="fa fa-calendar"></i>
																	</span>
																</div>
															</div>
															<small class="form-text text-muted" v-show="errors.has('end date')">{{errors.first('end date')}}</small>
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<button class="btn btn-secondary" @click="searchAppointments"><span class="fa fa-search"> </span> &nbsp; search</button>
														</div>
													</div>
										</div>
									</div>
									<div class="card-body">
										<table class="table table-head-bg-secondary" >
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">patient</th>
													<th scope="col">date</th>
													<th scope="col">reason of visit</th>
													<th scope="col">actions</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(appointment,index) in filteredCancelledAppointments" >
													<td :class="{'is-loading' : loading == true && appointment.id == currentProcessingId}">{{index+1}}</td>
													<td>{{appointment.patient.firstName + ' ' + appointment.patient.lastName}}</td>
													<td>{{appointment.date}}</td>
													<td>{{appointment.reason}}</td>
													<td>
														<div class="btn-group btn-group-page-header ml-auto">
															<button type="button" class="btn btn-light btn-round btn-page-header-dropdown " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																<i class="fa fa-ellipsis-h"></i>
															</button>
															<div class="arrow"></div>
															<div class="dropdown-menu">
																<a class="dropdown-item" href="javascript:void(0)" @click="appointmentDetails(appointment.id)">View Details</a>
																<a class="dropdown-item" href="javascript:void(0)" @click="appointmentPage(appointment.id)">Appointment Page</a>
																<a class="dropdown-item" href="javascript:void(0)" @click="acceptAppointment(appointment.id)">Accept</a>
																<a class="dropdown-item" href="#" data-toggle="modal" data-target="#appointment_details">Reject</a>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
											<div v-show="loadingData == true" :class="{'is-loading' : loadingData == true }"></div>
										<div v-show="filteredCancelledAppointments.length == 0" class="alert alert-secondary" role="alert">No rejected appointments found.</div>
										<div id="myChartLegend"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal for Appointments-->
		<div v-show="showModal == true" class="modal fade bd-example-modal-lg" id="appointment_details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">Appointment Details</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<appointment-details></appointment-details>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template >
<script >
import PortalHeader from "../../components/portal-header";
import router from '../../router'
import AppointmentDetails from "../../components/appointment-details";
import appointmentApi from "../../api/appointment";

export default {
  name: "cancelled-appointments",
  components: { AppointmentDetails, PortalHeader },
  data () {
	return {
		dateRange: {
			startDate: '',
			endDate: '',
			status: 'rejected'
		},
		filter: '',
		scheduleId: 4,
		showModal: true,
		page: 1,
		loadingData: false,
		lastPage: 0,
		loading: false,
		isClicked: false,
		currentProcessingId: ''
		}
  },
  computed: {
	isCancelledAppointments (){
		return this.$store.getters['appointment/getCancelled'].length !==0
	},
	rejectedAppointments (){
		return this.$store.getters['appointment/getCancelled']
	},
	filteredCancelledAppointments() {
		return this.rejectedAppointments.filter(appointment => {
			return appointment.date.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					appointment.patient.firstName.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					appointment.patient.lastName.toLowerCase().includes(this.filter.toLowerCase().trim())
		})
	},
	isAppointmentStats () {
		return this.$store.getters['appointment/getStats'].length !== 0
	},
	appointmentStats() {
		return this.$store.getters['appointment/getStats']
	}
  },
	methods: {
			appointmentDetails (id) {
				this.$store.dispatch('appointment/getAppointment', id)
				this.$router.push('/appointment-details/' + id)
			},
			appointmentPage(id) {
				this.$store.dispatch('appointment/getAppointment', id)
				this.$router.push('/appointment-page/' + id)
			},
			acceptAppointment (id) {
			if(!this.isClicked){
				this.isClicked = true
				this.currentProcessingId = id
				this.loading = true
				appointmentApi.acceptAppointment(id).then(response=> {
					if(response.success) {
						this.$store.dispatch('appointment/getCancelled')
						this.$notify.notification('success', response.message)
						this.loading = false
						this.isClicked = false
						this.page = 1
						scroll(0,0)
					}
				})
			}
		},
		searchAppointments() {
			this.$store.dispatch('appointment/searchCancelledAppointments', this.dateRange)
		},
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
		scroll () {
		window.onscroll = () => {
			let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
			if (bottomOfWindow) {
				this.loadingData = true
					if(this.page < this.lastPage) {
							this.page++
							this.$store.dispatch ( 'appointment/getMoreCancelled', this.page ).then ( response => {
								this.loadingData = false
							})
					} else { this.loadingData = false }
			}
		};
	}
  },
	mounted () {
	if(!this.isCancelledAppointments){
		this.$store.dispatch('appointment/getCancelled', this.page).then(response => {
			this.lastPage = response
		})
    }
	if(!this.isAppointmentStats){
		this.$store.dispatch('appointment/getStats')
	}
	this.scroll()

	$('#appointmentsmenu').addClass('active')

	},
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
