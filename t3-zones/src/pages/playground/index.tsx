import Image from "next/image";
import { useState } from "react";
import { addLayout } from "../../utils/add-layout"
import { trpc } from "../../utils/trpc";
import { CircularSpinner } from "../components/form/circular-spinner";
import expressImage from '../../../public/examples/express.png';

export default function Playground() {

    const check = trpc.useMutation([`services.check`]);
    const add = trpc.useMutation([`services.add`]);


    const [inputUrl, setInputUrl] = useState("https://core-api.revizia.app/api/server/publico/version")

    async function test() {

        if(check.isLoading) {
            return;
        }

        await check.mutate({
            url: inputUrl
        });
    }

    async function save() {

        if(check.isIdle) {
            await test();
        }

        if(check.isSuccess) {
            add.mutate({
                url: inputUrl
            });
        } else {
            check.reset()
            await test()
        }

    }


    return <div className="w-full relative" >

        <div className="mt-5" >
            
        </div>

        <div className="w-full m-auto max-w-xl" >
            <form className={`w-full m-auto max-w-xl ${check.isLoading && `opacity-50 grayscale-0`}`} onSubmit={e => e.preventDefault()} >
                <div className="flex items-center border-b border-teal-500 py-2">

                    <input name="url" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Type your URL Health/Version" aria-label="URL" />

                    <button onClick={test} className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                        Test
                    </button>

                    <button onClick={save} className={"flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" } type="submit">
                        Create Cron Job + 
                    </button>
                    
                </div>
            </form>
            <div className="text-right text-gray-700 text-opacity-75" >
                Check your <a target="_blank" className=" text-blue-500" href="https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS" >Cross-Origin Resource Sharing (CORS)</a>
            {/* Add https://zones-benchmark.com.br to your CORS */}
            </div>

            <br></br>
            {
               check.isLoading ? <div className=" w-full items-center flex justify-center flex-col " ><CircularSpinner color="black" /> <span className="text-2xl" >Loading request</span></div> : (
                    !check.isIdle && <div role="alert">
                        <div className={`text-white font-bold rounded-t px-4 py-2 ${check.isSuccess ? 'bg-teal-500' : 'bg-red-500'}`}   >
                            Danger
                        </div>
                        <div className={`border border-t-0  rounded-b px-4 py-3   ${check.isSuccess ? 'bg-teal-100 text-teal-800' : 'bg-red-300 text-red-700'}`}>
                            <div>
                                {check.isSuccess ? JSON.stringify(check.data) : check.error?.shape?.message }
                            </div>
                        </div>
                    </div>
                )
            }

            <br/>
            <br/>

            <div className="alert w-full" >
                <div className={`text-white font-bold rounded-t px-4 py-2 bg-blue-500`}   >
                    README - Tips
                </div>
                <div className={`border border-t-0 border-blue-400 rounded- px-4 py-3 bg-blue-200`}>
                    <div className="text-blue-800 text-md" >
                        1 - Create endpoint HTTP
                    </div>
                    <div className="text-blue-800 text-md" >
                        2 - Return your service version in PlainText
                    </div>

                    <div className="w-full mt-3 " >
                        <Image src={expressImage} className="rounded-xl"  />
                    </div>
                </div>
                
            </div>

        </div>
    </div>
}
addLayout(Playground)