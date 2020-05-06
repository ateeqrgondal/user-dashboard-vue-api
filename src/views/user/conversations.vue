<template >
	<div class="wrapper horizontal-layout-2">
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content content-full">
					<div class="page-navs bg-white">
						<div class="nav-scroller">
							<div class="nav nav-tabs nav-line nav-color-secondary">
								<a class="nav-link active show" data-toggle="tab" href="#tab1">All
									<span class="count ml-1">({{chatHeads.length}})</span>
								</a>
								<!--<a class="nav-link" data-toggle="tab" href="#tab2">Starred</a>-->
								<!--<a class="nav-link" data-toggle="tab" href="#tab3">Trash</a>-->
							</div>
						</div>
					</div>
					<div class="page-inner">
						<div class="row">
							<div class="col-md-12">
								<div class="d-flex justify-content-between">
									<div class="d-md-inline-block">
										<div class="input-group">
											<div class="input-group-prepend">
											<span class="input-group-text bg-white">
												<i class="fa fa-search search-icon"></i>
											</span>
											</div>
											<input type="text" v-model="filter" class="form-control" aria-label="Text input with dropdown button">
										</div>
									</div>
									<div class="form-group">
										<button type="button" class="btn btn-primary btn-round btn-sm " data-toggle="modal" data-target="#add_patient">
															<span class="btn-label">
																<i class="fa fa-pencil-alt"></i>
															</span>
											New Message
										</button>
									</div>

									<!--<button type="button" class="btn btn-success d-none d-sm-inline-block">New Message</button>-->
								</div>

								<section class="card mt-4">
									<div class="list-group list-group-messages list-group-flush">
										<div class="list-group-item read" v-for="chat in filteredChatHeads">
											<div class="list-group-item-figure">
											<span class="rating rating-sm mr-3">
												<input type="checkbox" id="star1" value="1">
												<label for="star1">
													<span class="fa fa-star"></span>
												</label>
											</span>
												<div class="user ">
													<div class="avatar">
														<span class="avatar-title rounded-circle border border-white text-uppercase">{{chat.title[0] +  chat.title[1]}}</span>
													</div>
												</div>
											</div>
											<div class="list-group-item-body pl-3 pl-md-4">
												<div class="row">
													<div class="col-12 col-lg-10">
														<h4 class="list-group-item-title">
															<a href="javascript:void(0)" @click="moveToChatPage(chat.id)">{{chat.title}}</a>
														</h4>
														<p class="list-group-item-text text-truncate"> {{chat.chats[chat.chats.length-1].message}} </p>
													</div>
													<div class="col-12 col-lg-2 text-lg-right">
														<p class="list-group-item-text"> {{ chat.createdAt.date | moment("from", "now")}} </p>
													</div>
												</div>
											</div>
											<div class="list-group-item-figure">
												<div class="dropdown">
													<button class="btn-dropdown" data-toggle="dropdown">
														<i class="icon-options-vertical"></i>
													</button>
													<div class="dropdown-arrow"></div>
													<div class="dropdown-menu dropdown-menu-right">
														<a href="#" class="dropdown-item">Mark as read</a>
														<a href="#" class="dropdown-item">Mark as unread</a>
														<a href="#" class="dropdown-item">Toggle star</a>
														<a href="#" class="dropdown-item">Trash</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>

							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<!-- Modal To Add Patient -->
		<div v-show="showModal == true" class="modal fade" id="add_patient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">New Message</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<new-message></new-message>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal To Add Patient -->
	</div>
</template >
<script >
import PortalHeader from "../../components/portal-header";
import NewMessage from "../../components/new-message";

export default {
  name: "conversations",
  components: { NewMessage, PortalHeader },
  data () {
	return {
		filter: '',
		scheduleId: 4,
		showModal: true,
		slotButton: []
	}
  },
  computed: {
	isChatHeads(){
		return this.$store.getters['chat/getChatHeads'].length !==0
	},
	chatHeads (){
		return this.$store.getters['chat/getChatHeads']
	},
	filteredChatHeads() {
		return this.chatHeads.filter(conversation => {
			return conversation.title.toLowerCase().includes(this.filter.toLowerCase().trim())
		})
	}
  },
	methods: {
	moveToChatPage(id) {
		this.$router.push('/conversation/' + id)
	}
  },
	mounted () {
	if(!this.isChatHeads){
		this.$store.dispatch('chat/getChatHeads')
    }
	$('#conversations_menu').addClass('active')
	},
}
</script >
<style scoped >

	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: .4s;
		transition: .4s;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: .4s;
		transition: .4s;
	}

	input:checked + .slider {
		background-color: #2196F3;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #2196F3;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style >
