<template >
	<form>
		<div class="form-group bg-white rounded px-2 py-2 shadow">
			<div class="row">
				<div class="col-4 col-md-4">
					<div class="input-group input-group-transparent">
						<div class="input-group-prepend">
							<span class="input-group-text border-0"><i class="fas fa-search"></i></span>
						</div>
						<input type="text" class="form-control border-0 shadow-none" placeholder="speciality, treatment, doctor name..." v-model="speciality">
					</div>
				</div>
				<div class="col-3 col-md-3">
					<div class="input-group input-group-transparent shadow-none">
						<div class="input-group-prepend">
							<span class="input-group-text border-0"><i class="fas fa-map-marker"></i></span>
						</div>
						<input type="text" class="form-control border-0 shadow-none" placeholder="city, location" v-model="city">
					</div>
				</div>
				<div class="col-3 col-md-3">
					<div class="input-group input-group-transparent shadow-none">
						<div class="input-group-prepend">
							<span class="input-group-text border-0"><i class="fas fa-file"></i></span>
						</div>
						<input type="text" class="form-control border-0 shadow-none" placeholder="insurance plan provider..." v-model="insurance">
					</div>
				</div>
				<div class="col-2 col-md-2">
					<button type="button" @click="findDoctors" class="btn btn-block btn-primary">
						<span class="d-none d-md-block" ><i class="fas fa-search"></i></span>
					</button>
				</div>
			</div>
		</div>
	</form>
</template >
<script >
  export default {
    name: "search-bar",
    data () {
    	return {
    		speciality: '',
    		city: '',
    		insurance: ''
	    }
    },
    methods: {
    	findDoctors() {
    		this.$router.push({path: 'search', query: {speciality: this.speciality, city: this.city, insurance: this.insurance}})
	        this.$emit('searched')
	    }
    }
  }
</script >
<style scoped >
</style >
