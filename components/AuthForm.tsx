'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { object, ZodType } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { FIELD_NAMES, FIELD_TYPES } from "@/app/constants"
import ImageUpload from "./Fileupload"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


interface Props<T extends FieldValues>{
  schema: ZodType<T,FieldValues>;
  defaultValues:T;
  onSubmit:(data:T)=>Promise<{success:boolean,error?:string}>;
  type:"SIGN_IN"|"SIGN_UP"
}




//authentication page dynamic Login registration page.
export default function AuthForm <T extends FieldValues> 
({type,schema,defaultValues,onSubmit}:Props<T>) {


  const router=useRouter()
  
const isSignIn=type==='SIGN_IN'
   // 1. Define your form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

 
  // 2. Define a submit handler.
  const handleSubmit : SubmitHandler<T>=async (data) =>{  
    const result =onSubmit(data)
    if((await result).success){
        toast("Success",{
          description:isSignIn?"You are Logged in":"You Signed in"
        })
         router.push("/")
    }else{
      toast(`Error ${isSignIn ? "signing in" : "signing up"}`,{
          description: (await result).error,
        
        })
    }  
  }


  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-semibold text-white">
        {
          isSignIn
          ?"Welcome Back"
          :"Create your Account"
        }
      </h1>
      <p className="text-light-100">
        {
          isSignIn
          ?"Access Vast resource of Books"
          :"Please complete all the fields"
        }</p>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} 
      className="w-full space-y-6 ">
        
        {Object.keys(defaultValues).map((field)=>(
          
          <FormField
          key={field}
          control={form.control}
          name={field as Path<T>}
          render={({ field }) => (
            <FormItem >
              <FormLabel className="capitalize">
                {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
              </FormLabel>
              <FormControl>
                {field.name=="universityCard"
                ?(<ImageUpload onFileChange={field.onChange}/>)
                :<Input 
                required 
                type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                } 
                {...field}
                className="form-input"
                />}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        ))}
       
        <Button className="form-btn" type="submit">
          {isSignIn?"Login":"Registration"}</Button>
      </form>
    </Form>
    <p className="text-center text-base font-medium pt-5">
          {!isSignIn?"New to Bookworm ": "Already have an account? "}
          <Link href={!isSignIn?"/signin":"/signup"} className="font-bold text-primary">
              {!isSignIn?"Sign In":"Sign Up"}
          </Link>
    </p>
 </div>
  )
}
