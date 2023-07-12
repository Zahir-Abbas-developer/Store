import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyUserMutation } from "../../store/Slices/Signin"
import {  useEffect } from "react";
const Verification=()=>{
    const [verifyUser]=useVerifyUserMutation()
    const myParam = useLocation().search;
    const resetToken= new URLSearchParams(myParam).get("token");
    let navigate = useNavigate();
    const payload={
        token:resetToken
      }
      useEffect(()=>{
        if(resetToken){
        verifyUser({payload})
        navigate("/login");
        }
    },[])
    return(
        <div>
            <p>Congratulations!</p>
             <p>you have successfully verified your account </p>
        </div>
    
    )
}
export default Verification