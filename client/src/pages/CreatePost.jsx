import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getRandomPrompt} from '../utils/index.js';
import { Form, Loader } from '../components';

const CreatePost = () => {

    const navigate = useNavigate();

    //Definimos el estado inicial del formulario.
    const [form, setForm] = useState({ 
        name: '',
        prompt: '',
        photo: ''
    });

    const [generatedImg, setGeneratedImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratedImg(true);
                const response = await fetch('http://localhost:6700/api/v1/aura', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({ prompt: form.prompt})
                });

            const data = await response.json();
            setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });

            } catch (err) {
                alert(err);
            } finally {
                setGeneratedImg(false);
            }
        } else {
            alert('Please provide proper prompt');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:6700/api/v1/post', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ ...form }),
                });
            
                await response.json();
                navigate('/');

            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please generate an image with proper details');
        }
    };

    //Obtenemos los atributos name y value para actualizar el estado del formulario.
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    //Obtenemos los atributos random para generar un prompt.
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({...form, prompt:randomPrompt})
    }


    return (
    <>
    
    <section className='max-w-7x1 mx-auto p-8 pt-5'>

        <div>
            <h1 
            className='font-extrabold text-[#383A3C] text-[32px]'>
                Create an Image
            </h1>

            <p 
            className='mt-2 text-[#81909e] text-[16px] max-w-[700px]'>
                Create different image styles with AI image prompts.
                Get a decidedly digital look.
            </p>
        </div>

        <form className='mt-5 max-w-3x1' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5 '>
                <Form
                    labelName='What is your name'
                    type= 'text'
                    name='name'
                    placeholder='Napoleón Bonaparte'
                    value={form.name}
                    handleChange= {handleChange}
                />

                <Form
                    labelName='Write an AI image prompt and let´s go!'
                    type= 'text'
                    name='prompt'
                    placeholder='Imagine a mystical forest where the trees glow with a soft, ethereal light.'
                    value={form.prompt}
                    handleChange= {handleChange}
                    isSurpriseMe
                    handleSurpriseMe={handleSurpriseMe}
                />

                <div className='relative bg-gray-50 border border-gray-300 text-[#383A3C] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 h-96 flex justify-center items-center'>
                    {form.photo ? (
                        <img src={form.photo} 
                        alt={form.prompt}
                        className='w-full h-full object-contain' />
                    ) : (
                        <span 
                        className='material-symbols-outlined text-[200px] object-contain opacity-30 textcolor-[#81909e]'>
                            add_a_photo
                        </span>
                    )}

                    {generatedImg && (
                        <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                            <Loader/>
                        </div>
                    )}
                </div>

            </div>

            <div className='justify-center items-center text-center'>
                <button
                    type='button'
                    onClick={generateImage}
                    className='mt-6 focus:outline-none text-white bg-[#1691B2]  hover:bg-[#1a9ec2] focus:ring-4  focus:ring-[#aadfee] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#1691B2]  dark:hover:bg-[#1a9ec2] dark:focus:ring-[#1a9ec2]'>
                    {generatedImg ? 'Generating...' : ' Generate'}
                </button>

                <button
                    type='submit'
                    className='mt-6 focus:outline-none text-white bg-[#1B1B4D] hover:bg-[#232368] focus:ring-4 focus:ring-[#c4c4f1] font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-[#1B1B4D] dark:hover:bg-[#232368] dark:focus:ring-[#232368]'>
                    {loading ? 'Sharing...' : 'Share with the community'}
                </button>

                <p className='mt-2 text-[#81909e] text-[14px]'>
                    Once you have created the image you want, you can share it with others in the community.
                </p>
            </div>

        </form>
    </section>
    </>
    )
}

export default CreatePost