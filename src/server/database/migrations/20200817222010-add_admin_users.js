const bcrypt = require("bcryptjs");

module.exports = {
  async up(db, client) {
    const password = await bcrypt.hash("1234567q", 10);
    const adminUser = {
      username: "superadmin",
      password: password,
      name: "Super Admin",
      status: true,
    };
    return db.collection("admin_users").insertOne(adminUser);
  },

  async down(db, client) {
    return db.collection("admin_users").deleteOne({ username: "superadmin" });
  },
};