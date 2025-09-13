"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Signup, Message } from "@/types/index";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { handleFormErrors } from "@/util";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<Signup>();
  const [ message, setMessage ] = useState<Message>({});
  const [ activeMessage, setActiveMessage ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const onSubmit: SubmitHandler<Signup> = async (data) => {
    setIsLoading(true);
    setActiveMessage(false);
    try{
      const response = await axios.post('http://localhost:5000/api/v1/auth/signup/', data);
      const { data: apiData } = response;
      if (apiData.success){
        router.push('/login');
      }; 
    } catch (err) {
      handleFormErrors(err, setMessage, setActiveMessage);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen w-full grid place-items-center">
      {  activeMessage && 
          <div id="alert-border-2" className="flex items-center p-4 mb-5 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800 w-1/2" role="alert">
              <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <div className="ms-3 text-sm font-medium text-white space-y-2.5">
                  <h4>
                      { message.message } 
                  </h4>
                  <p>
                      { message.error }
                  </p>
              </div>
          </div>
      }
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
                          { errors.username && <p className="mt-2 text-red-400"> { errors.username.message } </p> }
                      </div>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} {...register("email", { required: true })} />
                          { errors.email && <p className="mt-2 text-red-400"> { errors.email.message } </p> }
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} {...register("password", { required: true })} />
                          { errors.password && <p className="mt-2 text-red-400"> { errors.password.message } </p> }
                      </div>
                      <div>
                          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                          <input type="password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} {...register("confirm_password", { required: true })} />
                          { errors.confirm_password && <p className="mt-2 text-red-400"> { errors.confirm_password.message } </p> }
                      </div>
                      <button type="submit" className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 cursor-pointer" disabled={isLoading}> 
                        <p className="flex items-center justify-center">
                          {isLoading ? (
                            // Loading spinner SVG
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : null}
                          {isLoading ? "Creating Account..." : "Create an account"}
                        </p>
                      </button>
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
