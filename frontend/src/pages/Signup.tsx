import Authsignup from '../components/Authsignup'
import Label from '../components/Label'

function Signin() {
  return (
    <div className=' grid grid-cols-1 lg:grid-cols-2'>
        <Authsignup/>
        <div className=' hidden lg:block'>
          <Label/>
        </div>
    </div>
  )
}

export default Signin
