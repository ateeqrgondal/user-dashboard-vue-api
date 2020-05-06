<template >
		<div class="row justify-content-center">
		<div class="col-12 col-lg-12 col-xl-12">
			<div class="row align-items-center">
				<div class="col">
					<h6 class="page-pretitle">
						Payments
					</h6>
					<h5 class="page-title">Appointment <small class="text-info"> #FDS9876KD</small></h5>
				</div>
				<div class="col-auto">
					<a href="#" class="btn btn-light btn-border" @click="downloadInvoice">
						Download
					</a>
					<a href="#" class="btn btn-primary ml-2">
						Pay
					</a>
					<a class="dropdown-item" href="#" data-toggle="modal" data-target="#reject-appointment">View Details</a>
				</div>
			</div>
			<div class="page-divider"></div>
			<div class="row">
				<div class="col-md-12">
					<div class="card card-invoice" ref="invoice">
						<div class="card-header">
							<div class="invoice-header">
								<h3 class="invoice-title">
									Appointment
								</h3>
								<div class="invoice-logo">
									<img src="../assets/img/examples/logoinvoice.svg" alt="company logo">
								</div>
							</div>
							<div class="invoice-desc">
								Bandung, West Java, Indonesia<br/>
								Fax 621113
							</div>
						</div>
						<div class="card-body">
							<div class="separator-solid"></div>
							<div class="row">
								<div class="col-md-4 info-invoice">
									<h5 class="sub">Appointment ID</h5>
									<p>#FDS9876KD</p>
								</div>
								<div class="col-md-4 info-invoice">
									<h5 class="sub">Date & Time</h5>
									<p>Dec 21, 2017</p>
								</div>
								<div class="col-md-4 info-invoice">
									<h5 class="sub">Appointment To</h5>
									<p>
										Jane Smith, 1234 Main, Apt. 4B<br/>Springfield, ST 54321
									</p>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="invoice-detail">
										<div class="invoice-top">
											<h3 class="title"><strong>Patient Details</strong></h3>
										</div>
										<div class="invoice-item">
											<div class="table-responsive">
												<table class="table table-borderless">
													<thead>
														<tr>
															<td><strong>Name</strong></td>
															<td  class="text-center">Jehene askjfla alskfj alskfj </td>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td><strong>Age</strong></td>
															<td class="text-center">20</td>
															<td class="text-center"><strong>Sex</strong></td>
															<td class="text-right">Male</td>
														</tr>
														<tr>
															<td><strong>Email</strong></td>
															<td  class="text-center">ateeqrgondal@gmail.com</td>
														</tr>
														<tr>
															<td><strong>Phone #</strong></td>
															<td class="text-right">123456</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card-footer">
							<h6 class="text-uppercase mt-4 mb-3 fw-bold">
								Reason of visit
							</h6>
							<p class="text-muted mb-0">
								We really appreciate your business and if there's anything else we can do, please let us know! Also, should you need us to add VAT or anything else to this order, it's super easy since this is a template, so just ask!
							</p>
							<h6 class="text-uppercase mt-4 mb-3 fw-bold">
								Doctor Remarks
							</h6>
							<p class="text-muted mb-0">
								<br><br><br><br><br><br><br>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template >
<script >
import _ from 'lodash'
import jsPdf from 'jspdf'
import html2Canvas from 'vue-html2canvas'

export default {
	name: "appointment-details",
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
		downloadInvoice() {
			// html2Canvas($("#invoice")).then(canvas => {
			// 	let img = canvas
			// 	var doc = new jsPdf()
			// 	doc.addImage(img,'JPEG',5,5);
			// 	doc.save('invoice.pdf');
			// 	});
			// const el = this.$refs.invoice;
			// const options = {
			// 	type: 'dataURL'
			// }
			// let output =  this.$html2canvas(el, options);
			var doc = new jsPdf()
			// doc.addImage(output,'JPEG',5,5);
			doc.text('helloworld', 10, 10)
			doc.save('invoice.pdf');

		},
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
