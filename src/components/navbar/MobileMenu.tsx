'use client'

import Image from "next/image";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

import mm16grid from "@/assets/mm16grid.png";

import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logOut } from "@/redux/slices/authSlice/authSlice";
import { authApiService } from "@/api/auth/auth";
import Swal from "sweetalert2";

const MobileMenu = ({ hamButtonRef, mobileMenuRef }: { hamButtonRef: React.RefObject<SVGSVGElement>, mobileMenuRef: React.RefObject<HTMLDivElement> }) => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const getUserData = useAppSelector((state) => state.userSlice.currentUser)
  const router = useRouter();

  return (
    <div className="mobilemenu z-50" ref={mobileMenuRef} style={{
      marginTop: "66px",
    }}>
      {pathname === "/user-dashboard" ? null : (
        <p
          onClick={() => {
            if (getUserData.userId) {
              router.push("/user-dashboard");
              mobileMenuRef.current?.classList.toggle("active");
              hamButtonRef.current?.classList.toggle("active");
            } else {
              router.push("/login");
              mobileMenuRef.current?.classList.toggle("active");
              hamButtonRef.current?.classList.toggle("active");
            }
          }}
        >
          Dashboard
        </p>
      )}
      {pathname === "/user-dashboard" || getUserData.userId ? null : (
        <p
          style={{ top: "150px" }}
          onClick={() => {
            router.push("/login");
            mobileMenuRef.current?.classList.toggle("active");
            hamButtonRef.current?.classList.toggle("active");
          }}
        >
          LOGIN
        </p>
      )}
      {pathname === "/user-dashboard" || getUserData.userId ? null : (
        <p
          style={{ top: "250px" }}
          onClick={() => {
            router.push("/register");
            mobileMenuRef.current?.classList.toggle("active");
            hamButtonRef.current?.classList.toggle("active");
          }}
        >
          REGISTER
        </p>
      )}
      {getUserData.userId ? (
        <p
          style={{ top: "150px", color: "red" }}
          onClick={async () => {
            try {
              const response = await authApiService.Logout();
              if (response.status === 200) {
                dispatch(logOut());
                mobileMenuRef.current?.classList.toggle("active");
                hamButtonRef.current?.classList.toggle("active");
                Cookies.remove('jwtToken')
                Cookies.set('u_auth_status', '')
                Cookies.set('u_id', '', { secure: true })
                window.location.href = "/";
                Swal.fire({
                  title: "Success",
                  text: "You have been logged out successfully",
                  icon: "success",
                });
              }
            } catch (error) {
              console.log(error);
              Swal.fire({
                title: "Error",
                text: `An error occurred during logout. Please try again. Error: ${error}`,
                icon: "error",
              });
            }
          }}
        >
          LOGOUT
        </p>
      ) : null}
      <div className="image-warper">
        <Image src={mm16grid} alt="" style={{
          maxWidth: "inherit",
          width: "900px",
        }}></Image>
      </div>
    </div>
  );
}

export default MobileMenu;
