import Authsignin from '../components/Authsignin'
import Label from '../components/Label'

function Signin() {
  return (
    <div className=' grid grid-cols-1 lg:grid-cols-2'>
        <Authsignin/>
        <div className=' hidden lg:block'>
          <Label/>
        </div>
    </div>
  )
}

export default Signin