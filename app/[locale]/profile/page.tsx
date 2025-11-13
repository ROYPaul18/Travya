import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/Link";
import { getUser } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Check, Edit } from "lucide-react";

import { useIntlayer } from "next-intlayer/server";

export default async function ProfilePage({
  params,
}: {
  params: { locale: string };
}) {
  const user = await getUser();
  const content = useIntlayer("profile-page");

  if (!user) redirect(`/${params.locale}/auth/signin`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-10 px-4">
      <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 text-blue-100">
        <CardHeader className="flex items-center gap-4">
          <CardTitle>{content.pageTitle}</CardTitle>
          <div className="flex-1" />
          <Link className="flex items-center gap-2" href="profile/edit">
            <Edit className="size-3" /> 
            {content.editProfile}
          </Link>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-blue-200/70">{content.name}</div>
              <div className="font-medium text-white">{user.name ?? content.notProvided}</div>
            </div>
            <div>
              <div className="text-sm text-blue-200/70">{content.email}</div>
              <div className="font-medium text-white flex items-center gap-2">
                {user.email}
                {user.emailVerified && <Check className="size-4 text-green-400" />}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}