<template >
		<div class="row">
			<div class="col-md-12">
				<div class="form-group" :class="{'has-error has-feedback' : errors.has('date')}">
					<label>Date</label>
					<div class="input-group">
						<input type="text" class="form-control datepicker"  placeholder="date" name="date"  v-model="schedule.date" v-validate="'required'" >
						<div class="input-group-append">
						<span class="input-group-text">
							<i class="fa fa-calendar"></i>
						</span>
					</div>
					</div>
					<small class="form-text text-muted" v-show="errors.has('date')">{{errors.first('date')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group" :class="{'has-error has-feedback' : errors.has('start time')}">
					<label>Start Time</label>
					<div class="input-group">
						<input type="text" class="form-control timepicker"  placeholder="start time" name="start time"  v-model="schedule.startTime" v-validate="'required'" >
						<div class="input-group-append">
						<span class="input-group-text">
							<i class="fa fa-clock"></i>
						</span>
						</div>
					</div>
					<small class="form-text text-muted" v-show="errors.has('start time')">{{errors.first('start time')}}</small>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group" :class="{'has-error has-feedback' : errors.has('end time')}">
					<label>End Time</label>
					<div class="input-group">
						<input type="text" class="form-control timepicker"  placeholder="end time" name="end time"  v-model="schedule.endTime" v-validate="'required'" >
						<div class="input-group-append">
						<span class="input-group-text">
							<i class="fa fa-clock"></i>
						</span>
						</div>
					</div>
					<small class="form-text text-muted" v-show="errors.has('end time')">{{errors.first('end time')}}</small>
				</div>
			</div>

			<div class="col-md-12 modal-footer">
				<div class="pull-right">
					<button class="btn btn-primary btn-border btn-round" data-dismiss="modal" ref="closeModal">Cancel</button>&nbsp;
					<button class="btn btn-primary btn-round" @click="addSchedule">Save</button>
				</div>
			</div>
		</div>
</template >
<script >
import _ from 'lodash'
export default {
	name: "schedule-form",
	data () {
		return {
			schedule: {
				date: '',
				startTime: '',
				endTime: ''
			}
		}
    },
	methods: {
		addSchedule() {
			this.$validator.resume()
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.$store.dispatch('doctor/addSchedule', this.schedule).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$refs.closeModal.click()
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$refs.closeModal.click()
							this.$notify.notification('success', response.message)
							this.$store.dispatch('doctor/getSchedule')
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
	},
	mounted () {
		$('.datepicker').datetimepicker({
            format: 'MM/DD/YYYY',
        });
		$('.timepicker').datetimepicker({
            format: 'h:mm A',
        });
	}
}
</script >
<style scoped >
</style >
