<template >
	<div class="wrapper classic-wrapper">
		<portal-header></portal-header>
		<home></home>
		<portal-footer></portal-footer>
	</div>

</template >

<script >
import portalHeader from './components/portal-header'
import portalFooter from './components/portal-footer'
import Home from "./views/home";

export default {
	name: "dashboard",
    components: {
		Home,portalHeader, portalFooter
	}

}
</script >
<style scoped >
</style >
