<template >
		<div class="row">
			<div class="col-md-6">
				<div class="form-group " :class="{'has-error has-feedback' : errors.has('first name')}">
					<label  class="placeholder"><b>First Name</b></label>
					<input  type="text" class="form-control input-pill" placeholder="first name" v-model="patient.firstName"  v-validate="'required|alpha'" name="first name">
					<small class="form-text text-muted" v-show="errors.has('first name')">{{errors.first('first name')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group " :class="{'has-error has-feedback' : errors.has('last name')}">
					<label  class="placeholder"><b>Last Name</b></label>
					<input  type="text" class="form-control input-pill" placeholder="last name" v-model="patient.lastName"  v-validate="'required|alpha'" name="last name">
					<small class="form-text text-muted" v-show="errors.has('last name')">{{errors.first('last name')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group " :class="{'has-error has-feedback' : errors.has('age')}">
					<label  class="placeholder"><b>Age</b></label>
					<input  type="number" class="form-control input-pill" placeholder="age" v-model="patient.age"  v-validate="'required|numeric'" name="age">
					<small class="form-text text-muted" v-show="errors.has('age')">{{errors.first('age')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group " :class="{'has-error has-feedback' : errors.has('email')}">
					<label  class="placeholder"><b>Email</b></label>
					<input  type="email" class="form-control input-pill" placeholder="email"  v-model="patient.email" v-validate="'required|email'" name="email">
					<small class="form-text text-muted" v-show="errors.has('email')">{{errors.first('email')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group" :class="{'has-error has-feedback' : errors.has('gender')}">
					<label class="form-label">Gender</label>
					<div class="selectgroup w-100">
						<label class="selectgroup-item">
							<input type="radio" name="gender"  value="male" v-model="patient.gender" class="selectgroup-input" v-validate="'required'">
							<span class="selectgroup-button">MALE</span>
						</label>
						<label class="selectgroup-item">
							<input type="radio"  value="female" name="gender" v-model="patient.gender" class="selectgroup-input" >
							<span class="selectgroup-button">FEMALE</span>
						</label>
					</div>
					<small class="form-text text-muted" v-show="errors.has('gender')">{{errors.first('gender')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group" :class="{'has-error has-feedback' : errors.has('status')}">
					<label class="form-label">Relationship Status</label>
					<div class="selectgroup w-100">
						<label class="selectgroup-item">
							<input type="radio" name="status"  value="single" v-model="patient.status" class="selectgroup-input">
							<span class="selectgroup-button">SINGLE</span>
						</label>
						<label class="selectgroup-item">
							<input type="radio"  value="married" name="gender" v-model="patient.status" class="selectgroup-input" >
							<span class="selectgroup-button">MARRIED</span>
						</label>
					</div>
					<small class="form-text text-muted" v-show="errors.has('status')">{{errors.first('status')}}</small>
				</div>
			</div>
			<div class="col-md-12 modal-footer">
				<div class="pull-right">
					<button class="btn btn-primary btn-border btn-round" data-dismiss="modal" ref="closeModal">Cancel</button>&nbsp;
					<button class="btn btn-primary btn-round" @click="addPatient">Save</button>
				</div>
			</div>
		</div>
</template >
<script >
import _ from 'lodash'
export default {
	name: "patient-form",
	data () {
		return {
			patient: {
				firstName: '',
				lastName: '',
				age: '',
				gender: '',
				email: '',
				status: ''
			}
		}
    },
	methods: {
		addPatient() {
			this.$validator.resume()
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.$store.dispatch('patient/addPatient', this.patient).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$refs.closeModal.click()
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$refs.closeModal.click()
							this.$notify.notification('success', response.message)
							this.$store.dispatch('patient/getAddedPatients')
							this.resetForm()
						}
					})
				}
			})
		},
		resetForm () {
			Object.assign(this.$data, this.$options.data.call(this))
			this.$validator.pause()
		}
	}
}
</script >
<style scoped >
</style >
