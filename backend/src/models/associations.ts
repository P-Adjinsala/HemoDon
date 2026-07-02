import Role from "./Role";
import User from "./User";

import Donor from "./Donor";
import Donation from "./Donation";
import Unit from "./Unit";

import Hospital from "./Hospital";
import Request from "./Request";

import Center from "./Center";
import Stock from "./Stock";

import Notification from "./Notification";
import Log from "./Log";

console.log("🔗 Loading Sequelize associations...");

/*
|--------------------------------------------------------------------------
| ROLE <-----> USER
|--------------------------------------------------------------------------
*/

Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users"
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role"
});

/*
|--------------------------------------------------------------------------
| USER <-----> DONOR
|--------------------------------------------------------------------------
*/

User.hasOne(Donor, {
  foreignKey: "user_id",
  as: "donor"
});

Donor.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

/*
|--------------------------------------------------------------------------
| USER <-----> NOTIFICATION
|--------------------------------------------------------------------------
*/

User.hasMany(Notification, {
  foreignKey: "user_id",
  as: "notifications"
});

Notification.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

/*
|--------------------------------------------------------------------------
| USER <-----> LOG
|--------------------------------------------------------------------------
*/

User.hasMany(Log, {
  foreignKey: "user_id",
  as: "logs"
});

Log.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

/*
|--------------------------------------------------------------------------
| DONOR <-----> DONATION
|--------------------------------------------------------------------------
*/

Donor.hasMany(Donation, {
  foreignKey: "donor_id",
  as: "donations"
});

Donation.belongsTo(Donor, {
  foreignKey: "donor_id",
  as: "donor"
});

/*
|--------------------------------------------------------------------------
| CENTER <-----> DONATION
|--------------------------------------------------------------------------
*/

Center.hasMany(Donation, {
  foreignKey: "center_id",
  as: "donations"
});

Donation.belongsTo(Center, {
  foreignKey: "center_id",
  as: "center"
});

/*
|--------------------------------------------------------------------------
| DONATION <-----> UNIT
|--------------------------------------------------------------------------
*/

Donation.hasMany(Unit, {
  foreignKey: "donation_id",
  as: "units"
});

Unit.belongsTo(Donation, {
  foreignKey: "donation_id",
  as: "donation"
});

/*
|--------------------------------------------------------------------------
| HOSPITAL <-----> REQUEST
|--------------------------------------------------------------------------
*/

Hospital.hasMany(Request, {
  foreignKey: "hospital_id",
  as: "requests"
});

Request.belongsTo(Hospital, {
  foreignKey: "hospital_id",
  as: "hospital"
});

/*
|--------------------------------------------------------------------------
| CENTER <-----> STOCK
|--------------------------------------------------------------------------
*/

Center.hasMany(Stock, {
  foreignKey: "center_id",
  as: "stocks"
});

Stock.belongsTo(Center, {
  foreignKey: "center_id",
  as: "center"
});

console.log("✅ Associations loaded");

console.log("Role associations :", Object.keys(Role.associations));
console.log("User associations :", Object.keys(User.associations));

console.log("Donor associations :", Object.keys(Donor.associations));
console.log("Donation associations :", Object.keys(Donation.associations));
console.log("Unit associations :", Object.keys(Unit.associations));

console.log("Hospital associations :", Object.keys(Hospital.associations));
console.log("Request associations :", Object.keys(Request.associations));

console.log("Center associations :", Object.keys(Center.associations));
console.log("Stock associations :", Object.keys(Stock.associations));

console.log(
  "Notification associations :",
  Object.keys(Notification.associations)
);

console.log(
  "Log associations :",
  Object.keys(Log.associations)
);

export {};