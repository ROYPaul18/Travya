import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/Link";
import { getUser } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Check, Edit, Mail, User } from "lucide-react";
import { useIntlayer } from "next-intlayer/server";

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = await params;
  const user = await getUser();
  const content = useIntlayer("profile-page");

  if (!user) redirect(`/${locale}/auth/signin`);

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">
            {content.pageTitle}
          </h1>
          <Link 
            href="profile/edit"
            className="flex items-center gap-2 px-4 py-2 text-sm font-light text-gray-900 bg-white border border-[#E3E3E3] rounded-sm hover:shadow-sm transition-all duration-300"
          >
            <Edit className="size-4" />
            <span className="hidden sm:inline">{content.editProfile}</span>
          </Link>
        </div>

        {/* Profile Card */}
        <Card className="border border-[#E3E3E3] bg-white rounded-sm overflow-hidden transition-all duration-500 hover:shadow-sm p-2">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-6">
              {/* Name Section */}
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500 shrink-0" />
                  <span className="text-sm font-light text-gray-600 tracking-wider">
                    {content.name}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-light text-gray-900">
                  {user.name ?? <span className="text-gray-500 font-normal">{content.notProvided}</span>}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

              {/* Email Section */}
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500 shrink-0" />
                  <span className="text-sm font-light text-gray-600 uppercase tracking-wider">
                    {content.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-light text-gray-900 break-all">
                    {user.email}
                  </span>
                  {user.emailVerified && (
                    <div className="shrink-0 bg-gray-900 text-white p-1 rounded-full">
                      <Check className="size-3" />
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              {user.emailVerified && (
                <>
                  <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                      {content.emailVerified || "Email vérifié"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}