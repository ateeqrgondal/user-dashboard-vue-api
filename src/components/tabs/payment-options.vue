<template >
	<div class="card-body">
		<div class="row">
			<div class="col-md-12" >
				<div class="card">
					<div class="card-body">
						<div class="card-sub" style="cursor: pointer" data-toggle="collapse" data-target="#payment_form_collapse" aria-expanded="false" aria-controls="collapseExample">
							Add Payment Option
						</div>
						<div class="row collapse"  id="payment_form_collapse" data-vv-scope="experience">
							<div class="col-md-12">
								<div class="form-group " :class="{'has-error has-feedback' : errors.has('name')}">
									<label  class="placeholder"><b>Payment Option Name</b></label>
									<input  type="text" class="form-control input-pill" placeholder="name" v-model="paymentOption.name"  v-validate="'required'" name="name">
									<small class="form-text text-muted" v-show="errors.has('name')">{{errors.first('name')}}</small>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group " :class="{'has-error has-feedback' : errors.has('description')}">
									<label  class="placeholder"><b>Description</b></label>
									<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="description" v-model="paymentOption.description"  v-validate="'required'" name="description"></textarea>
									<small class="form-text text-muted" v-show="errors.has('description')">{{errors.first('description')}}</small>
								</div>
							</div>
							<div class="col-md-12">
								<div class="text-right mt-3 mb-3">
									<button class="btn btn-success" @click="addPaymentOption()">Save</button>&nbsp;
									<button class="btn btn-danger" @click="reset()">Reset</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row" v-if="isPaymentOptions">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body">
						<div class="card-sub">
							Payment Options
						</div>
						<table class="table table-striped mt-3">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">name</th>
									<th scope="col">actions</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(paymentOption, index) in paymentOptions">
									<td>{{index+1}}</td>
									<th>{{paymentOption.name}} <br>
										<small>{{paymentOption.description}}</small>
									</th>
									<td>
										<div class="btn-group btn-group-sm btn-group-page-header ml-auto">
											<button type="button" class="btn btn-light btn-round btn-page-header-dropdown " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												<i class="fa fa-ellipsis-h"></i>
											</button>
											<div class="arrow"></div>
											<div class="dropdown-menu">
												<a class="dropdown-item small" href="#" data-toggle="modal" data-target="#add_appointment" @click="deleteExperience(paymentOption.id)">delete</a>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template >
<script >
export default {
  name: "payment-options",
  data () {
	return {
		paymentOption: {
			name: '',
			description: ''
		}
	}
  },
	methods: {
		addPaymentOption() {
			this.$validator.resume()
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.$store.dispatch('doctor/addPaymentOption', this.paymentOption).then(response => {
						if(response.errors) {
							_.forEach(response.errors, (error => {
								this.$notify.notification('error', error, 'danger')
							}))
						} else if(response.success){
							this.$notify.notification('success', response.message)
							this.$store.dispatch('doctor/getPaymentOptions')
							this.reset()
						}
					})
				}
			})
	},
		paymentOptionAction(id) {
			this.$store.dispatch('doctor/removePaymentOption', id).then(response => {
				if(response.errors) {
					_.forEach(response.errors, (error => {
						this.$notify.notification('error', error, 'danger')
					}))
				} else if(response.success){
					this.$notify.notification('success', response.message)
					this.$store.dispatch('doctor/getPaymentOptions')
				}
			})
		},
		resetForm () {
		Object.assign(this.$data, this.$options.data.call(this))
		this.$validator.pause()
	}
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
