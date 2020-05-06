<template >
	<div class="row">
		<div class="col-md-12">
			<div class="form-group " :class="{'has-error has-feedback' : errors.has('note')}">
				<label  class="placeholder"><b>Refer To</b></label>
				<model-select :options="doctorsListOptions"
					v-model="appointmentNote.doctorId"
					placeholder="select doctor">
				</model-select>
				<small class="form-text text-muted" v-show="errors.has('note')">{{errors.first('note')}}</small>
			</div>
		</div>

		<div class="col-md-12">
			<div class="form-group " :class="{'has-error has-feedback' : errors.has('note')}">
				<label  class="placeholder"><b>Reason</b></label>
				<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="appointment note" v-model="appointmentNote.referNote"  v-validate="'required'" name="note"></textarea>
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
import appointmentApi from '../api/appointment'
import { ModelSelect } from 'vue-search-select'
export default {
	props: ['appointment'],
	name: "appointment-refer",
    components: {
		ModelSelect
    },
	data () {
		return {
			item: {
				value: '',
				text: ''
			},
			appointmentNote: {
				referNote: '',
				type: 'refer',
				doctorId: ''
			},
			loading : false
		}
    },
    computed: {
		isListDoctors () {
			return this.$store.getters['doctor/getDoctorsList'].length !== 0
		},
		doctorsList () {
			return this.$store.getters['doctor/getDoctorsList']
		},
		doctorsListOptions () {
			return _.map(this.doctorsList, (doctor => {
				return {
					text: doctor.first_name + ' ' + doctor.last_name,
					value: doctor.id
				}
			}))
		}
    },
	methods: {
		addNote() {
			this.$validator.resume()
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.loading = true
					appointmentApi.referAppointment ( this.appointment.id, this.appointmentNote ).then ( response => {
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
	},
    mounted () {
		if(!this.isListDoctors) {
			this.$store.dispatch('doctor/getDoctorsList')
		}
    }
}
</script >
<style scoped >
</style >
