"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Signup } from "@/types/index";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  // const [ signupData, setSignupData ] = useState<Signup>({
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirm_password: ''
  // });

  // const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setSignupData(prev =>( {...prev, [name]: value}))
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(signupData);

  // };
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<Signup>();
  const onSubmit: SubmitHandler<Signup> = async (data) => {
    try{
      const response = await axios.post('http://localhost:5000/api/v1/auth/signup/', data);
      const { data: apiData } = response;
      if (apiData.success){
        router.push('/login');
      }; 
    } catch (err) {
      console.log(err);
      console.log(errors);
    } 
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
                          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                          <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required={true} {...register("username", { required: true })}/>
                      </div>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} {...register("email", { required: true })} />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} {...register("password", { required: true })} />
                      </div>
                      <div>
                          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                          <input type="password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} {...register("confirm_password", { required: true })} />
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600 dark:ring-offset-gray-800" required={true}/>
                          </div> 
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-gray-600 hover:underline dark:text-gray-500" href="#">Terms and Conditions</a></label>
                          </div>
                      </div>
                      <button type="submit" className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 cursor-pointer">Create an account</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account? <Link href="/login" className="font-medium text-gray-600 hover:underline dark:text-gray-500">Login here</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  );
}
