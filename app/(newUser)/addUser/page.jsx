import NewUser from '../../components/addUser';
import currentUser from '../../actions/getCurrentUser'

const TheUserAdd = async () => {
    const theCurrentUser = await currentUser();
    const currentUserId = theCurrentUser?.id || '' ;
    return(
        <div className='h-full flex w-full'>
            <div className='m-auto w-full'>
            <NewUser distributorId={currentUserId} />
            </div>
        </div>
    )
}

export default TheUserAdd ;