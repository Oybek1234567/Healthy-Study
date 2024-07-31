import { Icons } from "../../../assets/Icons";

const Profile = () => {
  return (
      <div>
          <Icons.profile />
          <b>johnbrown@gmail.com</b>
          <p className='mt-1'>
              First Name: <b className='ml-1'>John</b>
          </p>
          <p>
              Last Name: <b className='ml-1'>Brown</b>
          </p>
          <p>
              Date Of Birth: <b className='ml-1'>12.04.2000</b>
          </p>
          <p>
              Phone Number: <b className='ml-1'>+998 99 999 99 99</b>
          </p>
          <p>
              Passport Series: <b className='ml-1'>AB 1789629</b>
          </p>
      </div>
  );
}

export default Profile
