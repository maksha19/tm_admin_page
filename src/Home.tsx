import React, { useState } from 'react';
import Dropdown from './Dropdown';
import ImageUpload from './ImageUpload';
import DateSelector from './DateSelector';
import axios from 'axios';


interface HomeInterface {
    mobileNumber: string | undefined | null
    logoutHandler: () => void
}

const Home: React.FC<HomeInterface> = ({ mobileNumber, logoutHandler }) => {
    const optionsKeyMaps: Record<string, number> = {
        'DD-Information': 8000100,
        'DD-Recognition': 8000101,
        'PQD-Trainings': 8000200,
        'PQD-Incentives': 8000201,
        'CGD-Outreach': 8000301,
        'CGD-Incentives': 8000302,
        'DPRM-Trainings': 8000400,
        'DPRM-Incentives': 8000401,
        'Div-A': 8000501,
        'Div-B': 8000502,
        'Div-D': 8000503,
        'Div-E': 8000504,
        'Div-G': 8000505,
        'Div-L': 8000506,
        'Div-S': 8000507,
        'Div-T': 8000508,
        'Div-U': 8000509,
        'Div-V': 8000510,
        'Div-Z': 8000511
    }
    const options = Object.keys(optionsKeyMaps);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
    const [alert, setAlert] = useState<Boolean>(false);
    const [imageType, setImageType] = useState<string>('image/jpeg')
    const [isImageSubmit, setIsImageSubmit] = useState(false)

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        console.log('handleOptionSelect', option);

    };

    const handleImage = (file: File) => {

        if (bytesToMB(file.size) > 1) {
            setAlert(true)
            clearAlret()
            console.log("file is more than 1Mb")
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setTimeout(() => {
                setSelectedFile(reader.result?.toString())
                setImageType(file.type)
            }, 0)

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const handleUpload = async () => {
        if (!selectedFile || !selectedOption || !selectedDate || !mobileNumber) {
            console.log('missing filed', { selectedFile, selectedDate, selectedOption, mobileNumber })
            setAlert(true)
            clearAlret()
            return
        };
        setIsImageSubmit(true)

        const requestData = {
            'eventId': optionsKeyMaps[selectedOption],
            'eventDate': selectedDate.getTime(),
            'from': parseInt(mobileNumber),
            'imageType': imageType,
            'image': selectedFile,
        }
        console.log('requestData', requestData);
        try {
            const response = await axios.post('https://dyt43w7xtmano5ykvxwohf7mym0nvrry.lambda-url.ap-southeast-1.on.aws/', requestData, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                clearState()
                return
            } 
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    const bytesToMB = (bytes: number): number => {
        if (bytes === 0) return 0;
        return bytes / (1024 * 1024); // 1 MB = 1024 KB, 1 KB = 1024 bytes
    }

    const clearAlret = () => {
        setTimeout(() => setAlert(false), 4000)
    }

    const clearState = () => {
        setTimeout(() => {
            setSelectedOption(null)
            setUploadedImageUrl(null)
            setSelectedDate(null)
            setSelectedFile(undefined)
            setAlert(false)
            setImageType('image/jpeg')
            setIsImageSubmit(false)
        }, 0)

    }

    return (
        <div className="container mt-20 mx-auto p-4">
            <h1 className="text-2xl pt-4 font-semibold mb-4">District-80 Telegram service</h1>
            <div className='flex justify-end'>
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red active:bg-red-700"
                onClick={()=> logoutHandler()}
            >
                Logout
            </button>
            </div>
            <Dropdown options={options} selectedOption={selectedOption} onSelect={handleOptionSelect} />
            <DateSelector selectedDate={selectedDate} onChange={handleDateChange} />
            <ImageUpload handleImage={handleImage} imageFile={selectedFile} />
            {uploadedImageUrl && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Uploaded Image Preview</h2>
                    <img src={uploadedImageUrl} alt="Uploaded" className="max-w-full mt-2" />
                </div>
            )}
            {alert && <div className="text-red-500">Image size should be with in 1Mb or Please fill all field</div>}
            {selectedFile && (
                <div className='flex justify-center'>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                    onClick={handleUpload}
                    disabled={isImageSubmit}
                >
                    {isImageSubmit ? "Uploading..." : "Submit"}
                </button>
                </div>
            )}
        </div>
    );
};

export default Home;
