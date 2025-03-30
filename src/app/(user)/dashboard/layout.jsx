"use client"
import DashboardLayout from "@/components/layout/DashboardLayout";
import { clearUser, setUser } from "@/store/userSlice";
import { auth } from "@/utils/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Dashbord = ({ children }) => {
  const dispatch  = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(setUser(adminData));
      } else {
        dispatch(clearUser());
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default Dashbord;
