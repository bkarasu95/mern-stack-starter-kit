import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { fileSystem } from "../../config/filesystem";

/**
 * Router Definition
 */
export const adminWebRouter = express.Router();

/**
 * Middleware Setups
 */
adminWebRouter.use(helmet({ contentSecurityPolicy: false }));
adminWebRouter.use(cors());

adminWebRouter.get("/*", (req: Request, res: Response) => {
  const html = `
    <html>
        <head>
          <link rel="stylesheet" href="/assets/css/admin.css">
        </head>
        <body>
            <div id="app"></div>
            <script src="${fileSystem.publicUrl}admin.js"></script>
        </body>
    </html>
  `;
  res.send(html);
});
