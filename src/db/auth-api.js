import supabase, { supabaseUrl } from "./supabase";

export const loginUser= async(formdata)=>{
    const {data, error } = await supabase.auth.signInWithPassword(formdata)
    if(!data) throw new Error(error)
    return data
}
 
export const signUpNewUser = async({name, email, password})=> {

    // const filename = `dp-${name}-${Date.now()}`

    // const { error:storageError } = await supabase.storage.from("profile_pic").upload(filename,profile_pic)

    // if(storageError) throw new Error(storageError.message)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
          data:{
            name, 
          }
      },
    })

    if(error) throw new Error(error.message)
    return data
  }


export const getCurrentSession = async()=>{
  const { data, error } = await supabase.auth.getSession()
  if(error) throw new Error(error.message)
  console.log(data.session.user)
  return data?.session?.user
}  


export const logoutUser = async()=>{
  const { error } = await supabase.auth.signOut()
  if(error) throw new Error(error)
}