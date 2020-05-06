<template >
	<div class="wrapper horizontal-layout-2">
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Create Appointment</h4>
						</div>
						<div class="row">
							<div class="col-md-8 offset-2">
								<div class="card">
									<div class="card-header">
										<div class="card-head-row">
											<div class="card-title">New Appointment</div>
										</div>
									</div>
									<div class="card-body">
										<div class="row">
											<div class="col-md-6">
												<h3>Appointment With</h3>
												<p><a href="#" @click="getDoctorProfile(appointmentData.doctor.id)">{{appointmentData.doctor.first_name + ', ' + appointmentData.doctor.last_name}}</a></p>
											</div>
											<div class="col-md-6">
												<h3>Appointment With At</h3>
												<h4>{{appointmentData.clinic.name}}</h4>
												<span class="small">{{appointmentData.clinic.address}}</span>
											</div>
											<div class="col-md-6">
												<h3>Appointment Date</h3>
												<p>{{appointmentData.date}}</p>
											</div>
											<div class="col-md-6">
												<h3>Appointment Timings</h3>
												<p>Start Time: {{appointmentData.startTime}} &nbsp;&nbsp;End Time:  {{appointmentData.endTime}}</p>
											</div>
											<div class="col-md-12">
												<h3>Appointment For</h3>
												<div class="form-group">
													<model-select :options="familyMemberOptions"
													              v-model="createAppointment.familyMemberId"
													              placeholder="select family member">
													</model-select>
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group " :class="{'has-error has-feedback' : errors.has('reason')}">
													<label  class="placeholder"><b>Appointment Reason</b></label>
													<textarea class="form-control" name="reason"  rows="3" placeholder="appointment" v-model="createAppointment.reason"  v-validate="'required|max:300'" ></textarea>
													<small class="form-text text-muted" v-show="errors.has('reason')">{{errors.first('reason')}}</small>
												</div>
											</div>
											<div class="col-md-6 offset-3 ">
												<button class="btn btn-success" @click="submitAppointment">Save</button>&nbsp;
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
	</div>
</template >
<script >
import PortalHeader from "../../components/portal-header";
import ScheduleForm from "../../components/schedule-form";
import appointmentApi from "../../api/appointment";

export default {
  name: "create_appointment",
  components: { ScheduleForm, PortalHeader },
  data () {
	return {
		slot: {
			slotId: '',
		    doctor: ''
		},
		createAppointment: {
			reason : '',
		    familyMemberId: '',
		    slotId: '',
		    doctorId: '',
		    date: '',
		    clinicId: ''
		},
		familyMemberId: ''
	}
  },
  computed: {
	isAppointmentData(){
		return this.$store.getters['appointment/getAppointmentData'].length !==0
	},
	appointmentData (){
			return this.$store.getters['appointment/getAppointmentData']
	},
    isFamilyMembers () {
		return this.$store.getters['patient/getFamilyMembers'].length !== 0
    },
    familyMembers () {
		return this.$store.getters['patient/getFamilyMembers']
    },
    familyMemberOptions () {
		return _.map(this.familyMembers, (member => {
			return {
				value: member.id,
			    text: member.firstName + ' ' + member.lastName
			}
		}) )
    }
  },
	methods: {
  	getDoctorProfile (id) {
  	    this.$router.push('doctor_profile/'+id)
    },
  	submitAppointment () {
  		this.createAppointment.clinicId = this.appointmentData.clinic.id
  		this.createAppointment.slotId = this.appointmentData.id
  		this.createAppointment.doctorId = this.appointmentData.doctor.id
  		this.createAppointment.date = this.appointmentData.date
  		this.$validator.validateAll().then(result => {
  			if(result) {
						  appointmentApi.createAppointment(this.createAppointment).then(response => {
							  this.$notify.notification ( 'success', response.message )
							  this.$store.dispatch('appointment/getStats')
							  this.$router.push('/')
		  })
		    } else {

		    }
	    })
    },
  	getAppointmentData () {
	        let data = {
	        	slot: this.$route.query.slot,
	        	doctor: this.$route.query.doctor,
	        }
		  this.$store.dispatch('appointment/getAppointmentData', data )
    },
	getUserFavoriteDoctors() {
		this.$store.dispatch('doctor/getUserFavoriteDoctors')
		this.$store.dispatch('doctor/getUserDoctorsList')
	},
	sendMessage(id) {
		this.$router.push('/chat_page/' + id)
	},
	favoriteIt(id) {
		this.isFavoriteClicked = true
		doctorApi.favoriteUnfavoriteDoctor(id).then(response => {
			this.isFavoriteClicked = false
			this.$store.dispatch('doctor/getUserFavoriteDoctors')
		})
	}
  },
	mounted () {
	if(!this.isAppointmentData){
			this.getAppointmentData()
    }
	if(!this.isFamilyMembers){
			this.$store.dispatch('patient/getFamilyMembers')
    }
	$('#doctors_menu').addClass('active')
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
