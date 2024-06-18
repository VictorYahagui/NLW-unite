import { Search } from "lucide-react";
import { Attendee } from "./attendee";
import { Button } from "./button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { ChangeEvent, useEffect, useState } from "react";
import { attendees } from "../data/attendees";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"


dayjs.extend(relativeTime);
dayjs.locale('pt-br');

interface AttendeeAPI {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null,

}

export function AttendeeList() {
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('query')) {
            return url.searchParams.get('query') ?? ''
        }
        return ''
    })
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'))
        }
        return 1
    })

    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / 10)
    //const totalPages = Math.ceil(attendees.length / 10)

    const [attendeesAPI, setAttendeesAPI] = useState<AttendeeAPI[]>([])
    useEffect(() => {
        const url = new URL("http://localhost:3333/events/9e9db979-9d10-4915-b339-3786b1634f33/attendees")

        url.searchParams.set(`pageIndex`, String(page - 1))
        if (search.length > 0) {
            url.searchParams.set(`query`, search)
        }


        fetch(`url`)
            .then(response => response.json())
            .then(data => {
                setAttendeesAPI(data.attendees)
                setTotal(data.total)
            })
    }, [page, search])

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString())
        url.searchParams.set('page', search)
        window.history.pushState({}, "", url)
        setSearch(search)
    }
    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value);
        setPage(1)
    }

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString())
        url.searchParams.set('page', String(page))
        window.history.pushState({}, "", url)
        setPage(page)
    }

    function firstPage() {
        setCurrentPage(1);
    }
    function previuPage() {
        setCurrentPage(page - 1)
    }
    function nextPage() {
        //setPage(page + 1);

        setCurrentPage(page + 1);
    }
    function lastPage() {
        setCurrentPage(totalPages);
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
                <h1 className="text-2xl font-bold">
                    Participantes
                </h1>
                <label className="flex items-center border gap-3 border-white/10 rounded-md bg-zinc-900 px-3 py-1">
                    <Search size={16} className="text-emerald-300" />
                    <input onChange={onSearchInputChanged} className="w-72 h-auto  flex-1 bg-transparent border-0 p-0 text-sm focus:ring-0 focus:border-gray-950 outline-none placeholder:text-zinc-400 " type="text" placeholder="Procurar Participantes..." />
                </label>
                {search}
            </div>

            <Table className="w-full">
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader>
                            <input className="size-4 bg-black/20 rounded border border-white/10 " type="checkbox" value={search} />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data de check-in</TableHeader>
                        <TableHeader style={{ width: 64 }}>
                        </TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendeesAPI.map((attendee) => {
                        return (
                            <Attendee
                                key={attendee.id}
                                code={attendee.id}
                                name={attendee.name}
                                email={attendee.email}
                                inscription={dayjs().to(attendee.createdAt)}
                                checkingDate={attendee.checkedInAt === null ? <span className="text-zinc-500">Sem check-in</span> : dayjs().to(attendee.checkedInAt)}
                            />
                        )
                    })}
                    {/*
                    separa o MAP em deperminado tamanho:. slice((page - 1) * 10, page * 10)
                    attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
                        return (
                            <Attendee key={attendee.id} code={attendee.id} name={attendee.name} email={attendee.email} inscription={dayjs().to(attendee.createdAt)} checkingDate={dayjs().to(attendee.checkedInAt)} />
                        )
                    })*/}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}> Mostrado {attendees.length} de {/*attendees.length*/ total}</TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Pag {page} de {totalPages}</span>
                                <div className="flex gap-2">
                                    <Button icon="lefts" transparent={true} onClick={firstPage} disabled={page === 1} />
                                    <Button icon="left" transparent={true} onClick={previuPage} disabled={page === 1} />
                                    <Button icon="right" transparent={true} onClick={nextPage} disabled={page === totalPages} />
                                    <Button icon="rights" transparent={true} onClick={lastPage} disabled={page === totalPages} />
                                </div>
                            </div>

                        </TableCell>
                    </tr>
                </tfoot>
            </Table>

        </div>
    )
}