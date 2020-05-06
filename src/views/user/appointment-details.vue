<template >
	<div class="wrapper horizontal-layout-2">
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h5 class="page-title">Appointment <small class="text-info"> #{{appointment.referenceId}}</small>&nbsp; <span class="badge badge-default">{{appointment.status}}</span></h5>
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
						<div class="row justify-content-center">
							<div class="col-12 col-lg-12 col-xl-12">
								<div class="row">
									<div class="col-md-8">
										<p class="demo">
											<button class="btn btn-danger btn-border btn-round" data-toggle="modal" data-target="#appointment_modal" v-if="appointment.status == 'pending'  ">cancel</button>&nbsp;
										</p>
									</div>
									<div class="col-md-4 text-right">
										<p class="demo">
											<button class="btn btn-secondary btn-border  btn-round" @click="print"><span class="fa fa-print"></span></button>
											<button class="btn btn-secondary btn-border ml-1 btn-round">download</button>
										</p>
									</div>
								</div>
								<div class="page-divider"></div>
								<div class="row">
									<div class="col-md-12">
										<div class="card card-invoice" ref="invoice" id="print">
											<div class="card-header">
												<div class="invoice-header">
													<h3 class="invoice-title">
														Appointment
													</h3>
													<div class="invoice-logo">
														<img src="../../assets/img/examples/logoinvoice.svg" alt="company logo">
													</div>
												</div>
												<div class="invoice-desc">
													{{appointment.location.name ?  appointment.location.name : ''}}<br/>
													{{appointment.location.address ? appointment.location.address : ''}}<br/>
												</div>
											</div>
											<div class="card-body">
												<div class="separator-solid"></div>
												<div class="row">
													<div class="col-md-4 info-invoice">
														<h5 class="sub">Appointment ID</h5>
														<p>#{{appointment.referenceId}}</p>
													</div>
													<div class="col-md-4 info-invoice">
														<h5 class="sub">Date & Time</h5>
														<p>{{appointment.date}}</p><br>
														<p>{{appointment.timings.startTime + ' - ' + appointment.timings.endTime}}</p>
													</div>
													<div class="col-md-4 info-invoice">
														<h5 class="sub">Appointment To</h5>
														<p>
															{{appointment.doctor.first_name + ', ' + appointment.doctor.last_name}}<br/>
														</p>
													</div>
												</div>
												<div class="row">
													<div class="col-md-12">
														<div class="invoice-detail">
															<div class="invoice-top">
																<h3 class="title"><strong>Patient Details</strong></h3>
															</div>
															<div class="invoice-item">
																<div class="table-responsive">
																	<table class="table table-borderless">
																		<thead>
																			<tr>
																				<td><strong>Patient Reference ID</strong></td>
																				<td  class="text-center">{{appointment.patient.referenceId}}</td>
																			</tr>
																			<tr>
																				<td><strong>Name</strong></td>
																				<td  class="text-center">{{appointment.patient.firstName + ', ' + appointment.patient.lastName }}</td>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td><strong>Age</strong></td>
																				<td class="text-center">{{appointment.patient.age}}</td>
																				<td class="text-center"><strong>Sex</strong></td>
																				<td class="text-right">{{appointment.patient.gender}}</td>
																			</tr>
																			<tr>
																				<td><strong>Email</strong></td>
																				<td  class="text-center">{{appointment.patient.email}}</td>
																			</tr>
																			<tr>
																				<td><strong>Phone #</strong></td>
																				<td class="text-right"></td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="card-footer">
												<h6 class="text-uppercase mt-4 mb-3 fw-bold">
													Reason of visit
												</h6>
												<p class="text-muted mb-0">
													{{appointment.reason}}
												</p>
												<h6 class="text-uppercase mt-4 mb-3 fw-bold">
													Doctor Remarks
												</h6>
												<p class="text-muted mb-0">
													<br><br><br><br><br><br><br>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="appointment_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" >Appointment Note</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="card-body">
							<appointment-note :appointment="appointment"></appointment-note>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="appointment_refer" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" >Refer Appointment</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="card-body">
							<appointment-refer :appointment="appointment"></appointment-refer>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="appointment_complete" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" >Complete Appointment</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="card-body">
							<appointment-complete :appointment="appointment"></appointment-complete>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template >
<script >

import PortalHeader from "../../components/portal-header";
import AppointmentNote from "../../components/appointment-note";
import AppointmentRefer from "../../components/appointment-refer";
import AppointmentComplete from "../../components/appointment-complete";
export default {
	name: "appointment-details",
	components: { AppointmentRefer, AppointmentNote, PortalHeader, AppointmentComplete },
    data () {
		return {
			loading: false,
			isClicked: false,
		}
	},
    methods: {
	    print() {
		    let prtContent = document.getElementById("print");
		    let WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
		    WinPrint.document.write(prtContent.innerHTML);
		    WinPrint.document.close();
		    WinPrint.focus();
		    WinPrint.print();
		    WinPrint.close();
	    }
    },
	computed: {
		isAppointment() {
			return this.$store.getters['appointment/getAppointment'].length !==0
		},
		appointment() {
			return this.$store.getters['appointment/getAppointment']
		}
	},
	mounted () {
		if(!this.isAppointment){
			this.$store.dispatch('appointment/getAppointment', this.$route.params.id)
		}
	}
}
</script >
<style scoped >

	.vertical-button {
		margin-top: 10px;
	}

	.is-loading {
		z-index: 10000000 !important;
	}
</style >
