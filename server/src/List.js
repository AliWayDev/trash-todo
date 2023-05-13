import {useEffect, useState} from "react";
import axios from "axios";
import {API} from "./App";
import {Card} from "./card";
import { v4 as uuidv4 } from 'uuid';

export const List = () => {
    const [all,setall] = useState([])
    const [img, setimg] = useState(null)
    const [refresh,setrefresh] = useState(false)
    const [type,settype] = useState('new')

    const [name, setname] = useState('')
    const [des, setdes] = useState('')

    const getAll = async () => {
        try {
            const res = await axios.get(API + 'todos?type=' + type)
            setall(res.data.data)
        } catch (e) {}
    }
    useEffect(() => {
        getAll()
    }, [refresh, type])

    const onSubmit = async () => {
        const uid = uuidv4()
        const formData = new FormData();
        formData.append("todo", img);

        let data  = {
            title: name,
            description: des,
            isDone: false,
            imageId: uid.toString()
        }

        await axios.post(API + 'todos', data).then(() => {
            axios.post(API + `uploads/${uid}`, formData).then(() => {
                setrefresh(!refresh)
                setname('')
                setdes('')
                setimg(null)
            })
        })
    }

    return (
        <div className='min-w-[620px] max-w-[820px] mx-auto w-full flex flex-col mt-3 px-6'>
            <div className='my-5 flex flex-col justify-center gap-2'>
                <div>
                    <input type="text" id="first_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Title" required
                        value={name}
                           onChange={(e) => setname(e.target.value)}
                    />
                </div>
                <div>
                    <input type="text" id="first_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Description" required
                           value={des}
                           onChange={(e) => setdes(e.target.value)}
                    />
                </div>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input" type="file" onChange={(event) => {
                    setimg(event.target.files[0]);
                }} />
                <button type="button"
                        onClick={() => {
                            onSubmit()
                        }}
                        className="focus:outline-none max-w-[150px] mt-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Send
                </button>
            </div>

            <div className="inline-flex rounded-md shadow-sm mt-7" role="group">
                <button type="button"
                        onClick={() => settype('new')}
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    New
                </button>
                <button type="button"
                        onClick={() => settype('old')}
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    Old
                </button>
            </div>
            <div className='flex flex-wrap gap-5 py-5 justify-between mt-4'>
                {all && all?.map((i) => (
                    <Card settype={settype} id={i?._id} isDone={i?.isDone} title={i?.title} img={i?.imageId} des={i?.description} refresh={setrefresh}  state={refresh}/>
                ))}
            </div>
        </div>
    )
}