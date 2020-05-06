<template >
	<div class="row">
		<div class="col-md-12">
			<div class="form-group " :class="{'has-error has-feedback' : errors.has('title')}">
				<label  class="placeholder"><b>Title</b></label>
				<input  type="text" class="form-control input-pill" placeholder="title" v-model="treatment.title"  v-validate="'required'" name="title">
				<small class="form-text text-muted" v-show="errors.has('title')">{{errors.first('title')}}</small>
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group " :class="{'has-error has-feedback' : errors.has('description')}">
				<label  class="placeholder"><b>Description</b></label>
				<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="treatment description" v-model="treatment.description"  v-validate="'required'" name="description"></textarea>
				<small class="form-text text-muted" v-show="errors.has('description')">{{errors.first('description')}}</small>
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group " :class="{'has-error has-feedback' : errors.has('price')}">
				<label  class="placeholder"><b>Treatment Price</b></label>
				<input  type="text" class="form-control input-pill" placeholder="price" v-model="treatment.price"  name="price">
				<small class="form-text text-muted" v-show="errors.has('price')">{{errors.first('price')}}</small>
			</div>
		</div>

		<div class="col-md-12 modal-footer">
			<div class="pull-right">
				<button class="btn btn-primary btn-border btn-round" data-dismiss="modal" ref="closeModal">Cancel</button>&nbsp;
				<button class="btn btn-primary btn-round" @click="addTreatment" :class="{'is-loading' : loading == true}">Save</button>
			</div>
		</div>
	</div>
</template >
<script >
import _ from 'lodash'
export default {
	name: "treatment-form",
	data () {
		return {
			treatment: {
				title: '',
				description: '',
				price: ''
			},
			loading : false
		}
    },
	methods: {
		addTreatment() {
			this.$validator.resume()
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.loading = true
					this.$store.dispatch('doctor/addTreatment', this.treatment).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$refs.closeModal.click()
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$refs.closeModal.click()
							this.$notify.notification('success', response.message)
							this.$store.dispatch('doctor/getTreatments')
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
