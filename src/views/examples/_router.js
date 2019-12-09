export default [
    {
        path:'/examplepage1',
        name:'example-page1',
        meta:{
            title:"example-page1",
            requiresAuth: false,
        },
        component:() => import(/* webpackChunkName: 'example-page' */ './example-page1/index.vue')
    },
    {
        path: '/examplepage2',
        name: 'example-page2',
        meta: {
            title: "example-page1",
            requiresAuth: false,
        },
        component: () => import(/* webpackChunkName: 'example-page' */ './example-page2/index.vue')
    },
]