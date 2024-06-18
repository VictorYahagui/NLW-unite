import { ComponentProps } from "react"

type NavProps = {
    text: string,
} & ComponentProps<'a'>

export function NavLink(props: NavProps) {
    const { text } = props
    return (
        <a className="font-medium text-sm" {...props}>{text}</a>
    )
}