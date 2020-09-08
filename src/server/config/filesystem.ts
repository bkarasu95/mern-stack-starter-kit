import path from "path";

export interface ConfigFileSystem {
    assetUrl: string,
    publicUrl: string,
    publicPath: string,
    uploadPath: string,
    imagesPath: string
}
export const fileSystem: ConfigFileSystem = {
    assetUrl: "/static",
    publicUrl: "/",
    publicPath: path.join(__dirname, "public"),
    uploadPath: path.join(__dirname, "public/assets"),
    imagesPath: path.join(__dirname, "public/assets/images")
}