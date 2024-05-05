import Swal from 'sweetalert2';
import { useAuthStore } from '../../store/authStore';

export default function SignOut() {
   const { logout } = useAuthStore();

   // Handle User Logout with SweetAlert
   const userLogout = () => {
      logout();
      Swal.fire({
         title: 'Logged Out',
         text: 'You have been successfully logged out',
         icon: 'success',
         confirmButtonText: 'Close'
      });
   };

   return (
      <div>
         <dialog id="sign-out" className="modal">
            <div className="modal-box">
               <h3 className="font-bold text-lg">Are you sure?</h3>
               <p className="py-4">Want You Signing Out...?</p>
               <div className="modal-action">
                  <div>
                     <div className="flex justify-between gap-4">
                        <button
                           className="btn btn-outline"
                           onClick={'closeModal'}>
                           Stay Logged In
                        </button>
                        <button
                           className="btn bg-error btn-outline text-[white]"
                           onClick={userLogout}>
                           Sign Out
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </dialog>
      </div>
   );
}
