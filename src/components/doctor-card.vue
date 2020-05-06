<template >
	<div class="card card-profile shadow--hover">

		<a href="#" class="mx-auto">
			<router-link to="/doctor-profile">
				Doctor Profile
			</router-link>
		</a>
		<div class="card-body p-3 pt-0 text-center">
			<a href="#" @click="getDoctorProfile(doctor.id)">
				<h5 class="mb-0">{{doctor.first_name + ' ' + doctor.last_name}}</h5>
			</a>
			<span class="d-block text-muted mb-3">{{doctor.specializations[0].title}}</span>
			<div class="avatar-group">
				avatars
			</div>
			<div class="mt-3 pt-3 delimiter-top">
				<span class="static-rating static-rating-sm">
				    <i class="star fas fa-star voted"></i>
				    <i class="star fas fa-star voted"></i>
				    <i class="star fas fa-star voted"></i>
				    <i class="star fas fa-star voted"></i>
				    <i class="star fas fa-star voted"></i>
				</span>
			</div>
			<div class="mt-3 pt-3 delimiter-top">
				<router-link to="/signup" class="btn btn-sm btn-success">Get Appointment</router-link>
			</div>
		</div>
	</div>

</template >
<script >
  export default {
    name: "doctor-card",
    props: {
    	doctor: {}
		},
    methods: {
    	getDoctorProfile(id) {
    		this.$router.push('doctor_profile/'+id)
	    }
    }
  }
</script >
<style scoped >
</style >
