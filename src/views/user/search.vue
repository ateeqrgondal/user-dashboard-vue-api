<template >
	<div class="wrapper horizontal-layout-2">
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Search Doctors</h4>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="card">
									<div class="card-header">
										<div class="card-head-row">
											<div class="card-title">My Doctors</div>
										</div>
									</div>
									<div class="card-body">
										<main>
											<section class="slice slice-lg bg-gradient-primary">
												<div class="container pt-lg">
													<div class="row justify-content-center">
														<div class="col-lg-9">
															<search-bar @searched = "searchDoctors "></search-bar>
														</div>
													</div>
												</div>
											</section>
											<section class="slice">
												<div class="container">
													<!-- Connections -->
													<div class="mb-4">
														<div class="mb-4">
															<h5 class="mb-1">Find Doctors</h5>
															<p class="text-muted mb-0">There are people who are there for you to take care of you. Meet them.</p>
														</div>
														<div class="row">
															<div class="col-md-8 offset-4">
																<ul class="nav">
																	<li class="nav-item" v-for="date in topDates">
																		<a class="nav-link active" href="#">{{date}}</a>
																	</li>
																</ul>
															</div>
														</div>
														<div class="row">
														<div class="col-md-8" >
																<div v-for="doctor in filteredDoctors">
																<!--<div v-for="s in doctor.schedules">-->
																<!--{{new Date(s.date) | moment('ddd MMM YYYY')}}-->
																<!--</div>-->
																<div class="card">
																	<div class="card-body">
																		<div class="row">
																			<div class="col-md-1">
																				<a @click="getDoctorProfile(doctor.id)">
																					<img alt="Image placeholder" v-if="doctor.avatar" :src="doctor.avatar" class="card-profile-image avatar shadow">
																				</a>
																			</div>
																			<div class="col-md-5">
																				<h5 class="heading heading-5 strong-600"><a @click="getDoctorProfile(doctor.id)">{{doctor.firstName + ' ' + doctor.lastName}}</a></h5>
																				<span class="small">{{doctor.clinics.length > 0 ? doctor.clinics[0].name + ', ' + doctor.clinics[0].address : ''}}</span>
																				<ul class="list-inline mb-4">
																					<li class="list-inline-item pr-2">
																						<star-rating :rating="_.meanBy(doctor.reviews, 'rating') > 0 ? _.meanBy(doctor.reviews, 'rating')  : 5 " :star-size="20" :read-only="true" :increment="0.01"></star-rating>
																					</li>
																				</ul>
																				<!--<a href="#" class="btn btn-sm btn-primary">Go somewhere</a>-->
																			</div>
																			<div class="col-md-6">
																				<td v-for="schedule in doctor.schedules">
																					<span class="ml-4">{{schedule.date}}</span>
																					<ul style="list-style: none">
																						<li v-for="slot in schedule.slots" class="mt-1">
																							<button class="btn btn-primary btn-sm" @click="createAppointment(doctor.id, slot.id)">{{slot.startTime}}</button>
																						</li>
																					</ul>
																				</td>

																			</div>
																		</div>
																	</div>
																</div>
															</div>
															</div>
															<div class="col-md-4">
																<gmap-map
																		:center='markers2[0]'
																		:zoom="5"
																		style="width:100%;  height: 1000px;"
																>
																	<gmap-marker
																			:key="index"
																			v-for="(m, index) in markers"
																			:position="m"
																	></gmap-marker>
																</gmap-map>
															</div>
														</div>
															<div class="alert alert-dark" v-if="!filteredDoctors.length">
																No Doctors found.
															</div>
													</div>
												</div>
											</section>
										</main>
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
	import DoctorCard from "../../components/doctor-card";
	import SearchBar from "../../components/search-bar";
	import doctorApi from '../../api/doctor'
	import StarRating from "vue-star-rating/src/star-rating";
	import PortalHeader from "../../components/portal-header";


	export default {
		name: "search",
		data () {
			return {
					center: { lat: 37.4220, lng: -122.0840 },
					places: [],
					markers: [],
					markers2: [
						{
						lat:41.140442,
						lng:-8.6143471
					},
					{
						lat:38.7640195,
						lng:-9.098499499999999

					},

				],
				currentPlace: null,

				filter: '',
				startDate:'',
				endDate: '',
				doctorsResult: [],
				topDates: []
			}
		},
		components: {
			StarRating,
			SearchBar,
			DoctorCard,
			PortalHeader,
		},
		watch: {
			clinicAddresses () {
				this.geoCoordinates()
			},

			markers () {
				return this.markers
			}
		},
		computed: {
			doctorsClinics () {
				return _.map(this.filteredDoctors, (doctor => {
						return doctor.clinics
				}))
			},
			allAddresses () {
				let addresses = []
					_.forEach(this.doctorsClinics, doctorClinic => {
							_.forEach(doctorClinic, clinic => {
								addresses.push(clinic.fullAddress)
							})
						})
					return addresses
				},
				clinicAddresses () {
						let gAddresses = []
						_.forEach(this.allAddresses, address => {
							let obj = {
								address_line_1: address.address,
								address_line_2: '',
								city:           address.city,
								state:          '',               // province also valid
								zip_code:       address.postCode,            // postal_code also valid
								country:        address.country
							}
							gAddresses.push(obj)
						})
						return gAddresses
					},
					dates () {
				for (let i =0 ; i< 4 ; i++ ) {
					this.topDates.push(this.$moment(new Date()).add(i+1, 'days').format('ddd D MMM'))
				}
				this.topDates
			},
			doctors () {
				return this.doctorsResult
			},
			filteredDatesWithDoctors () {
				return   		_.filter(this.filteredDoctors, (doc => {
					return _.filter(doc.schedules, (sch => {
						return _.includes(this.topDates, sch.date) === true
					}))
				}))
			},
			filteredDoctors () {
				return this.doctors.filter(doctor => {
					return doctor.firstName.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					       doctor.lastName.toLowerCase().includes(this.filter.toLowerCase().trim())
				})
			},
			rating (reviews) {
				return _.meanBy(reviews, 'rating')
			}


		},
		methods: {
			geoCoordinates () {
					let coordinates = []
					_.forEach(this.clinicAddresses, address => {
						this.$geocoder.setDefaultMode('address');      // this is default
						this.$geocoder.send(address, response => {
							coordinates.push(response.results[0].geometry.location)
						});
					})
				this.markers = coordinates
			},
				getDoctorProfile(id) {
					this.$router.push ( 'doctor_profile/' + id )
			},
			createAppointment (doctorId, slotId) {
				this.$router.push({path: 'create_appointment', query: {doctor: doctorId, slot: slotId}})
			},
			filterRequiredData () {
				_.filter(this.filteredDoctors, (doc => {
					return _.filter(doc.schedules, (sch => {
						return _.includes(this.topDates, sch.date)
					}))
				}))
			},
			searchDoctors () {
				doctorApi.searchDoctors(this.$route.query, this.startDate).then(result => {
					this.doctorsResult = result
				})
			}
		},
		mounted () {
			this.searchDoctors()
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
