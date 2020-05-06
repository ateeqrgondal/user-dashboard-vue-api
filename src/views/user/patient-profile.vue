<template >
	<div class="wrapper classic-wrapper">
		<portal-header></portal-header>
		<div class="classic-grid">
			<sidebar></sidebar>
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
												<li class="nav-item"> <a class="nav-link active show" data-toggle="tab" href="#home" role="tab" aria-selected="true">Profile</a> </li>
											</ul>
										</div>
									</div>
										<div class="card-body">
											<div class="row mt-3">
												<div class="col-md-6">
													<div class="form-group form-group-default">
														<label>First Name</label>
														<input type="text" class="form-control" name="name" placeholder="Name" :value="patient.firstName">
													</div>
												</div>
												<div class="col-md-6">
													<div class="form-group form-group-default">
														<label>Last Name</label>
														<input type="text" class="form-control" name="name" placeholder="Name" :value="patient.lastName">
													</div>
												</div>
												<div class="col-md-6">
													<div class="form-group form-group-default">
														<label>Email</label>
														<input type="email" class="form-control" name="email" placeholder="Name" :value="patient.email">
													</div>
												</div>
											</div>
											<div class="row mt-3">
												<div class="col-md-4">
													<div class="form-group form-group-default">
														<label>Gender</label>
														<select class="form-control" id="gender">
															<option>{{patient.gender}}</option>
															<option>Female</option>
														</select>
													</div>
												</div>
												<div class="col-md-4">
													<div class="form-group form-group-default">
														<label>Phone</label>
														<input type="text" class="form-control" value="+62008765678" name="phone" placeholder="Phone">
													</div>
												</div>
											</div>
											<div class="row mt-3">
												<div class="col-md-12">
													<div class="form-group form-group-default">
														<label>Address</label>
														<input type="text" class="form-control" value="st Merdeka Putih, Jakarta Indonesia" name="address" placeholder="Address">
													</div>
												</div>
											</div>
											<div class="row mt-3 mb-1">
												<div class="col-md-12">
													<div class="form-group form-group-default">
														<label>About Me</label>
														<textarea class="form-control" name="about" placeholder="About Me" rows="3">A man who hates loneliness</textarea>
													</div>
												</div>
											</div>
											<div class="row mt-3 mb-1">
												<div class="col-md-12">
													<div class="card">
														<div class="card-body">
															<h5 class="card-title mb-3">Reviews</h5>
															<h6 class="card-subtitle mb-2 text-muted">somename</h6>
															<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
															<span class="fa fa-star"></span>
															<span class="fa fa-star"></span>
															<span class="fa fa-star"></span>
															<span class="fa fa-star"></span>
															<span class="fa fa-star-half"></span>
														</div>
													</div>
												</div>
											</div>
										</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="card card-profile">
									<div class="card-header" style="background-image: url('../../assets/img/blogpost.jpg')">
										<div class="profile-picture">
											<div class="avatar avatar-xl">
												<img src="../../assets/img/profile.jpg" alt="..." class="avatar-img rounded-circle">
											</div>
										</div>
									</div>
									<div class="card-body">
										<div class="user-profile text-center">
											<div class="name">{{patient.firstName + ' ' + patient.lastName}}, {{patient.age}}</div>
											<div class="job">Frontend Developer</div>
											<div class="desc">A man who hates loneliness</div>
											<div class="social-media">
												<a class="btn btn-info btn-twitter btn-sm btn-link" href="#">
													<span class="btn-label just-icon"><i class="flaticon-twitter"></i> </span>
												</a>
												<a class="btn btn-danger btn-sm btn-link" rel="publisher" href="#">
													<span class="btn-label just-icon"><i class="flaticon-google-plus"></i> </span>
												</a>
												<a class="btn btn-primary btn-sm btn-link" rel="publisher" href="#">
													<span class="btn-label just-icon"><i class="flaticon-facebook"></i> </span>
												</a>
												<a class="btn btn-danger btn-sm btn-link" rel="publisher" href="#">
													<span class="btn-label just-icon"><i class="flaticon-dribbble"></i> </span>
												</a>
											</div>
											<div class="view-profile">
												<a href="#" class="btn btn-secondary btn-block">Book Appointment</a>
											</div>
										</div>
									</div>
									<div class="card-footer">
										<div class="row user-stats text-center">
											<div class="col">
												<div class="number">125</div>
												<div class="title">Post</div>
											</div>
											<div class="col">
												<div class="number">25K</div>
												<div class="title">Followers</div>
											</div>
											<div class="col">
												<div class="number">134</div>
												<div class="title">Following</div>
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
export default {
	name: "patient-profile",
	components: { PortalHeader, Sidebar },
	computed: {
		patient: function () {
			return _.find(this.$store.getters['patient/getAddedPatients'], (patient => {
				return patient.id == this.$route.params.id
			}))
		},
	},
	mounted () {
		this.$store.dispatch('patient/getAddedPatients')
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
