<template >
	<div class="wrapper horizontal-layout-2">
		<portal-header></portal-header>
		<div class="classic-grid">
			<div class="main-panel">
				<div class="content">
					<div class="page-inner">
						<div class="page-header">
							<h4 class="page-title">Conversation</h4>
							<div class="btn-group btn-group-page-header ml-auto">
								<button type="button" class="btn btn-light btn-round btn-page-header-dropdown dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i class="fa fa-ellipsis-h"></i>
								</button>
								<div class="dropdown-menu">
									<div class="arrow"></div>
									<a class="dropdown-item" href="#">Book Appointment</a>
									<a class="dropdown-item" href="#">Send Message</a>
									<a class="dropdown-item" href="#">Something else here</a>
									<div class="dropdown-divider"></div>
									<a class="dropdown-item" href="#">Separated link</a>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-10">
								<div class="card">
									<div class="card-header">
										<div class="card-head-row">
											<div class="card-title">
														<div class="user ">
															<div class="avatar">
																<span class="avatar-title text-uppercase rounded-circle border border-white"><span class="fa fa-envelope-open"></span></span>
															</div>
														</div>
												{{user.first_name + ', ' + user.last_name}}
											</div>
										</div>
									</div>
									<div class="card" v-for="chat in chatHead.chats">
										<div class="card-body">
											<h4 class="card-title mb-1">{{chat.user.firstName}}</h4>
											<p class="card-text">{{chat.message}}</p>
											<div v-for="attachment in chat.attachments">
												<a :href="attachment.attachment">{{attachment.attachment}}</a>
											</div>
										</div>
										<small class="card-footer text-muted">{{ chat.createdAt.date | moment("from", "now")}}</small>
										<!--<div class="card-footer text-muted">-->
											<!--2 days ago-->
										<!--</div>-->
									</div>
									<div class="card-footer" style="background: #f1f1f1" :class="{'is-loading' : loading == true}">
										<div class="form-group " :class="{'has-error has-feedback' : errors.has('message')}">
											<label  class="placeholder"><b>new message</b></label>
											<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="type your message" v-model="conversation.message"  v-validate="'required'" name="message"></textarea>
											<small class="form-text text-muted" v-show="errors.has('message')">{{errors.first('message')}}</small>
										</div>
										<div>
											<div class="text-right">
												<ul class="list-inline">
														<li class="list-inline-item" v-for="(file,index) in conversation.files">
															<span class="badge badge-secondary">{{file.name}}</span>&nbsp;<span class="fas fa-times" @click="removeAttachment(index)"></span>&nbsp;&nbsp;&nbsp;
														</li>
												</ul>
											</div>
										</div>
										<div class="input-file input-file-image text-right" style="margin-right: 10px">
											<input type="file" class="form-control form-control-file" id="uploadImg2" name="profile picture" v-validate="'ext:jpeg,jpg,png,pdf,txt'" data-vv-as="field"  @change="uploadAttachment($event)" >
											<label for="uploadImg2" class="  label-input-file btn btn-default btn-xs btn-round">
													<span class="btn-label">
														<i class="fa fa-paperclip"></i>
													</span>
												attachment
											</label>
											<small class="form-text text-muted" v-show="errors.has('profile picture')">{{errors.first('profile picture')}}</small>
										</div><br>
										<div class="card-footer text-right">
											<button class="btn btn-secondary btn-round" @click="sendMessage">send</button>
										</div>
									</div>
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
import PortalHeader from "../../components/portal-header";
import chatApi from "../../api/chat";
export default {
	name: "chat-page",
	components: { PortalHeader },
	data () {
		return {
			loading: false,
			isClicked: false,
			conversation: {
				message: '',
				chatHeadId: '',
				userId: '',
				files: []
			}
		}
	},
	computed: {
		user() {
			return this.$store.getters['user/getUser']
		},
		chatHead() {
			return this.$store.getters['chat/getUserChat']
		}
	},
	methods: {
		moment (moment) {
			return moment(moment).fromNow()
		},
		uploadAttachment(e){
			let files = (e.target.files || e.dataTransfer.files) [0]
			let file = {
				name: files.name,
				file: files,
			}
			this.conversation.files.push(file)
		},
		sendMessage() {
			this.$validator.resume()
			this.$validator.validateAll().then(result => {
				if(result){
					this.loading = true
					let formData = new FormData
					if(this.conversation.files.length){
						_.forEach(this.conversation.files, (file => {
							formData.append('files[' + file.name + ']',file.file)
						}))
					}
					formData.append('message', this.conversation.message)
					if(!this.chatHead.id){
						formData.append('receiverId', this.$route.params.id)
					}
					formData.append('chatHeadId', this.chatHead.id ? this.chatHead.id : '' )
					chatApi.sendMessage(formData).then ( response => {
						if ( response.success ) {
							this.$store.dispatch('chat/getUserChat', this.$route.params.id)
							this.loading   = false
							this.resetForm()
						}
					} )
				}
			})
		},
		removeAttachment(i){
			this.conversation.files.splice(i, 1);
		},
		resetForm () {
			Object.assign(this.$data, this.$options.data.call(this))
			this.$validator.pause()
		}
	},
	mounted () {
			this.$store.dispatch('user/getUser', this.$route.params.id)
			this.$store.dispatch('chat/getUserChat', this.$route.params.id)
	}
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

	.list-inline li {
		display: inline
	}
</style >
