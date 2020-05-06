<template >
	<div class="wrapper horizontal-layout-2">
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Doctors List</h4>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="card">
									<div class="card-header">
										<div class="card-head-row">
											<div class="card-title">My Doctors</div>
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
												</div>
											</div>
										</div>
									</div>
									<div class="card-body">
										<table class="table table-head-bg-secondary">
											<thead>
												<tr>
													<th scope="col"></th>
													<th scope="col">#</th>
													<th scope="col">name</th>
													<th scope="col">actions</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(doctor,index) in filteredDoctorsList">
													<td>
														<label><span class="fa fa-star " :class="{'favorited' : doctor.isFavorite == true, 'is-loading' : isFavoriteClicked == true}" @click="favoriteIt(doctor.id)"></span></label>
													</td>
													<td>{{index+1}}</td>
													<td>
														<a href="javascript:void(0)" @click="viewProfile(doctor.id)"> {{doctor.first_name + ', '+ doctor.last_name}}</a>
													</td>
													<td>
														<div class="btn-group btn-group-page-header ml-auto">
															<button type="button" class="btn btn-light btn-round btn-page-header-dropdown " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
																<i class="fa fa-ellipsis-h"></i>
															</button>
															<div class="arrow"></div>
															<div class="dropdown-menu">
																<a class="dropdown-item" href="#" data-toggle="modal" data-target="#slots" @click="sendMessage(doctor.userId)">Send Message</a>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
										<div v-show="filteredDoctorsList.length == 0" class="alert alert-secondary" role="alert">No data found. Please add in the list.</div>
										<div id="myChartLegend"></div>
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
import doctorApi from "../../api/doctor";

export default {
  name: "doctors-list",
  components: { ScheduleForm, PortalHeader },
  data () {
	return {
		filter: '',
		scheduleId: 4,
		showModal: true,
		slotButton: [],
	    isFavoriteClicked: false
	}
  },
  computed: {
	isDoctorsList(){
		return this.$store.getters['doctor/getUserDoctorsList'].length !==0
	},
	doctorsList    (){
		return this.$store.getters['doctor/getUserDoctorsList']
	},
	filteredDoctorsList() {
		return this.doctorsList.filter(doctorsList => {
			return doctorsList.first_name.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					doctorsList.last_name.toLowerCase().includes(this.filter.toLowerCase().trim())
		})
	}
  },
	methods: {
		viewProfile(id) {
				this.$router.push('/doctor_profile/'+id)
	},
		getUserDoctorsList() {
			this.$store.dispatch('doctor/getUserDoctorsList')
		},
		sendMessage(id) {
			this.$router.push('/chat_page/' + id)
		},
		favoriteIt(id) {
			this.isFavoriteClicked = true
			doctorApi.favoriteUnfavoriteDoctor(id).then(response => {
				this.isFavoriteClicked = false
				this.$store.dispatch('doctor/getUserDoctorsList')
		})
	}
  },
	mounted () {
	if(!this.isDoctorsList){
		this.getUserDoctorsList()
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
