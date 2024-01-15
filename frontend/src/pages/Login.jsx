import { useState } from 'react';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import srcimg from '../assets/best.jpg';
import '../styles/colorgradient.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);

        } catch (error) {
            console.error('Error during login:', error.message);
        }

    }

    const redirectToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className='w-screen h-screen flex bg-gradient-to-br from-cyan-50 via-white to-gray-300 background-animate'>
            <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] align-middle items-center border-black'>
                <div className='w-full h-[550px] hidden md:block'>
                    <img src={srcimg} alt="" className='w-full h-full' />
                </div>
                <Card className="flex p-4 flex-col justify-around items-center align-middle">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <h2 className='text-center text-4xl font-bold mb-8 text-black'>LOG IN</h2>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" className='text-black' />
                            </div>
                            <TextInput id="email" type="email" value={email} placeholder="mario@gmail.com" required onChange={(e) => setEmail(e.target.value)} className='text-black' />
                        </div>
                        <div className='py-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" className='text-black' />
                            </div>
                            <TextInput id="password1" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} className='text-black' />
                        </div>
                        <div className='text-center flex justify-center'>
                            <Button type="submit" disabled={isLoading} className=' bg-teal-700 hover:bg-teal-900 text-center mx-auto h-[40px]'>Login</Button>
                        </div>
                        <div className='text-center mb-1 block'>
                            <Button onClick={redirectToSignup} className='text-teal-700 hover:text-teal-900 w-full p-2'>Don't have an account ? Sign up</Button>
                        </div>
                        {error && (
                            <p style={{ color: 'red' }}>{error.message || 'An error occurred during login'}</p>
                        )}
                    </form>
                </Card>
            </div>
        </div >
    );
}

export default Login;