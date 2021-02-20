import { SixerrApp } from './pages/SixerrApp.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { GigEdit } from './pages/GigEdit.jsx'
import { Profile } from './pages/Profile.jsx'
import { Checkout } from './pages/Checkout.jsx'
import { GigHome } from './pages/GigHome.jsx'

export const routes = [
    {
        path:'/gig/edit/:gigId?',
        component: GigEdit
    },
    {
        path:'/gig/checkout/:gigId?',
        component:Checkout
    },
    {
        path:'/gig/:gigId',
        component: GigDetails
    },
    {
        path:'/gig',
        component: SixerrApp
    },
    {
        path:'/gig/edit/:gigId?',
        component: GigEdit
    },
    {
        path:'/profile',
        component: Profile
    },
    {
        path:'/',
        component: GigHome
    }

]