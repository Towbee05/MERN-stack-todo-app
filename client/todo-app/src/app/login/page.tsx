"use client"
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginType } from "@/types";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Link from "next/link";
// import './globals.css'

export default function Login() {  
  const router = useRouter();  
  const { register, handleSubmit, watch, formState: {errors}, } = useForm<LoginType>();
  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try{
        const response = await axios.post('http://localhost:5000/api/v1/auth/login/', data);
        const {data: apiData} = response;
        if (apiData.success){
          const token: string = apiData.data.token;
          Cookies.set('token', token);
          router.push('/');
        } else {
          console.log(apiData);
        };
    } catch (err) {
        console.log(err);
        console.log(errors);
    };
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen w-full grid place-items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <Image className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width={40} height={40}/>
              Flowbite    
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Create an account
                  </h1>
                  <form className="space-y-4 md:space-y-6" method="post" onSubmit={handleSubmit(onSubmit)}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" { ...register("email", {required: true})} />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("password", { required: true })} />
                      </div>
                      <button type="submit" className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 cursor-pointer"> Login </button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don&apos;t have an account yet? <Link href="/signup" className="font-medium text-gray-600 hover:underline dark:text-gray-500"> &nbsp;Create one</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  );
}
