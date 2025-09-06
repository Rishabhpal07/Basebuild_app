import Fotter from '../components/Fotter'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authcontext';

function Home() {
  const navigate=useNavigate();
  const {isAuthenticated}=useAuth();
   const handleRegister=()=>{
    !isAuthenticated? navigate('/Register') :null
   }
  return (
    <>
    <div className='min-h-screen flex-col '>
    <div className='sm:flex justify-between'>
        <div>
        <div className='p-6 sm:pt-40 pt-20 font-bold text-4xl max-w-2xl'>
         Basebuild will make developers life easy
      </div>
      <div className='p-6 max-w-2xl font-sans'>
      Find your perfect coding partner on <span className='font-bold'>Basebuild! </span>Smart developers are waiting to team up with you for hackathons, projects, contests, and more. Build, collaborate, and grow your network – all in one place
        </div> 
        <div className='px-10'>
        <button className='p-3 bg-blue-500 text-white rounded-full' onClick={handleRegister}>try it out! →</button>  
        </div>
        </div>
      <div>
      <div className=" mt-10 md:mt-0">
          <img
            src="https://a.storyblok.com/f/99519/1100x620/ed97c33044/blog-20866226-softwaredevelop-01-12-23.png/m/2160x1218/filters:format(png)"
            alt="Widget Preview"
            className=" mt-20 rounded-lg shadow-lg w-4xl sm:pl-9 h-96"
          />
        </div>
      </div>
      </div>
      <div className='sm:mt-60 mt-20 border-t-2'>
        <Fotter/>
      </div>
      </div>
    </>
  )
}

export default Home
