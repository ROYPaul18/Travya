import { Link } from "@/components/Link";
import { getUser } from "@/lib/auth-server";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart, LogOut, User, ChevronDown } from "lucide-react";
import { useIntlayer } from "next-intlayer/server";
import { LocaleModal } from "@/components/ui/LocaleModal";
import { SignOutButton } from "../ui/SignOutButton";

export const AuthButton = async ({ locale }: { locale: string }) => {
  const content = useIntlayer("auth-button", locale);
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex items-center gap-8">
        <Link
          href="/auth/signin"
          className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 hover:text-neutral-950 transition-colors duration-500"
        >
          {content.signIn}
        </Link>
        
        <Link
          href="/auth/signup"
          className="border border-neutral-950 text-neutral-950 px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-950 hover:text-white transition-all duration-500"
        >
          {content.signUp}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="outline-none ring-0 cursor-pointer group flex items-center gap-3">
            <div className=" rounded-full">
                <Avatar className="size-8 2xl:size-10">
                {user.image ? (
                    <AvatarImage src={user.image} alt={user.name ?? "User"} />
                ) : (
                    <AvatarFallback className=" text-neutral-950 font-light text-[10px]">
                        {user.email[0]?.toUpperCase()}
                    </AvatarFallback>
                )}
                </Avatar>
            </div>
            
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={20}
          className="bg-white border border-neutral-100 shadow-[0_30px_60px_rgba(0,0,0,0.08)] rounded-none min-w-[240px] p-0 animate-in fade-in zoom-in-95 duration-300"
        >
          {/* Header du Dropdown */}
          <div className="px-6 py-6 border-b border-neutral-50 bg-[#FBFBFB]">
            <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold mb-2">Compte Personnel</p>
            <p className="text-xs font-serif italic text-neutral-950 truncate text-[14px]">{user.email}</p>
          </div>

          <div className="py-2">
            <DropdownMenuItem asChild className="focus:bg-neutral-50 cursor-pointer rounded-none transition-colors px-6 py-3">
                <Link href="/profile" className="flex items-center justify-between w-full">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-700 font-medium">{content.profile}</span>
                    <User className="h-3.5 w-3.5 stroke-[1px] text-neutral-400" />
                </Link>
            </DropdownMenuItem>

            <div className="px-6 py-1">
                <LocaleModal currentLocale={locale} />
            </div>

            <DropdownMenuItem asChild className="focus:bg-neutral-50 cursor-pointer rounded-none transition-colors px-6 py-3">
                <Link href="/favorite" className="flex items-center justify-between w-full">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-700 font-medium">Favoris</span>
                    <Heart className="h-3.5 w-3.5 stroke-[1px] text-neutral-400" />
                </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="bg-neutral-50 h-[1px] mx-0" />

          <div className="p-0">
            <DropdownMenuItem asChild className="focus:bg-red-50 cursor-pointer rounded-none transition-all px-6 py-4 group/logout">
                 <div className="w-full">
                    <SignOutButton 
                        label={content.logout} 
                        className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 group-hover/logout:text-red-500 transition-colors"
                    />
                 </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};