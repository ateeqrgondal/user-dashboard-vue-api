<template >
	<div class="wrapper horizontal-layout-2">
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<h4 class="page-title">Doctor Profile</h4>
						<div class="row">
							<div class="col-md-8">
								<div class="card card-with-nav">
									<div class="card-header">
										<div class="row row-nav-line" style="width: fit-content !important;">
											<ul class="nav nav-tabs nav-line nav-color-secondary" role="tablist">
												<li class="nav-item"> <a class="nav-link active show" data-toggle="tab" href="#personal" role="tab" aria-selected="true">Personal Details</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#qualification" role="tab" aria-selected="false">Qualifications</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#specializations" role="tab" aria-selected="false">Specializations</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#experience" role="tab" aria-selected="false">Experience</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#treatments" role="tab" aria-selected="false">Treatments</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#insurances" role="tab" aria-selected="false">Insurances</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#commodities" role="tab" aria-selected="false">Commodities</a> </li>
												<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#locations" role="tab" aria-selected="false">Locations</a> </li>

											</ul>
										</div>
									</div>
									<div class="tab-content">
										<div class="tab-pane active in" id="personal">
											<div class="card-body">
												<div class="row mt-3">
													<div class="col-md-12 text-center">
														<div class="avatar avatar-xl">
															<img :src="profile.avatar" alt="..." class="avatar-img rounded-circle">
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('first name')}">
															<label  class="placeholder"><b>First Name</b></label>
															<p>{{personalDetails.firstName}}</p>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('last name')}">
															<label  class="placeholder"><b>Last Name</b></label>
															<p>{{personalDetails.lastName}}</p>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group" :class="{'has-error has-feedback' : errors.has('gender')}">
															<label class="form-label">Gender</label>
															<p>{{personalDetails.gender}}</p>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('phone')}">
															<label  class="placeholder"><b>Phone No.</b></label>
															<p>{{personalDetails.phoneNo}}</p>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('email')}">
															<label  class="placeholder"><b>Email</b></label>
															<p>{{personalDetails.email}}</p>
														</div>
													</div>
													<div class="col-md-6" v-if="personalDetails.website">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('website')}">
															<label  class="placeholder"><b>Website</b></label>
															<p>{{personalDetails.website}}</p>
														</div>
													</div>
													<div class="col-md-12">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('address 1')}">
															<label  class="placeholder"><b>Address</b></label>
															<p>{{personalDetails.addressLine1 + ', ' + personalDetails.addressLine2}}</p>
														</div>
													</div>
													<div class="col-md-4">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('post code')}">
															<label  class="placeholder"><b>Post Code</b></label>
															<p>{{personalDetails.postCode}}</p>
														</div>
													</div>
													<div class="col-md-12">
														<div class="form-group " :class="{'has-error has-feedback' : errors.has('about')}">
															<label  class="placeholder"><b>About me</b></label>
															<p>{{personalDetails.about}}</p>
														</div>
													</div>
												</div>
											</div>
											<div class="card-body">
												<div class="card card-secondary">
													<div class="card-body" v-for="review in reviews">
														<h5 class="card-title mb-3">{{review.revieweeFirstName + ' ' + review.revieweeLastName}} <span class="fa fa-star"> {{review.rating}}</span></h5>
														<p class="card-text">{{review.review}}</p>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane in" id="qualification">
											<div class="card-body">
												<div class="row">
													<div class="col-md-12">
														<div class="card">
															<div class="card-body">
																<div class="card-sub">
																	Qualifications
																</div>
																<table class="table table-striped mt-3">
																	<thead>
																		<tr>
																			<th scope="col">#</th>
																			<th scope="col">Title</th>
																			<th scope="col">Institute</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(qualification, index) in qualifications">
																			<td>{{index+1}}</td>
																			<td>{{qualification.title}}</td>
																			<td>{{qualification.institute}}</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane in" id="specializations">
											<div class="card-body">
												<div class="row">
													<div class="col-md-12">
														<div class="card text-center">
															<div class="card-body">
																<div class="card-sub">
																	Specializations
																</div>
																<table class="table table-striped">
																	<thead>
																		<tr>
																			<th scope="col">#</th>
																			<th scope="col">Specialization</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(specialization, index) in specializations">
																			<td>{{index+1}}</td>
																			<td>{{specialization.title}}</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane in" id="experience">
											<div class="card-body">
												<div class="row">
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
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(exp, index) in experiences">
																			<td>{{index+1}}</td>
																			<th>{{exp.hospitalName}} <br>
																				<small>{{exp.city}}</small>
																			</th>
																			<td>{{exp.startDate + ' - ' + exp.endDate}}</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane in" id="treatments">
											<div class="card-body">
												<div class="row">
													<div class="col-md-12">
														<div class="card">
															<div class="card-body">
																<div class="card-sub">
																	Treatments
																</div>
																<table class="table table-striped mt-3">
																	<thead>
																		<tr>
																			<th scope="col">#</th>
																			<th scope="col">Treatment</th>
																			<th scope="col">description</th>
																			<th scope="col">About Price</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(treatment, index) in treatments">
																			<td>{{index+1}}</td>
																			<th>{{treatment.title}}</th>
																			<th>{{treatment.description}}</th>
																			<td>{{treatment.price}}</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane in" id="insurances">
											<div class="card-body">
												<div class="row">
													<div class="col-md-12">
														<div class="card">
															<div class="card-body">
																<div class="card-sub">
																	Accepting Insurances
																</div>
																<table class="table table-striped mt-3">
																	<thead>
																		<tr>
																			<th scope="col">#</th>
																			<th scope="col">Title</th>
																			<th scope="col">Company</th>
																			<th scope="col">Website</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(insurance, index) in insurances">
																			<td>{{index+1}}</td>
																			<th>{{insurance.title}}</th>
																			<th>{{insurance.company}}</th>
																			<td>{{insurance.website}}</td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane in" id="commodities">
											<div class="card-body">
												<div class="row">
													<div class="col-md-12">
														<div class="card">
															<div class="card-body">
																<div class="card-sub">
																	Commodities Available
																</div>
																<table class="table table-striped mt-3">
																	<thead>
																		<tr>
																			<th scope="col">#</th>
																			<th scope="col">Title</th>
																			<th scope="col">Description</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(commodity, index) in commodities">
																			<td>{{index+1}}</td>
																			<th>{{commodity.title}}</th>
																			<th>{{commodity.description}}</th>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane in" id="locations">
											<div class="card-body">
												<div class="row">
													<div class="col-md-12">
														<div class="card">
															<div class="card-body">
																<div class="card-sub">
																	Doctor Practice Locations
																</div>
																<table class="table table-striped mt-3">
																	<thead>
																		<tr>
																			<th scope="col">#</th>
																			<th scope="col">Name</th>
																			<th scope="col">Address</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr v-for="(practice, index) in practices">
																			<td>{{index+1}}</td>
																			<th>{{practice.name}}</th>
																			<th>{{practice.address}}</th>
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
							<div class="col-md-4">
								<div class="card">
									<div class="card-body">
										<gmap-map
												:center="center"
												:zoom="12"
												style="width:100%;  height: 400px;"
										>
											<gmap-marker
													:key="index"
													v-for="(m, index) in markers"
													:position="m.position"
													@click="center=m.position"
											></gmap-marker>
										</gmap-map>
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
export default  {
	name: "public-profile",
	components: { PortalHeader },
	data () {
		return {
			center: { lat: 37.4220, lng: -122.0840 },
			markers: [],
			places: [],
			currentPlace: null,
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
			profilePictureLoading : false
		}
	},
	methods: {
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
		qualifications () {
			return this.profile.qualifications
		},
		treatments () {
			return this.profile.treatments
		},
		specializations () {
			return this.profile.specializations
		},
		paymentOptions () {
			return this.profile.paymentOptions
		},
		commodities () {
			return this.profile.commodities
		},
		practices () {
			return this.profile.clinics
		},
		reviews () {
			return this.profile.reviews
		},
		insurances () {
			return this.profile.insurances
		},
		experiences () {
			return this.profile.experiences
		},
		profile () {
			return this.$store.getters['doctor/getPublicProfile']
		},

	},
	mounted () {
	if(!this.isProfile) {
		this.$store.dispatch('doctor/getPublicProfile', this.$route.params.id)
	}
		$('.datepicker').datetimepicker({
			format: 'MM/DD/YYYY',
		});
	}
}
</script >
<style scoped >
</style >
