<template >
	<div class="wrapper horizontal-layout-2">
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<h4 class="page-title">User Profile</h4>
						<div class="row">
							<div class="col-md-8">
								<div class="card card-with-nav">
									<div class="card-header">
										<div class="row row-nav-line">
											<ul class="nav nav-tabs nav-line nav-color-secondary" role="tablist">
												<li class="nav-item"> <a class="nav-link active show" data-toggle="tab" href="#personal" role="tab" aria-selected="true">Personal Details</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#reviews" role="tab" aria-selected="false">Reviews</a> </li>
											</ul>
										</div>
									</div>
									<div class="tab-content">
										<div class="tab-pane active in" id="personal">
											<div class="card-body">
												<div class="row mt-3">
													<div class="col-md-6">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('first name')}">
															<label  class="placeholder"><b>First Name</b></label>
															<input  type="text" class="form-control input-pill" placeholder="first name" v-model="personalDetails.firstName"  v-validate="'required|alpha_spaces'" name="first name">
															<small class="form-text text-muted" v-show="errors.has('first name')">{{errors.first('first name')}}</small>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('last name')}">
															<label  class="placeholder"><b>Last Name</b></label>
															<input  type="text" class="form-control input-pill" name="last name" placeholder="last name" v-model="personalDetails.lastName"  v-validate="'required|alpha_spaces'" >
															<small class="form-text text-muted" v-show="errors.has('last name')">{{errors.first('last name')}}</small>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group" :class="{'has-error has-feedback' : errors.has('gender')}">
															<label class="form-label">Gender</label>
															<div class="selectgroup w-100">
																<label class="selectgroup-item">
																	<input type="radio" name="gender"  value="male" v-model="personalDetails.gender" class="selectgroup-input" v-validate="'required'">
																	<span class="selectgroup-button">MALE</span>
																</label>
																<label class="selectgroup-item">
																	<input type="radio"  value="female" name="gender" v-model="personalDetails.gender" class="selectgroup-input" >
																	<span class="selectgroup-button">FEMALE</span>
																</label>
															</div>
															<small class="form-text text-muted" v-show="errors.has('gender')">{{errors.first('gender')}}</small>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('phone')}">
															<label  class="placeholder"><b>Phone No.</b></label>
															<input  type="text" class="form-control input-pill" name="phone" placeholder="phone no" v-model="personalDetails.phoneNo"  v-validate="'required|numeric'" >
															<small class="form-text text-muted" v-show="errors.has('phone')">{{errors.first('phone')}}</small>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('email')}">
															<label  class="placeholder"><b>Email</b></label>
															<input  type="text" class="form-control input-pill" name="email" placeholder="email" v-model="personalDetails.email"  v-validate="'required|email'" disabled>
															<small class="form-text text-muted" v-show="errors.has('email')">{{errors.first('email')}}</small>
														</div>
													</div>
													<div class="col-md-12">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('address 1')}">
															<label  class="placeholder"><b>Address 1</b></label>
															<input  type="text" class="form-control input-pill" name="address 1" placeholder="address 1" v-model="personalDetails.addressLine1"  v-validate="'required|alpha_spaces'" >
															<small class="form-text text-muted" v-show="errors.has('address 1')">{{errors.first('address 1')}}</small>
														</div>
													</div>
													<div class="col-md-8">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('address 2')}">
															<label  class="placeholder"><b>Address 2</b></label>
															<input  type="text" class="form-control input-pill" name="address 2" placeholder="address 2" v-model="personalDetails.addressLine2"   >
															<small class="form-text text-muted" v-show="errors.has('address 2')">{{errors.first('address 2')}}</small>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('post code')}">
															<label  class="placeholder"><b>Post Code</b></label>
															<input  type="text" class="form-control input-pill" name="post code" placeholder="post code" v-model="personalDetails.postCode" v-validate="'required'"   >
															<small class="form-text text-muted" v-show="errors.has('post code')">{{errors.first('post code')}}</small>
														</div>
													</div>
													<div class="col-md-12">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('about')}">
															<label  class="placeholder"><b>About me</b></label>
															<textarea class="form-control" name="about"  rows="3" placeholder="tell about yourself" v-model="personalDetails.about"  v-validate="'required|max:300'" ></textarea>
															<small class="form-text text-muted" v-show="errors.has('about')">{{errors.first('about')}}</small>
														</div>
													</div>
												</div>
												<div class="text-right mt-3 mb-3">
													<button class="btn btn-success" @click="addPersonalDetails">Save</button>&nbsp;
													<button class="btn btn-danger" @click="reset('personal')">Reset</button>
												</div>
											</div>
										</div>
										<div class="tab-pane in" id="reviews">
											<div class="card-body">
												<div class="card card-secondary">
													<div class="card-body" v-for="review in reviews">
														<h5 class="card-title mb-3">{{review.revieweeFirstName + ' ' + review.revieweeLastName}} <span class="fa fa-star"> {{review.rating}}</span></h5>
														<p class="card-text">{{review.review}}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="card card-profile">
									<div class="card-header" style="background-image: url('../assets/img/blogpost.jpg')">
										<div class="profile-picture" v-if="profile.avatar" :class="{'is-loading' : profilePictureLoading == true}">
											<div class="avatar avatar-xl">
												<img :src="profile.avatar" alt="..." class="avatar-img rounded-circle">
											</div>
											<div class="input-file input-file-image" style="margin: 5px">
												<input type="file" class="form-control form-control-file" id="uploadImg2" name="profile picture" v-validate="'ext:jpeg,jpg,png'" data-vv-as="field"  @change="uploadProfilePicture($event)" >
												<label for="uploadImg2" class="  label-input-file btn btn-default btn-xs btn-round">
													<span class="btn-label">
														<i class="fa fa-file-image"></i>
													</span>
													Upload Image
												</label>
												<small class="form-text text-muted" v-show="errors.has('profile picture')">{{errors.first('profile picture')}}</small>
											</div>
										</div>
									</div>
									<div class="card-body">
										<div class="user-profile text-center">
											<div class="name">{{profile.firstName + ' ' + profile.lastName}}</div>
											<div class="desc">{{profile.about}}</div>
											<div class="view-profile">
												<router-link to="/doctor/public_profile" class="btn btn-secondary btn-block">View Profile</router-link>
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
export default {
	name: "user-profile",
	components: { PortalHeader },
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
				email: ''

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
		addPersonalDetails() {
			this.$validator.resume()
					this.$validator.validateAll().then(result => {
						if(result) {
													this.$store.dispatch('patient/addPersonalDetails', this.personalDetails).then(response => {
														if(response.errors) {
															_.forEach(response.errors, (error => {
																this.$notify.notification('error', error, 'danger')
															}))
														} else if(response.success){
															this.$notify.notification('success', response.message)
															this.$store.dispatch('patient/getPersonalDetails')
														}
													})
												}
					})
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
			this.$validator.pause()
			this.personalDetails.firstName = this.profile.firstName
			this.personalDetails.lastName = this.profile.lastName
			this.personalDetails.gender = this.profile.gender
			this.personalDetails.phoneNo= this.profile.phone
			this.personalDetails.addressLine1 = this.profile.address.addressLine1
			this.personalDetails.addressLine2 = this.profile.address.addressLine2
			this.personalDetails.postCode = this.profile.address.postCode
			this.personalDetails.about = this.profile.about
			this.personalDetails.email = this.profile.email
			return true
		}
	},
	watch: {
		profile () {
			return this.fillUserDetails();
		}
	},
	computed: {
		isQualifications () {
			return this.$store.getters['doctor/getQualifications'].length !== 0
		},
		isProfile() {
			return this.$store.getters['doctor/getPersonalDetails'].length !== 0
		},
		profile () {
			return this.$store.getters['doctor/getPersonalDetails']
		},
		isReviews() {
			return this.$store.getters['doctor/getReviews'].length !== 0
		},
		reviews () {
			return this.$store.getters['doctor/getReviews']
		},
	    averageRating () {
			return _.meanBy(this.reviews, 'rating')
	    }

		},
	mounted () {
	if(!this.isProfile) {
		this.$store.dispatch('doctor/getPersonalDetails')
	}
	if(this.isProfile){
		this.fillUserDetails()
	}
	if(!this.isReviews) {
		this.$store.dispatch('doctor/getReviews')
	}
		$('.datepicker').datetimepicker({
			format: 'MM/DD/YYYY',
		});
		},
}
</script >
<style scoped >
</style >
