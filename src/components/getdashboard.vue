<template >
	<div>

	</div>

</template >
<script >
import router from '../router'
export default {
	name: "getdashboard",
  mounted () {
		let role = localStorage.getItem('role')
			if(role == 'Doctor'){
				router.push('/doctor')
			} else if (role == 'ClinicManager') {
				router.push('/clinic')
			} else if (role == 'Doctor,ClinicManager') {
				router.push('/doctor')
			}
		}
}
</script >
