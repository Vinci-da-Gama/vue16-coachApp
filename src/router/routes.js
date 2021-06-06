import Coaches from '../views/Coaches.vue'
import { routerConstant } from '../constants/routerConstant';

export const routes = [
	{ ...routerConstant.redirect },
	{
		...routerConstant.coaches,
		component: Coaches
	},
	{
		...routerConstant.coachesId,
		component: null,
		children:[
			{
				...routerConstant.contact,
				component: null
			}
		]
	},
	{
		...routerConstant.register,
		component: null
	},
	{
		...routerConstant.requests,
		component: null
	},
	{
		...routerConstant.noFound,
		component: () => import("../views/NoFound.vue")
	}
]