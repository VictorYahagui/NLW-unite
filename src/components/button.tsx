import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CircleHelp, MoreHorizontal } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type IconName = 'lefts' | 'left' | 'rights' | 'right' | 'more' | 'default';

const iconMap: { [key in IconName]: React.ComponentType } = {
    lefts: ChevronsLeft,
    left: ChevronLeft,
    rights: ChevronsRight,
    right: ChevronRight,
    more: MoreHorizontal,
    default: CircleHelp
}

interface ButtonIconType extends ComponentProps<'button'> {
    icon?: IconName,
    transparent?: boolean
}

export function Button({ icon, transparent, ...props }: ButtonIconType) {
    icon = icon || "default";
    const IconComponent = iconMap[icon];
    return (
        <button  {...props} className={
            twMerge('border border-white/10 rounded-md p-1.5',
                transparent ? 'bg-white/10' : 'bg-black/20',
                props.disabled ? 'opacity-40' : null
            )
        }>
            {IconComponent && <IconComponent size={16} color="white" />}
        </button>
    )
}