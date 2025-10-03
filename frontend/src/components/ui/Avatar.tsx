import React from "react";
import clsx from "clsx";
import { UserIcon } from "lucide-react";

type AvatarProps = {
    size?: "sm" | "md" | "lg";
    title?: string;
    subtitle?: string;
    role?: string;
};

const sizeClasses = {
    xs: "w-8 h-8 text-sm",
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
};

export const Avatar: React.FC<AvatarProps> = ({
    size = "md",
    title,
    subtitle,
    role,
}) => {
    return (
        <div className="flex items-center space-x-2">
            <div
                className={clsx("flex items-center px-3 py-1 rounded-full bg-slate-100 object-cover justify-center border border-slate-300", sizeClasses[size])}
            >
                <UserIcon className="text-primary" />
            </div>
            <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                    <span className="flex font-semibold text-sm text-gray-900">{title}</span>
                    {role && <span className="flex text-xs border h-fit border-slate-300 bg-slate-100 rounded-lg py-1 px-1 text-primary">
                        {role}
                    </span>}
                </div>
                {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
            </div>
        </div>
    );
};
