const routes = [
  {
    path: "/",
    component: () => import("layouts/Home.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/listItems",
    component: () => import("layouts/ListItems.vue")
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
