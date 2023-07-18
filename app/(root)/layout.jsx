import Nav from '../components/Nav';
const HomeLayout = ({children})=>{
    return(
        <div className="bg-black h-full ">
            <nav className=" bg-black h-40 text-white ">
            <Nav />
            </nav>

            <div className=""> 
            {children}
            </div>
        </div>
    )
}

export default HomeLayout;