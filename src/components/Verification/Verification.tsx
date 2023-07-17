import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyUserMutation } from "../../store/Slices/Signin"
import { useEffect } from "react";
import AppSnackbar from "../../utils/AppSnackbar";
const Verification = () => {
    const [verifyUser] = useVerifyUserMutation()
    const myParam = useLocation().search;
    const resetToken = new URLSearchParams(myParam).get("token");
    let navigate = useNavigate();
    console.log("reset token,",resetToken)
    const payload = {
        token: resetToken
    }
    const verifyUserDetails = async () => {
        try {
            await verifyUser({ payload }).unwrap()
            AppSnackbar({ type: "success", messageHeading: "Congratulations!", message: "Your account is verified Successfully!" });
            navigate("/login");
        }
        catch (error) {
            AppSnackbar({ type: "error", messageHeading: "Error!", message: "Something Wrong!" });
        }
    }
    useEffect(() => {
        if (resetToken) {
            verifyUserDetails()

        }
    }, [])
    return (
        <div>
            <p>Congratulations!</p>
            <p>you have successfully verified your account </p>
        </div>

    )
}
export default Verification