

const Login = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl mb-2 mt-4 text-white font-poppins">Log in to your account</h2>
      <div className="min-h">
      <form action="" className="items-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-white font-poppins pt-32">Password</label>
          <input type="password" className="text-white/50 bg-white/5 outline-0 border-0 py-3 px-2 rounded-full" />
        </div>

        <button className="w-full p-3 mt-8 bg-violet-500 rounded-full text-white font-poppins">Continue</button>
      </form>
      </div>
     
    </div>
  )
}

export default Login