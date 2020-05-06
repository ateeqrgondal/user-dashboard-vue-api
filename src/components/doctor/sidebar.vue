<template >
	<!-- Sidebar -->
		<div class="sidebar">
			<div class="sidebar-wrapper scrollbar scrollbar-inner">
				<div class="sidebar-content">
					<div class="user">
						<div class="avatar-sm float-left mr-2" v-if="user.avatar">
							<img :src="user.avatar" alt="..." class="avatar-img rounded-circle">
						</div>
						<div class="info">
							<a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
									<span>
										{{user.first_name }}
										<star-rating :rating="rating" :star-size="20" :read-only="true" :increment="0.01"></star-rating>
										<span class="caret"></span>
									</span>
							</a>
							<div class="clearfix"></div>

							<div class="collapse in" id="collapseExample">
								<ul class="nav">
									<li>
										<a href="#profile">
											<span class="link-collapse">My Profile</span>
										</a>
									</li>
									<li>
										<a href="#edit">
											<span class="link-collapse">Edit Profile</span>
										</a>
									</li>
									<li>
										<a href="#settings">
											<span class="link-collapse">Settings</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<ul class="nav nav-secondary">
						<li class="nav-item" id="dashboard">
							<router-link to="/doctor">
								<i class="fas fa-home"></i>
								<p>Dashboard</p>
							</router-link>
						</li>
						<li class="nav-section">
								<span class="sidebar-mini-icon">
									<i class="fa fa-ellipsis-h"></i>
								</span>
							<h4 class="text-section">Reports</h4>
						</li>
						<li class="nav-item" id="conversationsmenu">
							<router-link to="/doctor/conversations" >
									<i class="fa fa-envelope"></i>
									<p>Conversations</p>
							</router-link>
						</li>
						<li class="nav-item" id="schedulemenu">
							<router-link to="/doctor/schedule" >
									<i class="fa fa-user-clock"></i>
									<p>Schedule</p>
							</router-link>
						</li>
						<li class="nav-item" id="appointmentsmenu">
							<a data-toggle="collapse" href="#appointmentssubmenu">
								<i class="fa fa-clock"></i>
								<p>Appointments</p>
								<span class="caret"></span>
							</a>
							<div class="collapse" id="appointmentssubmenu">
								<ul class="nav nav-collapse" style="margin-top: -10px; margin-left: 20px">
									<li>
										<router-link to="/doctor/pending_appointments">
											<span class="sub-item">Pending</span>
										</router-link>
									</li>
									<li>
										<router-link to="/doctor/verified_appointments">
											<span class="sub-item">Verified</span>
										</router-link>
									</li>
									<li>
										<router-link to="/doctor/completed_appointments">
											<span class="sub-item">Completed</span>
										</router-link>
									</li>
									<li>
										<router-link to="/doctor/rejected_appointments">
											<span class="sub-item">Rejected</span>
										</router-link>
									</li>
									<li>
										<router-link to="/doctor/cancelled_appointments">
											<span class="sub-item">Cancelled by User</span>
										</router-link>
									</li>
								</ul>
							</div>
						</li>

						<li class="nav-item" id="locationsmenu">
							<router-link to="/doctor/locations" >
									<i class="fa fa-map-marked"></i>
									<p>Locations</p>
							</router-link>
						</li>
						<li class="nav-item" id="patientsmenu">
							<a data-toggle="collapse" href="#patientssubmenu">
								<i class="fas fa-user"></i>
								<p>Patients</p>
								<span class="caret"></span>
							</a>
							<div class="collapse" id="patientssubmenu">
								<ul class="nav nav-collapse" style="margin-top: -10px; margin-left: 20px">
									<li>
										<router-link to="/doctor/patients">
											<span class="sub-item">Taken Appointments</span>
										</router-link>
									</li>
									<li>
										<router-link to="/doctor/added_patients">
											<span class="sub-item">Added Patients</span>
										</router-link>
									</li>
								</ul>
							</div>
						</li>

						<li class="nav-item" id="insurancemenu">
							<router-link to="/doctor/insurances">
									<i class="fa fa-shield-alt"></i>
									<p>Insurances</p>
							</router-link>
						</li>
						<li class="nav-item" id="treatmentsmenu">
							<router-link to="/doctor/treatments">
								<i class="icon-briefcase"></i>
								<p>Treatments</p>
							</router-link>
						</li>
						<li class="nav-item" id="specializationsmenu">
							<router-link to="/doctor/specializations">
									<i class="fa fa-map-marked"></i>
									<p>Specializations</p>
							</router-link>
						</li>
						<li class="nav-section">
								<span class="sidebar-mini-icon">
									<i class="fa fa-ellipsis-h"></i>
								</span>
							<h4 class="text-section">Finance</h4>
						</li>
						<li class="nav-item">
							<a href="starter-template.html">
								<i class="far fa-file-excel"></i>
								<p>Annual Report</p>
							</a>
						</li>
						<li class="nav-item">
							<a href="starter-template.html">
								<i class="fas fa-file-contract"></i>
								<p>HR Report</p>
							</a>
						</li>
						<li class="nav-item">
							<a href="starter-template.html">
								<i class="fas fa-chart-bar"></i>
								<p>Finance Report</p>
							</a>
						</li>
						<li class="nav-item">
							<a href="starter-template.html">
								<i class="icon-briefcase"></i>
								<p>Revenue Report</p>
							</a>
						</li>
						<li class="nav-item">
							<a href="starter-template.html">
								<i class="fas fa-print"></i>
								<p>IPO Report</p>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	<!-- End Sidebar -->
</template >
<script >
	export default {
	name: "doctor-sidebar",
	computed: {
		user () {
			return this.$store.getters['user/get']
		},
		reviews () {
			return this.$store.getters['doctor/getReviews']
		},
		rating () {
			return _.meanBy(this.reviews, 'rating')
		}
	},
    mounted () {
	    if(!this.isReviews) {
		    this.$store.dispatch('doctor/getReviews')
	    }
    }
}
</script >
<style scoped >
</style >
