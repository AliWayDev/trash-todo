import {API} from "./App";
import axios from 'axios'
import {useEffect, useState} from "react";

export const Card = ({title, img, des, id, refresh, state, isDone, settype}) => {
    const [imgs, setimg] = useState(null)
    const done = async () => {
        await axios.put(API + `todos/${id}`, { isDone: true })
        refresh(!state)
    }

    const update = async () => {
        await axios.put(API + `todos/${id}`, { isDone: false })
        refresh(!state)
    }
    const getImage = async (id) => {
        try {
            const res = await axios.request(API + 'uploads/' + id).catch((e) => console.log(e))
            setimg(res.data.data)
        } catch (e) {
            throw e
        }
    }

    useEffect(() => {
        getImage(img)
    }, [id])

    return (
        <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg w-[370px] h-[350px] object-cover" src={imgs?.replace('""', '')} />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{des}</p>
                <a href="#"
                   onClick={() => done()}
                   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Done
                </a>
                {isDone && (
                    <a href="#"
                       onClick={() => update()}
                       className="inline-flex ml-4 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Revert
                    </a>
                )}
            </div>
        </div>
    )
}