<template >
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
		<section class="slice bg-secondary">
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
						<div class="col-md-10" v-for="doctor in filteredDoctors">
							<!--<div v-for="s in doctor.schedules">-->
							<!--{{new Date(s.date) | moment('ddd MMM YYYY')}}-->
							<!--</div>-->
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col-md-1">
											<router-link to="/doctor-profile">
												<img alt="Image placeholder" v-if="doctor.avatar" :src="doctor.avatar" class="card-profile-image avatar shadow">
											</router-link>
										</div>
										<div class="col-md-5">
											<h5 class="heading heading-5 strong-600">{{doctor.firstName + ' ' + doctor.lastName}}</h5>
											<span class="small">{{doctor.clinics.length > 0 ? doctor.clinics[0].name + ', ' + doctor.clinics[0].address : ''}}</span>
											<ul class="list-inline mb-4">
												<li class="list-inline-item pr-2">
													<star-rating :rating="_.meanBy(doctor.reviews, 'rating') > 0 ? _.meanBy(doctor.reviews, 'rating')  : 5 " :star-size="20" :read-only="true" :increment="0.01"></star-rating>
												</li>
											</ul>
											<a href="#" class="btn btn-sm btn-primary">Go somewhere</a>
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
						<div class="alert alert-dark" v-if="!filteredDoctors.length">
							No Doctors found.
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template >
<script >
	import DoctorCard from "../components/doctor-card";
	import SearchBar from "../components/search-bar";
	import doctorApi from '../api/doctor'
	import StarRating from "vue-star-rating/src/star-rating";
	import PortalHeader from "../../components/portal-header";


		export default {
		name: "search",
		data () {
			return {
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
		computed: {
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
			createAppointment (doctorId, slotId) {
				this.$router.push({path: 'login', query: {doctor: doctorId, slot: slotId}})
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
</style >
