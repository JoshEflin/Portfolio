'use server'
import { revalidatePath } from "next/cache"

const commands = ['ls', 'cd', 'gui']
export const commandParser = async (_, formData) => {
    console.log(_, '\n underscore', formData, '\n formdata')

    const newCommand = formData.get('command');
    //
    //TO DO Validate Input
    //


    revalidatePath('/')
    return { message: newCommand };
}
