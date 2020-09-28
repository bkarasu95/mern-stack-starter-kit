import { response } from "express";

// app specified response
response.customResponse = function (data?) {
  if (this.message == null) {
    this.message = "";
  }
  return this.json({ message: this.message, data: data });
};

// app specified message
response.setMessage = function (message) {
  this.message = message;
  return this;
};
