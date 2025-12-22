import { getSession } from "@/lib/auth-server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async ({ req }) => {
      const session = await getSession();
      if (!session || !session.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id, type: "voyage" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload voyage complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId, type: metadata.type };
    }),

  activityImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async ({ req }) => {
      const session = await getSession();
      if (!session || !session.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id, type: "activite" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload activité complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId, type: metadata.type };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
