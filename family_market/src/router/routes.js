const routes = [
  {
    path: "/",
    component: () => import("layouts/Home.vue"),
    children: [{ path: "", component: () => import("pages/PageLogin.vue") }]
  },
  {
    path: "/user",
    component: () => import("layouts/LayoutAllLists.vue"),
    children: [
      { path: "", name: "PageAllLists", component: () => import("pages/PageAllLists.vue") },
      { path: "editList/:idList", name: "editList", component: () => import("pages/PageEditList.vue") },
      { path: "account", name: "account", component: () => import("pages/PageAccount.vue") }
    ]
  },
  {
    path: "/:idList/Items",
    component: () => import("layouts/LayoutItems.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PageItems.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
