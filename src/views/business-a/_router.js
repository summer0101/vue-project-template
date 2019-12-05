export default [
    {
        path:'/business-a/page-1',
        name:'business-a-page-1',
        meta:{
            title:"business-a-page-1",
            requiresAuth: false,
        },
        component:() => import(/* webpackChunkName: 'business-a-page-1' */ './business-a-page-1/index.vue')
    },
    {
        path: '/business-a/page-2',
        name: 'business-a-page-2',
        meta: {
            title: "business-a-page-2",
            requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: 'business-a-page-1' */ './business-a-page-2/index.vue')
    },
]