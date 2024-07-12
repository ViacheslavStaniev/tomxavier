"use client";

import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { getURL } from 'next/dist/shared/lib/utils';
import Image from 'next/image';

export default function HomeCard() {
    const [base64String, setBase64String] = useState<string>('');

    // const handleFileChange = (event: { target: { files: FileList; }; }) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             if (typeof reader.result === 'string') {
    //                 setBase64String(reader.result);
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };


    // const [filePath, setFilePath] = useState('');

    // const handleFileChange = (event: { target: { files: any[]; }; }) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const file = event.target.files[0];
    //         // You can use file.name to get the file name or file.path to get the file path
    //         setFilePath(file.name); // Or use file.path if you need the full path
    //         console.log(file.name);
    //     }
    // };

    const [file, setFile] = useState<any>(null);
    const [result, setResult] = useState(null);
    const [transcription, setTranscription] = useState('answer will be here');

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        if (file) {
            getAnswer();
        }
    }, [file]);

    const getAnswer = () => {
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            if (reader.result) {
                const base64_image = reader.result.toString().split(',')[1];

                try {
                    const response = await axios.post('/api/openai', { base64_image });
                    setResult(response.data);
                    setTranscription(response.data.choices[0].message.content);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        getAnswer();
    };

    const removeFile = () => {
        setFile(null);
    }

    return (
        <div className="flex flex-col max-w-6xl w-[100%] px-[20px] sm:px-[28px] py-[16px] gap-[16px] text-black">
            <p className='font-sans text-[18px] font-semibold'>Start by uploading the capture of your conversation</p>
            <div className="flex flex-col gap-[8px]">
                <p className='font-sans text-[14px] font-medium'>Photo</p>
                {/* <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={(e: any) => { handleFileChange(e); }} /> */}
                <div className="flex w-full h-[40px] items-center px-[12px] bg-[rgba(51,51,51,0.08)] rounded-lg cursor-pointer">
                    <label htmlFor="dropzone-file" className={` cursor-pointer flex flex-row gap-[10px] dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 ${file ? 'w-[calc(100%-30px)]' : 'w-[calc(100%)]'}`}>
                        {
                            file ?
                                <Image src={file ? URL.createObjectURL(file) : ''} alt="" width={32} height={32} className='w-[32px] h-[32px]' />
                                :
                                <svg className="w-[20px] h-[20px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C12.3038 3 12.5911 3.13809 12.7809 3.3753L16.7809 8.37531C17.1259 8.80657 17.056 9.43586 16.6247 9.78087C16.1934 10.1259 15.5641 10.056 15.2191 9.62469L13 6.85078L13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14L11 6.85078L8.78087 9.62469C8.43586 10.056 7.80657 10.1259 7.3753 9.78087C6.94404 9.43586 6.87412 8.80657 7.21913 8.37531L11.2191 3.3753C11.4089 3.13809 11.6962 3 12 3ZM9 14L9 13H5C3.89543 13 3 13.8954 3 15V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15C21 13.8954 20.1046 13 19 13H15V14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14ZM17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18H17.01C17.5623 18 18.01 17.5523 18.01 17C18.01 16.4477 17.5623 16 17.01 16H17Z" fill="#383838" />
                                </svg>
                        }
                        <p className="font-sans text-[16px] sm:text-[14px] text-[rgba(51,51,51,0.55)] dark:text-gray-400" > {file?.name || "Choose an image..."} </p>
                        <input id="dropzone-file" type="file" value='' className="hidden" onChange={(e: any) => { handleFileChange(e); }} />
                    </label>
                    {
                        file &&
                        <svg className="flex w-[20px] h-[20px] justify-end" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={removeFile}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z" fill="#383838" />
                        </svg>
                    }
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <button className="font-sans w-[100%] sm:w-[50%] bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleSubmit}>
                    Tell me what to answer
                </button>
            </div>
            <p className="text-[16px] sm:text-[14px] text-[rgba(51,51,51,0.70)]">{transcription}</p>
            <div className='flex flex-col items-center'>
                <button className="font-sans w-[100%] sm:w-[50%] bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => { navigator.clipboard.writeText(transcription); }}
                >
                    Copy text to clipboard
                </button>
            </div>
        </div >
    );
}