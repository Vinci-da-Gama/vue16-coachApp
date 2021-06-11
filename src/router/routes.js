import CoachesList from '../views/coaches/CoachesList.vue'
import { routerConstant } from '../constants/routerConstant';

export const routes = [
	{ ...routerConstant.redirect },
	{
		...routerConstant.coaches,
		component: CoachesList
	},
	{
		...routerConstant.coachesId,
		component: () => import("../views/coaches/CoachDetail.vue"),
		props: true,
		children:[
			{
				...routerConstant.contact,
				component: () => import("../views/request/ContactCoach.vue")
			}
		]
	},
	{
		...routerConstant.register,
		component: () => import("../views/coaches/CoachRegistration.vue")
	},
	{
		...routerConstant.requests,
		component: () => import("../views/request/RequestsReceived.vue")
	},
	{
		...routerConstant.noFound,
		component: () => import("../views/NoFound.vue")
	}
]
