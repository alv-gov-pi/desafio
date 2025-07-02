function FormLogin() {

    return(
            <form action="" className='grid content-center gap-2 w-150'>
                <div className="grid">
                    <label htmlFor="email"/>Email
                    <input type="text" id='email' className="border border-sky-600 rounded-sm" name="email"/>
                </div>
                <div className="grid">
                    <label htmlFor="password"/>Senha
                    <input type="text" id='password' className="border border-sky-600 rounded-sm" name="password"/>
                </div>
                <div className="grid grid-cols-2 content-between">
                    <div><button className="bg-sky-600 p-2 rounded-sm w-24 text-white" type="submit">Logar</button></div>
                    <div className="mt-5 ml-59"><a href="http://" className="text-sky-600">Cadastro</a></div>
                </div>
        </form> 
    )
}

export default FormLogin;