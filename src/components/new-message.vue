<template >
	<div class="row">
		<div class="col-md-12">
			<div id="basicList" class="card-list">
				<div class="input-icon">
					<input type="text" class="form-control" placeholder="make search ..." v-model="filter">
					<span class="input-icon-addon">
						<i class="fa fa-search"></i>
					</span>
				</div><br>
				<div class="alert alert-info" role="alert" v-show="doctorsList.length == 0">
					No doctors available.
				</div>
				<div class="list" v-for="doctor in filteredDoctorsList" v-show="doctorsList.length">
					<div class="item-list">
						<div class="info-user ml-3">
							<div class="username">{{doctor.first_name + ', ' + doctor.last_name}}</div>
							<div class="status">{{doctor.website}}</div>
						</div>
						<button class="btn btn-icon btn-primary btn-round btn-sm " data-dismiss="modal" @click="sendMessage(doctor.userId)">
							<i class="fa fa-plus"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template >
<script >
	import _ from 'lodash'
	export default {
		name: "new-message",
		data () {
			return {
				filter: '',
				loading: false,
				isClicked: false,
				currentProcessingId: ''
			}
		},
		computed: {
			isDoctorsList () {
				return this.$store.getters['doctor/getUserDoctorsList'].length
			},
			doctorsList () {
				return this.$store.getters['doctor/getUserDoctorsList']
			},
			filteredDoctorsList() {
				return this.doctorsList.filter(ins => {
					return ins.first_name.toLowerCase().includes(this.filter.toLowerCase().trim()) |
					       ins.last_name.toLowerCase().includes(this.filter.toLowerCase().trim())
				})
			}
		},
		methods: {
			sendMessage (id) {
					this.$router.push('/chat_page/' + id)
			}
		},
		mounted () {
			if(!this.isDoctorsList) {
				this.$store.dispatch('doctor/getUserDoctorsList')
			}
		}
	}
</script >
<style scoped >
</style >
