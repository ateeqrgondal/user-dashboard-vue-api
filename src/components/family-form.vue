<template >
		<div class="row">
			<div class="col-md-6">
				<div class="form-group " :class="{'has-error has-feedback' : errors.has('first name')}">
					<label  class="placeholder"><b>First Name</b></label>
					<input  type="text" class="form-control input-pill" placeholder="business trading name" v-model="familyMember.firstName"  v-validate="'required|alpha'" name="first name">
					<small class="invalid-feedback" v-show="errors.has('first name')">{{errors.first('first name')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group " :class="{'has-error has-feedback' : errors.has('last name')}">
					<label  class="placeholder"><b>Last Name</b></label>
					<input  type="text" class="form-control input-pill" placeholder="last name" v-model="familyMember.lastName"  v-validate="'required|alpha'" name="last name">
					<small class="form-text text-muted" v-show="errors.has('last name')">{{errors.first('last name')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group " :class="{'has-error has-feedback' : errors.has('age')}">
					<label  class="placeholder"><b>Age</b></label>
					<input  type="number" class="form-control input-pill" placeholder="age" v-model="familyMember.age"  v-validate="'required|numeric'" name="age">
					<small class="form-text text-muted" v-show="errors.has('age')">{{errors.first('age')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group" :class="{'has-error has-feedback' : errors.has('gender')}">
					<label class="form-label">Gender</label>
					<div class="selectgroup w-100">
						<label class="selectgroup-item">
							<input type="radio" name="gender"  value="male" v-model="familyMember.gender" class="selectgroup-input" v-validate="'required'">
							<span class="selectgroup-button">MALE</span>
						</label>
						<label class="selectgroup-item">
							<input type="radio"  value="female" name="gender" v-model="familyMember.gender" class="selectgroup-input" >
							<span class="selectgroup-button">FEMALE</span>
						</label>
					</div>
					<small class="form-text text-muted" v-show="errors.has('gender')">{{errors.first('gender')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group " :class="{'has-error has-feedback' : errors.has('relation')}">
					<label  class="placeholder"><b>Relation</b></label>
					<input  type="text" class="form-control input-pill" placeholder="relation" v-model="familyMember.relation"  v-validate="'required|alpha'" name="relation">
					<small class="form-text text-muted" v-show="errors.has('relation')">{{errors.first('relation')}}</small>
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
	name: "family-form",
	data () {
		return {
			familyMember: {
				firstName: '',
				lastName: '',
				age: '',
				gender: '',
				relation: ''
			}
		}
    },
	methods: {
		addPatient() {
			this.$validator.resume()
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.$store.dispatch('patient/addFamilyMember', this.familyMember).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$refs.closeModal.click()
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$refs.closeModal.click()
							this.$notify.notification('success', response.message)
							this.$store.dispatch('patient/getFamilyMembers')
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
