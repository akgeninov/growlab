import { Navigate, useNavigate } from 'react-router-dom'

const Protect = ({children}) => {
   const token = localStorage.getItem('token')
   if(token !== null) {
      return children
   }
   if(token === null) {
      return <Navigate to='/restrict-page' />
   }
}

export default Protect