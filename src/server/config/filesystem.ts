import path from "path";
import { ConfigFileSystem } from "../../../@types/server/filesystem";

export const fileSystem: ConfigFileSystem = {
  assetUrl: "/static",
  publicUrl: "/",
  publicPath: path.join(__dirname, "public"),
  uploadPath: path.join(__dirname, "public", "assets"),
  imagesPath: path.join(__dirname, "public", "assets", "images"),
};
