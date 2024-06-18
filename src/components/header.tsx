import { CodeXml } from "lucide-react";
import { NavLink } from "./nav-link";

export function Header() {
    return (
        <div className="flex items-center gap-5 py-2">
            <div className="w-8 h-8 flex justify-center items-center bg-orange-400 rounded-md p-1">
                <CodeXml color="black" />
            </div>
            <nav className="flex items-center gap-5">
                <NavLink href="/Eventos" text="Eventos" />
                <NavLink href="/Participantes" text="Participantes" />
            </nav>
        </div>

    )
}