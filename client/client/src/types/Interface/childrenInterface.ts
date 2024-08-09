import { ReactNode } from "react"

export interface PropChildren {
    children?: ReactNode,
    to?: string | null,
    href?: string | null,
    className?: string
    onClick?: () => void
}