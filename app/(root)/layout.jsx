import Nav from '../components/Nav';
const HomeLayout = ({children})=>{
    return(
        <div className="bg-black h-full w-full">
            <nav className=" bg-black h-40 text-white ">
            <Nav />
            </nav>

            <div className="h-full w-full bg-black"> 
            {children}
            </div>
        </div>
    )
}

export default HomeLayout;