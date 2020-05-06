<template >
	<div class="nav-bottom bg-white">
		<h3 class="title-menu d-flex d-lg-none">
			Menu
			<div class="close-menu"> <i class="flaticon-cross"></i></div>
		</h3>
		<ul class="nav page-navigation page-navigation-secondary ">
			<div class="col-md-2"></div>
			<li class="nav-item" id="search_doctors_menu">
				<router-link to="/search_doctors" class="nav-link">
					<i class="link-icon icon-user-follow"></i>
					<span class="menu-title">Search Doctors</span>
				</router-link>
			</li>
			<li class="nav-item submenu">
				<a class="nav-link" href="#">
					<i class="link-icon icon-clock"></i>
					<span class="menu-title">My Appointments</span>
				</a>
				<div class="navbar-dropdown animated fadeIn">
					<ul>
						<li>
							<router-link to="/verified_appointments" >
								Upcoming Appointments
							</router-link>
						</li>
						<li>
							<router-link to="/pending_appointments" >
								Pending Appointments
							</router-link>
						</li>
						<li>
							<router-link to="/completed_appointments" >
								Completed Appointments
							</router-link>
						</li>
						<li>
							<router-link to="/cancelled_appointments" >
								Cancelled Appointments
							</router-link>
						</li>
						<li>
							<router-link to="/rejected_appointments" >
								Rejected Appointments
							</router-link>
						</li>
					</ul>
				</div>
			</li>
			<li class="nav-item submenu" id="doctors_menu">
				<a class="nav-link" href="#">
					<i class="link-icon icon-grid"></i>
					<span class="menu-title">Doctors</span>
				</a>
				<div class="navbar-dropdown animated fadeIn">
					<ul>
						<li>
							<router-link to="/upcoming-appointments" >
								Search Doctors
							</router-link>
						</li>
						<li>
							<router-link to="/doctors_list" >
								My Doctors
							</router-link>
						</li>
						<li>
							<router-link to="/favorite_doctors" >
								Favorite List
							</router-link>
						</li>
					</ul>
				</div>
			</li>
			<li class="nav-item" id="conversations_menu">
				<router-link to="/conversations" class="nav-link">
					<i class="link-icon icon-envelope"></i>
					<span class="menu-title">Conversations</span>
				</router-link>
			</li>
			<li class="nav-item submenu" id="family_menu">
				<a class="nav-link" href="#">
					<i class="link-icon flaticon-users"></i>
					<span class="menu-title">Family</span>
				</a>
				<div class="navbar-dropdown animated fadeIn">
					<ul>
						<li>
							<router-link to="/family_members" >
								Family Members
							</router-link>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template >
<script >
	export default {
		name: "top-menu"
	}
</script >
<style scoped >
</style >
