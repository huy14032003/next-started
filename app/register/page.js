"use client";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useState } from "react";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
const handleRegister = async () => {
  try {
    const body = {
      email,
      password,
      phonenumber: phone,
      name,
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Kiểm tra phản hồi có hợp lệ không
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      alert(errorData.error || "Lỗi đăng ký");
      return;
    }

    const data = await res.json();
    alert(data.message);
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Không thể kết nối server (fail to fetch)");
  }
};
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="container-title mb-11">
          <span className="font-bold text-3xl">Register your account</span>
        </div>
        <div
          className="
          container-form
          p-5 w-96 rounded-2xl border border-gray-300
          bg-white/5 backdrop-blur-md
          shadow-lg
          transition duration-300
        ">
          <form action="" onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}>
            <div className="flex flex-col mb-3">
              <label htmlFor="" className="mb-3">
                Email address
              </label>
              <div className="relative">
                {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded px-3 w-full"
                  placeholder="Tài khoản"
                  style={{ height: "2.5rem" }}
                />
              </div>
            </div>

            <div className="flex flex-col mb-3">
              <label className="mb-3">Mật khẩu</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="w-full border rounded  px-3 "
                  style={{ height: "2.5rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-3">
              <label className="mb-3">Nhập lại Mật khẩu</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="w-full border rounded  px-3 "
                  style={{ height: "2.5rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="" className="mb-3">
                Full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="border rounded px-3"
                placeholder="Họ và tên"
                style={{ height: "2.5rem" }}
              />
            </div>
            {/* <div className="flex flex-col mb-3">
              <label htmlFor="" className="mb-3">
                Birthday
              </label>
              <input type="date" className="border rounded px-3" placeholder="Ngày sinh" style={{ height: "2.5rem" }} />
            </div> */}
            <div className="flex flex-col mb-3">
              <label htmlFor="" className="mb-3">
                Phone number
              </label>
              <input
              value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                type="text"
                className="border rounded px-3"
                placeholder="Số điện thoại"
                style={{ height: "2.5rem" }}
              />
            </div>
            <div className="flex items-start justify-center">
              <input
                type="checkbox"
                // checked={agreedToTerms}
                // onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4"
                id="agree"
              />
              <label className="ml-2 text-sm" htmlFor="agree">
                Tôi đồng ý với{" "}
                <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">Điều khoản dịch vụ</span>{" "}
                và{" "}
                <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">Chính sách bảo mật</span>
              </label>
            </div>
            <div className="flex justify-center items-center mx-6">
              <button
                type="submit"
                className="btn bg-blue-500 cursor-pointer hover:bg-blue-400 p-1 text-white rounded flex-1">
                Register
              </button>
            </div>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">Or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="flex justify-between items-center  gap-2">
              <button
                className="
                  px-6 py-2 rounded font-bold flex items-center justify-center gap-2 flex-1
                  bg-white text-black border border-gray-300
                  
                  hover:bg-gray-100  cursor-pointer
                  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
                ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" width="20" height="20">
                  <path
                    fill="#4285F4"
                    d="M533.5 278.4c0-17.3-1.5-34-4.4-50.3H272v95.2h146.9c-6.3 34-25.4 62.9-54.3 82v68h87.7c51.3-47.3 81.2-117 81.2-194z"
                  />
                  <path
                    fill="#34A853"
                    d="M272 544.3c73.5 0 135.2-24.4 180.2-66.2l-87.7-68c-24.4 16.3-55.8 26-92.5 26-71 0-131.1-47.9-152.7-112.2H32v70.6C76.7 485.5 167.7 544.3 272 544.3z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M119.3 320.7c-5.5-16.3-8.6-33.6-8.6-51.3s3.1-35 8.6-51.3V147H32C11.3 186.1 0 230.4 0 278.4s11.3 92.3 32 131.4l87.3-88.9z"
                  />
                  <path
                    fill="#EA4335"
                    d="M272 109.1c39.9 0 75.6 13.7 103.9 40.7l77.9-77.9C403.1 24.3 341.5 0 272 0 167.7 0 76.7 58.8 32 147l87.3 70.5C140.9 157 201 109.1 272 109.1z"
                  />
                </svg>
                <span className="">Google</span>
              </button>
              <button
                className="
                  px-6 py-2 rounded font-bold flex items-center justify-center gap-2 flex-1
                  bg-white text-black border border-gray-300
                  
                  hover:bg-gray-100  cursor-pointer
                  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
                ">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
                    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 
                    1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                    0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2
                    .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65
                    3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
                <span> Github</span>
              </button>
            </div>
          </form>
        </div>
        <div className="container-footer mt-5">
          <span className="font-medium text-gray-400"> You have account? </span>
          <Link href="/" className="text-blue-700 hover:text-blue-500 font-bold">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};
export default Register;
