import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { useIntlayer } from "next-intlayer/server";

import { EditForm } from "./edit-form";
interface PageProps {
  params: Promise<{ locale: string }>
}
export default async function EditProfile({
  params,
}: PageProps
) {
  const {locale} = await params
  const user = await getUser();
  const content = useIntlayer("edit-profile-page");

  if (!user) redirect(`/${locale}/auth/signin`);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 py-10 px-4">
      <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 text-blue-100">
        <CardHeader>
          <CardTitle>{content.pageTitle}aaa</CardTitle>
        </CardHeader>

        <CardContent>
          <EditForm defaultValue={{ name: user.name, image: user.image ?? null }} />
        </CardContent>
      </Card>
    </div>
  );
}