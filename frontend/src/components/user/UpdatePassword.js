import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, updatePassword as updataPasswordAction } from '../../actions/userAction';
import { toast } from 'react-toastify';

export default function UpdatePassword() {
    const [oldPassword,setOldPassword] = useState("");
    const [password,setNewPassword] = useState("");
    const dispatch = useDispatch();
    const {isUpdated,error} = useSelector(state => state.authState)

    const submitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword',oldPassword);
        formData.append('password',password);
        dispatch(updataPasswordAction(formData));
    }

    useEffect(() =>{
        if(isUpdated){
            toast('Password Updated Successfully',{
                type:'success'
            })

            setOldPassword("");
            setNewPassword("");
            
            return;
        }

        if(error){
            toast(error,{
                type:'error',
                onOpen: () =>{dispatch(clearAuthError)}
            })
            return;
        }
    },[isUpdated,error,dispatch])

  return (
        <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form onSubmit={submitHandler} className="shadow-lg">
                            <h1 className="mt-2 mb-5">Update Password</h1>
                            <div className="form-group">
                                <label htmlFor="old_password_field">Old Password</label>
                                <input
                                    type="password"
                                    id="old_password_field"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="new_password_field">New Password</label>
                                <input
                                    type="password"
                                    id="new_password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                        </form>
                    </div>
        </div>
  )
}
