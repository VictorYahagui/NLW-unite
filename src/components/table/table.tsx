import { ComponentProps } from "react";

interface TablePorps extends ComponentProps<'table'> {

}

export function Table(props: TablePorps) {
    return (
        <div className="border border-white/10 rounded-lg">
            <table className="w-full" {...props}>

            </table>
        </div>
    )
}