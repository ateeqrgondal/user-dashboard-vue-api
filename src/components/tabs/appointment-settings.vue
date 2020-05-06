<template >
	<div class="card-body">
		<div class="row">
			<div class="col-md-8" >
				<div class="card">
					<div class="card-body">
						<div class="card-sub">
							Appointment Settings
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group " :class="{'has-error has-feedback' : errors.has('note')}">
									<label  class="placeholder"><b>Default Note</b></label>
									<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="type your note" v-model="defaultNote"  v-validate="'required'" name="note"></textarea>
									<small class="form-text text-muted" v-show="errors.has('note')">{{errors.first('note')}}</small>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group mt-5">
									<button class="btn btn-success" @click="saveNote" >Save</button>&nbsp;
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group " :class="{'has-error has-feedback' : errors.has('length')}">
									<label  class="placeholder"><b>Appointment Slot Length</b><small>minutes</small></label>
									<input  type="number" class="form-control input-pill" placeholder="slot length" v-model="appointmentSlotLength"  v-validate="'required|numeric'" name="length">
									<small class="form-text text-muted" v-show="errors.has('length')">{{errors.first('length')}}</small>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group mt-4">
									<button class="btn btn-success" @click="saveLength">Save</button>&nbsp;
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
import appointmentApi from '../../api/appointment'
export default {
  name: "appointment-settings",
  data () {
	return {
		defaultNote: '',
	    appointmentSlotLength: ''
	}
  },
	methods: {
		saveNote () {
			this.$validator.resume()
			this.$validator.validate('note').then((result) => {
				if (result) {
					appointmentApi.appointmentDefaultNote(this.defaultNote).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$notify.notification('success', response.message)
						}
					})
				}
			})
	},
		saveLength () {
			this.$validator.resume()
			this.$validator.validate('length').then((result) => {
				if (result) {
					appointmentApi.appointmentDefaultLength(this.appointmentSlotLength).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$notify.notification('success', response.message)
						}
					})
				}
			})
	},
		},
	computed: {
		isPaymentOptions () {
			return this.$store.getters['doctor/getPaymentOptions'].length !== 0
		},
		paymentOptions () {
			return this.$store.getters['doctor/getPaymentOptions']
		}

	},
	mounted () {
		if(!this.isPaymentOptions) {
			this.$store.dispatch('doctor/getPaymentOptions')
		}
	},
}
</script >
<style scoped >
</style >
