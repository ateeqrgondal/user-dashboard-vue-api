<template >
	<div class="row">
		<div class="col-md-12">
			<div class="form-group " :class="{'has-error has-feedback' : errors.has('note')}">
				<label  class="placeholder"><b>Completion Note</b></label>
				<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="appointment note" v-model="appointmentNote.note"  v-validate="'required'" name="note"></textarea>
				<small class="form-text text-muted" v-show="errors.has('note')">{{errors.first('note')}}</small>
			</div>
		</div>
		<div class="col-md-12 modal-footer">
			<div class="pull-right">
				<button class="btn btn-primary btn-border btn-round" data-dismiss="modal" ref="closeModal">Cancel</button>&nbsp;
				<button class="btn btn-primary btn-round" @click="addNote" :class="{'is-loading' : loading == true}">Save</button>
			</div>
		</div>
	</div>
</template >
<script >
import _ from 'lodash'
import appointmentApi from '../api/appointment'
export default {
	props: ['appointment'],
	name: "appointment-note",
	data () {
		return {
			appointmentNote: {
				note: '',
				type: 'complete'
			},
			loading : false
		}
    },
	methods: {
		addNote() {
			this.$validator.resume()
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.loading = true
					appointmentApi.completeAppointment ( this.appointment.id, this.appointmentNote ).then ( response => {
						if ( response.success ) {
							this.$refs.closeModal.click()
							this.$store.dispatch('appointment/getAppointment', this.$route.params.id)
							this.$notify.notification ( 'success', response.message )
							this.loading   = false
							this.resetForm()
						}
					} )
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
