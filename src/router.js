import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import DoctorPatients from './views/user/patients.vue'
import DoctorTreatments from './views/user/treatments.vue'
import DoctorAddedPatients from './views/user/added-patients.vue'
import DoctorLocations from './views/user/locations.vue'
import DoctorInsurances from './views/user/insurances.vue'
import DoctorSpecialization from './views/user/specializations.vue'
import PassportCallback from './components/auth/passport/callback'
import GetDashboard from './components/getdashboard'
import DoctorPatientProfile from './views/user/patient-profile'
import DoctorSchedule from './views/user/schedule'
import DoctorPendingAppointments from './views/user/pending-appointments'
import DoctorVerifiedAppointments from './views/user/verified-appointments'
import DoctorCompletedAppointments from './views/user/completed-appointments'
import DoctorRejectedAppointments from './views/user/rejected-appointments'
import DoctorCancelledAppointments from './views/user/cancelled-appointments'
import DoctorAppointmentPage from './views/user/appointment-page'
import DoctorAppointmentDetails from './views/user/appointment-details'
import DoctorConversations from './views/user/conversations'
import DoctorChatPage from './views/user/chat-page'
import DoctorConversation from './views/user/conversation-chat'
import DoctorSettings from './views/user/settings'
import DoctorPublicProfile from './views/user/public-profile'


/**
* User imports
 *  */

import DoctorsList from './views/user/doctors'
import FavoriteDoctorsList from './views/user/favorite-doctors'
import FamilyMembers from './views/user/family-members'
import UserProfile from './views/user/user-profile'
import CreateAppointment from './views/user/create-appointment'
import SearchDoctors from './views/user/search-doctor'
import Search from './views/user/search'


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: [
    {path: '/',name: 'home', component: Home, meta: {requiresAuth: true}},
    {path: '/conversations',name: 'DoctorConversations', component: DoctorConversations, meta: {requiresAuth: true }},
    {path: '/chat_page/:id',name: 'DoctorChatPage', component: DoctorChatPage, meta: {requiresAuth: true }},
    {path: '/conversation/:id',name: 'DoctorConversation', component: DoctorConversation, meta: {requiresAuth: true }},
    {path: '/doctor/settings',name: 'DoctorSettings', component: DoctorSettings , meta: {requiresAuth: true }},
    {path: '/doctor/patients',name: 'DoctorPatients', component: DoctorPatients, meta: {requiresAuth: true }},
    {path: '/pending_appointments',name: 'DoctorPendingAppointments', component: DoctorPendingAppointments, meta: {requiresAuth: true }},
    {path: '/doctor/appointment-page',name: 'DoctorAppointmentPage', component: DoctorAppointmentPage, meta: {requiresAuth: true }},
    {path: '/appointment-details/:id',name: 'DoctorAppointmentDetails', component: DoctorAppointmentDetails, meta: {requiresAuth: true }},
    {path: '/appointment-page/:id',name: 'DoctorAppointmentPage', component: DoctorAppointmentPage, meta: {requiresAuth: true }},
    {path: '/verified_appointments',name: 'DoctorPendingAppointments', component: DoctorVerifiedAppointments, meta: {requiresAuth: true }},
    {path: '/completed_appointments',name: 'DoctorPendingAppointments', component: DoctorCompletedAppointments, meta: {requiresAuth: true }},
    {path: '/rejected_appointments',name: 'DoctorPendingAppointments', component: DoctorRejectedAppointments, meta: {requiresAuth: true }},
    {path: '/cancelled_appointments',name: 'DoctorCancelledAppointments', component: DoctorCancelledAppointments, meta: {requiresAuth: true }},
    {path: '/doctor/schedule',name: 'DoctorSchedule', component: DoctorSchedule, meta: {requiresAuth: true }},
    {path: '/doctor/treatments',name: 'DoctorTreatments', component: DoctorTreatments, meta: {requiresAuth: true }},
    {path: '/doctor/specializations',name: 'DoctorSpecializations', component: DoctorSpecialization, meta: {requiresAuth: true }},
    {path: '/doctor/added_patients',name: 'DoctorAddedPatients', component: DoctorAddedPatients, meta: {requiresAuth: true }},
    {path: '/patient/:id',name: 'DoctorPatientProfile', component: DoctorPatientProfile, meta: {requiresAuth: true }},
    {path: '/doctor/public_profile',name: 'DoctorPublicProfile', component: DoctorPublicProfile, meta: {requiresAuth: true }},
    {path: '/doctor/locations',name: 'DoctorLocations', component: DoctorLocations, meta: {requiresAuth: true }},
    {path: '/doctor/insurances',name: 'DoctorInsurances', component: DoctorInsurances , meta: {requiresAuth: true }},
    { path: '/passport/callback', name: 'passport-callback', component: PassportCallback },
    { path: '/', name: 'dashboard', component: GetDashboard },
    
    /***
     * User Routes
     * */
    {path: '/doctors_list',name: 'DoctorsList', component: DoctorsList, meta: {requiresAuth: true }},
    {path: '/favorite_doctors',name: 'FavoriteDoctorsList', component: FavoriteDoctorsList, meta: {requiresAuth: true }},
    {path: '/family_members',name: 'FamilyMembers', component: FamilyMembers, meta: {requiresAuth: true }},
    {path: '/profile',name: 'UserProfile', component: UserProfile, meta: {requiresAuth: true }},
    {path: '/create_appointment',name: 'CreateAppointment', component: CreateAppointment, meta: {requiresAuth: true }},
    {path: '/doctor_profile/:id',name: 'DoctorPublicProfile', component: DoctorPublicProfile, meta: {requiresAuth: true }},
    {path: '/search_doctors',name: 'SearchDoctors', component: SearchDoctors, meta: {requiresAuth: true }},
    {path: '/search',name: 'Search', component: Search, meta: {requiresAuth: true }},


  ]
})
