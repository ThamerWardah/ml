
const LoadingSpin = ()=> {
    return(
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-tr from-red-200/50 to-yellow-200/50"> 
            <div>
                <h1 className="text-green-500 shadow-sm shadow-white w-[50px] h-[50px] border-8 border-t-blue-700 border-b-transparent border-r-transparent border-l-transparent rounded-full text-center animate-spin">
                    
                </h1>
            </div>
        </div>
    )
}

export default LoadingSpin;