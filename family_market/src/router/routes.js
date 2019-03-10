const routes = [
  {
    path: "/",
    component: () => import("layouts/Home.vue"),
    children: [{ path: "", component: () => import("pages/PageLogin.vue") }]
  },
  {
    path: "/listItems",
    component: () => import("layouts/ListItems.vue"),
    children: [{ path: "", component: () => import("pages/PageListItems.vue") }]
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
