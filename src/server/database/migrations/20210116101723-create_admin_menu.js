module.exports = {
  async up(db, client) {
    const menu = [{
        id: 1,
        name: "dashboard",
        label: {
          key: "panel.dashboard",
        },
        url: "/dashboard",
        parentID: 0
      },
      {
        id: 2,
        name: "product_management",
        label: {
          key: "resource.management",
          params: {
            item: 'models.product'
          }
        },
        url: "/products/list",
        parentID: 0
      },
      {
        id: 3,
        name: "app_management",
        label: {
          key: "resource.management",
          params: {
            item: 'models.app'
          }
        },
        parentID: 0
      },
      {
        id: 4,
        name: "logs",
        label: {
          key: "panel.logs",
        },
        url: "/logs/list",
        parentID: 3
      }

    ]
    await db.collection('admin_menu').insertMany(menu);

  },

  async down(db, client) {
    await db.collection('admin_menu').drop();
  }
};