import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import InputProps from "../models/interfaces/InputProps";
import { trpc } from "../utils/trpc";
import ZButton from "./components/form/button";
import Input from "./components/form/Input";
import { useSession, signIn, signOut } from "next-auth/react"



function SimpleTextSection({ title, description, linkName, linkUrl=null } : any){
  return(
      <div className="mb-10">
          <div className="flex justify-center">
              <img 
                  alt=""
                  className="h-14 w-14"
                  src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"/>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {description} {' '}
            {linkUrl && linkName && <Link href={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                {linkName}
            </Link>}
          </p>
      </div>
  )
}


const LoginPage: NextPage = () => {
  const { data: session } = useSession()

  return <div className="flex full-width justify-center items-center h-full">
    <div className="w-96 bg-white shadow rounded p-6 shadow-2xl shadow-purple-500/50

" > 
{session?.user?.email}

            <SimpleTextSection
                title="Zones BenchMark"
                description="Don't have an account yet ? "
                linkName="Signup with Github"
                linkUrl="/signup"
              />
              <form className="mt-8 space-y-6">
        </form>
        <ZButton onClick={() => signIn(`github`)} >
          Logar com Github
        </ZButton>
    </div>
  </div> 

};

export default LoginPage;


const loginFields : InputProps[] = [
  { 
    id:"email-address",
    labelText:"Email address",
    labelFor:"email-address",
    name:"email",
    type:"email",
    autoComplete:"email",
    isRequired:true,
    placeholder:"Email address"   
  },
  {
      labelText:"Password",
      labelFor:"password",
      id:"password",
      name:"password",
      type:"password",
      autoComplete:"current-password",
      isRequired:true,
      placeholder:"Password"   
  }
]