import React from "react"
import { Button } from "./button"
import { TableCell } from "./table/table-cell"
import { TableRow } from "./table/table-row"

type AtendeeProps = {
    code: string,
    name: string,
    email: string,
    inscription: string,
    checkingDate: string | React.ReactNode,

}

export function Attendee({ code, name, email, inscription, checkingDate, ...props }: AtendeeProps) {
    return (
        <TableRow>
            <TableCell style={{ width: 64 }}>
                <input className="size-4 bg-black/20 rounded border border-white/10 " type="checkbox" name="" id="" />
            </TableCell>
            <TableCell>{code}</TableCell>
            <TableCell>
                <div className="flex flex-col gap-1 ">
                    <span className="font-semibold text-white">{name}</span>
                    <span>{email}</span>
                </div>
            </TableCell>
            <TableCell>{inscription}</TableCell>
            <TableCell>{checkingDate}</TableCell>
            <TableCell>
                <Button icon="more" />
            </TableCell>
        </TableRow>
    )
}