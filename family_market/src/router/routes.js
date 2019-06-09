const routes = [
  {
    path: "/",
    component: () => import("layouts/LaunchScreen.vue"),
    children: [{ path: "", component: () => import("pages/PageLogin.vue") }]
  },
  {
    path: "/home",
    component: () => import("layouts/LayoutHome.vue"),
    children:[
      { path: "", name: "PageHome", component: () => import("pages/PageHome.vue") },
      { path: "recipes", name: "PageRecipes", component: () => import("pages/PageRecipes.vue") },
      { path: "account", name: "account", component: () => import("pages/PageAccount.vue") }
    ]
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
