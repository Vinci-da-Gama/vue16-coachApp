export const routerConstant = {
	initSlash: "/",
	redirect: {
		path: "/",
		redirect: "/coaches"
	},
	coaches: {
		path: '/coaches',
		name: 'Coaches'
	},
	coachesId: {
		path: '/coaches/:id',
		name: 'CoachesDetails'
	},
	contact: {
		path: '/contact',
		name: 'Contact'
	},
	register: {
		path: '/register',
		name: 'Register'
	},
	requests: {
		path: '/requests',
		name: 'Requests'
	},
	noFound: {
		path: "/:notFound(.*)"
	}
};
