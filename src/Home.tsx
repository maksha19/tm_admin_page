import React, { useState } from 'react';
import Dropdown from './Dropdown';
import ImageUpload from './ImageUpload';
import DateSelector from './DateSelector';
import axios from 'axios';


const Home: React.FC = () => {
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

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        console.log('handleOptionSelect', option);

    };

    const handleImageUpload = (imageUrl: string) => {
        setUploadedImageUrl(imageUrl);
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
        if (!selectedFile || !selectedOption || !selectedDate) {
            setAlert(true)
            clearAlret()
            return
        };

        const requestData = {
            'eventId': optionsKeyMaps[selectedOption],
            'eventDate': selectedDate.getTime(),
            'image': selectedFile,
            'from': 12132,
             imageType

        }
        console.log('requestData', requestData);
        const headers ={
            'Content-Type' : 'application/json',
            'Access-Control-Request-Method': 'OPTIONS,POST,GET',
            'Access-Control-Allow-Origin': '*'
        }


        try {
            const response = await axios.post('https://bwmyshbjruht7f2qgzrnanxfcm0yktii.lambda-url.ap-southeast-1.on.aws/', requestData,{headers});
            clearState()
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
        }, 0)

    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Select the category</h1>
            <Dropdown options={options} selectedOption={selectedOption} onSelect={handleOptionSelect} />
            <DateSelector selectedDate={selectedDate} onChange={handleDateChange} />
            <ImageUpload onImageUpload={handleImageUpload} handleImage={handleImage} />
            {uploadedImageUrl && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Uploaded Image Preview</h2>
                    <img src={uploadedImageUrl} alt="Uploaded" className="max-w-full mt-2" />
                </div>
            )}
            {alert && <div className="text-red-500">Image size should be with in 1Mb or Please fill all field</div>}
            {selectedFile && (
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                    onClick={handleUpload}
                >
                    Upload
                </button>
            )}

        </div>
    );
};

export default Home;
