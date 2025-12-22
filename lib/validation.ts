import {z} from 'zod';

export const signUpSchema=z.object({
    fullName:z.string().min(3),
    email:z.email(),
    password:z.string().min(8),
    universityId:z.coerce.number(),
    universityCard:z.string().nonempty("university Card is required"),
})

export const signInSchema=z.object({
    email:z.email(),
    password:z.string().min(8),
//     .regex(/[A-Z]/)
//     .regex(/[0-9]/);
})