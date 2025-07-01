export const paths = {
	dashboard: {
		signIn: {
			getHref: () => '/dashboard/sign-in',
		},
		root: {
			getHref: () => '/dashboard',
		},
		collections: {
			getHref: () => '/dashboard/collections',
		},
		createCollection: {
			getHref: () => '/dashboard/collections/create',
		},
		collection: {
			getHref: (id: string) => `/dashboard/collections/${id}`,
		},
		categories: {
			getHref: () => '/dashboard/categories',
		},
		createCategory: {
			getHref: () => '/dashboard/categories/create',
		},
		category: {
			getHref: (id: string) => `/dashboard/categories/${id}`,
		},
		products: {
			getHref: () => '/dashboard/products',
		},
	},
};
