<template >
	<div class="wrapper classic-wrapper">
		<portal-header></portal-header>
		<div class="classic-grid">
			<sidebar></sidebar>
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<h4 class="page-title">Account Settings</h4>
						<div class="row">
							<div class="col-md-12">
								<div class="card card-with-nav">
									<div class="card-header">
										<div class="row row-nav-line">
											<ul class="nav nav-tabs nav-line nav-color-secondary" role="tablist">
												<li class="nav-item"> <a class="nav-link active show" data-toggle="tab" href="#payment_options" role="tab" aria-selected="true">Payment Options</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#appointments" role="tab" aria-selected="false">Appointments</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#experience" role="tab" aria-selected="false">Privacy</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#experience" role="tab" aria-selected="false">Notifications</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#experience" role="tab" aria-selected="false">Commodities</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#qualifiaction" role="tab" aria-selected="false">FAQs</a> </li>
											</ul>
										</div>
									</div>
									<div class="tab-content">
										<div class="tab-pane active in" id="payment_options">
											<payment-options></payment-options>
										</div>
										<div class="tab-pane in" id="appointments">
											<appointment-settings></appointment-settings>
										</div>
										<div class="tab-pane in" id="experience">
											<div class="card-body">
												<div class="row">
													<div class="col-md-12" >
														<div class="card">
															<div class="card-body">
																<div class="card-sub">
																	Add Work Experience
																</div>
																<div class="row" data-vv-scope="experience">
																		<div class="col-md-6">
																			<div class="form-group " :class="{'has-error has-feedback' : errors.has('hospital name')}">
																				<label  class="placeholder"><b>Hospital Name</b></label>
																				<input  type="text" class="form-control input-pill" placeholder="hospital name" v-model="experience.hospitalName"  v-validate="'required'" name="hospital name">
																				<small class="form-text text-muted" v-show="errors.has('hospital name')">{{errors.first('hospital name')}}</small>
																			</div>
																		</div>
																		<div class="col-md-6">
																			<div class="form-group" :class="{'has-error has-feedback' : errors.has('practice start date')}">
																				<label>End Date</label>
																				<div class="input-group">
																					<input type="text" class="form-control datepicker"  placeholder="practice start date" name="practice start date"  v-model="experience.startDate" v-validate="'required'" >
																					<div class="input-group-append">
																				<span class="input-group-text">
																					<i class="fa fa-calendar"></i>
																				</span>
																					</div>
																				</div>
																				<small class="form-text text-muted" v-show="errors.has('practice start date')">{{errors.first('practice start date')}}</small>
																			</div>
																		</div>
																		<div class="col-md-6">
																			<div class="form-group" :class="{'has-error has-feedback' : errors.has('practice end date')}">
																				<label>End Date</label>
																				<div class="input-group">
																					<input type="text" class="form-control datepicker" placeholder="practice end date" name="practice end date"  v-model="experience.endDate" v-validate="'required'" >
																					<div class="input-group-append">
																					<span class="input-group-text">
																						<i class="fa fa-calendar"></i>
																					</span>
																					</div>
																				</div>
																				<small class="form-text text-muted" v-show="errors.has('practice end date')">{{errors.first('practice end date')}}</small>
																			</div>
																		</div>
																		<div class="col-md-6">
																			<div class="form-group " :class="{'has-error has-feedback' : errors.has('city')}">
																				<label  class="placeholder"><b>City</b></label>
																				<input  type="text" class="form-control input-pill" placeholder="city" v-model="experience.city"  v-validate="'required'" name="city">
																				<small class="form-text text-muted" v-show="errors.has('city')">{{errors.first('city')}}</small>
																			</div>
																		</div>
																		<div class="col-md-12">
																			<div class="text-right mt-3 mb-3">
																				<button class="btn btn-success" @click="addExperience('experience')">Save</button>&nbsp;
																				<button class="btn btn-danger" @click="reset('experience')">Reset</button>
																			</div>
																		</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div class="row" v-if="isExperiences">
													<div class="col-md-12">
														<div class="card">
															<div class="card-body">
																<div class="card-sub">
																	Work Experience
																</div>
																<table class="table table-striped mt-3">
																	<thead>
																		<tr>
																			<th scope="col">#</th>
																			<th scope="col">place</th>
																			<th scope="col">date</th>
																			<th scope="col">actions</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(exp, index) in experiences">
																			<td>{{index+1}}</td>
																			<th>{{exp.hospitalName}} <br>
																				<small>{{exp.city}}</small>
																			</th>
																			<td>{{exp.startDate + ' - ' + exp.endDate}}</td>
																			<td>
																				<div class="btn-group btn-group-sm btn-group-page-header ml-auto">
																					<button type="button" class="btn btn-light btn-round btn-page-header-dropdown " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																						<i class="fa fa-ellipsis-h"></i>
																					</button>
																					<div class="arrow"></div>
																					<div class="dropdown-menu">
																						<a class="dropdown-item small" href="#" data-toggle="modal" data-target="#add_appointment" @click="deleteExperience(exp.id)">delete</a>
																					</div>
																				</div>
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

import Sidebar from "../../components/doctor/sidebar";
import PortalHeader from "../../components/doctor/portal-header";
import router from '../../router'
import PaymentOptions from "../../components/tabs/payment-options";
import AppointmentSettings from "../../components/tabs/appointment-settings";
export default {
	name: "settings",
	components: { AppointmentSettings, PaymentOptions, PortalHeader, Sidebar },
	data () {
		return {
			personalDetails: {
				firstName: '',
				lastName: '',
				gender: '',
				phoneNo: '',
				addressLine1: '',
				addressLine2: '',
				city: '',
				postCode: '',
				country: '',
				about: '',
				website: '',
				email: ''

			},
			qualification : {
				title: '',
				startDate: '',
				endDate: '',
				institute: '',
			},
			experience : {
				hospitalName: '',
				startDate: '',
				endDate: '',
				city: '',
				country: ''
			},
			paymentOption : {
				name: '',
				description: '',
			},
			profilePicture: '',
			profilePictureLoading : false
		}
	},
	methods: {
		uploadProfilePicture(e){
			let files = e.target.files || e.dataTransfer.files
			this.profilePicture = files[0]
			let formData = new FormData()
			formData.append('profilePicture', this.profilePicture)
			this.$validator.validate('profile picture').then(result => {
				if (result) {
					this.profilePictureLoading = true
					this.$store.dispatch('doctor/uploadDp', formData).then(response => {
						this.profilePictureLoading = false
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$notify.notification('success', response.message)
							this.$store.dispatch('doctor/getPersonalDetails')
							this.$store.dispatch('user/get')
						}
					})
				}
			})

		},
		deleteQualification(id) {
			this.$store.dispatch('doctor/deleteQualification', id).then(response => {
				if(response.errors) {
					_.forEach(response.errors, (error => {
						this.$notify.notification('error', error, 'danger')
					}))
				} else if(response.success){
					this.$notify.notification('success', response.message)
					this.$store.dispatch('doctor/getQualifications')
				}
			})
		},
		deleteExperience(id) {
			this.$store.dispatch('doctor/deleteExperience', id).then(response => {
				if(response.errors) {
					_.forEach(response.errors, (error => {
						this.$notify.notification('error', error, 'danger')
					}))
				} else if(response.success){
					this.$notify.notification('success', response.message)
					this.$store.dispatch('doctor/getExperiences')
				}
			})
		},
		addQualification () {
			this.$validator.resume()
				const results = Promise.all([
					this.$validator.validate('title'),
					this.$validator.validate('start date'),
					this.$validator.validate('end date'),
					this.$validator.validate('institute')
				]);
			let result = this.qualification.title !== '' &&
						this.qualification.startDate !== '' &&
						this.qualification.endDate !== '' &&
						this.qualification.institute !== ''
				if (result) {
					this.$store.dispatch('doctor/addQualification', this.qualification).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$notify.notification('success', response.message)
							this.$store.dispatch('doctor/getQualifications')
							this.reset('qualification')
						}
					})
				}
		},
		addPaymentOption() {
			this.$validator.resume()
				const results = Promise.all([
					this.$validator.validate('title'),
					this.$validator.validate('description')
				]);
			let result = this.qualification.title !== '' &&
						this.qualification.startDate !== '' &&
						this.qualification.endDate !== '' &&
						this.qualification.institute !== ''
				if (result) {
					this.$store.dispatch('doctor/addQualification', this.qualification).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$notify.notification('success', response.message)
							this.$store.dispatch('doctor/getQualifications')
							this.reset('qualification')
						}
					})
				}
		},
		addExperience() {
			this.$validator.resume()
			const results = Promise.all([
                this.$validator.validate('hospital name'),
                this.$validator.validate('practice start date'),
                this.$validator.validate('practice end date'),
                this.$validator.validate('city'),
            ]);
			let result = this.experience.hospitalName !== '' &&
						this.experience.startDate !== '' &&
						this.experience.endDate !== '' &&
						this.experience.city !== ''
				if (result) {
					this.$store.dispatch('doctor/addExperience', this.experience).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$notify.notification('success', response.message)
							this.$store.dispatch('doctor/getExperiences')
							this.reset('experience')
						}
					})
				}
		},
		addPersonalDetails() {
			this.$validator.resume()
			const results = Promise.all([
                this.$validator.validate('first name'),
                this.$validator.validate('last name'),
                this.$validator.validate('gender'),
                this.$validator.validate('phone'),
                this.$validator.validate('address 1'),
                this.$validator.validate('post code'),
                this.$validator.validate('about'),
            ]);
			let result = this.personalDetails.firstName !== '' &&
						this.personalDetails.lastName !== '' &&
						this.personalDetails.gender !== '' &&
						this.personalDetails.phoneNo !== '' &&
						this.personalDetails.about !== '' &&
						this.personalDetails.addressLine1 !== '' &&
						this.personalDetails.postCode !== ''
				if (result) {
					this.$store.dispatch('doctor/addPersonalDetails', this.personalDetails).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$notify.notification('success', response.message)
							this.$store.dispatch('doctor/getPersonalDetails')
							this.reset('personal')
						}
					})
				}
		},
		reset(type) {
			this.$validator.pause()
			switch ( type ) {
				case 'qualification' : {
					this.qualification.startDate = this.qualification.endDate = this.qualification.institute = this.qualification.title = ''
					break
				}
				case 'experience' : {
					this.experience.hospitalName = this.experience.startDate = this.experience.endDate = this.experience.city = ''
					break
				}
				case 'personal' : {
					this.personalDetails.firstName = this.personalDetails.lastName = this.personalDetails.gender = this. personalDetails.phoneNo = this.personalDetails.addressLine1 = this.personalDetails.addressLine2 = this.personalDetails.postCode = this.personalDetails.postCode = ''
					break
				}
			}
		},
		fillUserDetails () {
			this.personalDetails.firstName = this.profile.firstName
			this.personalDetails.lastName = this.profile.lastName
			this.personalDetails.gender = this.profile.gender
			this.personalDetails.phoneNo= this.profile.phone
			this.personalDetails.addressLine1 = this.profile.address.addressLine1
			this.personalDetails.addressLine2 = this.profile.address.addressLine2
			this.personalDetails.postCode = this.profile.address.postCode
			this.personalDetails.about = this.profile.about
			this.personalDetails.email = this.profile.email
			this.personalDetails.website= this.profile.website
			return true
		}
	},
	watch: {
		profile () {
			return this.fillUserDetails();
		}
	},
	computed: {
		isPaymentOptions () {
			return this.$store.getters['doctor/getPaymentOptions'].length !== 0
		},
		paymentOptions () {
			return this.$store.getters['doctor/getPaymentOptions']
		},
		isQualifications () {
			return this.$store.getters['doctor/getQualifications'].length !== 0
		},
		qualifications () {
			return this.$store.getters['doctor/getQualifications']
		},
		isExperiences() {
			return this.$store.getters['doctor/getExperiences'].length !== 0
		},
		experiences () {
			return this.$store.getters['doctor/getExperiences']
		},
		isProfile() {
			return this.$store.getters['doctor/getPersonalDetails'].length !== 0
		},
		profile () {
			return this.$store.getters['doctor/getPersonalDetails']
		},

	},
	mounted () {
	if(!this.isPaymentOptions) {
		this.$store.dispatch('doctor/getPaymentOptions')
	}
	if(!this.isQualifications) {
		this.$store.dispatch('doctor/getQualifications')
	}
	if(!this.isExperiences) {
		this.$store.dispatch('doctor/getExperiences')
	}
	if(!this.isProfile) {
		this.$store.dispatch('doctor/getPersonalDetails')
	}
	if(this.isProfile){
		this.fillUserDetails()
	}
		$('.datepicker').datetimepicker({
			format: 'MM/DD/YYYY',
		});
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
