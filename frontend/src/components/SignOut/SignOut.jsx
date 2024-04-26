import { useAuthStore } from '../../store/authStore';

export default function SignOut() {
   const { logout } = useAuthStore();

   // User Logout handler function
   const userLogout = () => {
      logout();
      window.location.href = '/';
   };

   return (
      <div>
         <dialog id="sign-out" className="modal">
            <div className="modal-box">
               <h3 className="font-bold text-lg">Are you sure?</h3>
               <p className="py-4">Want You Signing Out...?</p>
               <div className="modal-action">
                  <form method="dialog">
                     <div className="flex justify-between gap-4">
                        <button className="btn btn-outline">
                           Stay Logged In
                        </button>
                        <button
                           className="btn bg-error btn-outline text-[white]"
                           onClick={userLogout}>
                           Sign Out
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </dialog>
      </div>
   );
}
