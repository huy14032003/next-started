import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // 1️⃣ Kiểm tra body JSON có hợp lệ không
    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json(
        { error: "Dữ liệu gửi lên không hợp lệ (phải là JSON)" },
        { status: 400 }
      );
    }

    const { email, password, name, phonenumber } = body;

    // 2️⃣ Kiểm tra trường trống
    if (!email || !password || !name || !phonenumber) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 }
      );
    }

    // 3️⃣ Kiểm tra email đã tồn tại chưa
    const existing = await prisma.account.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email đã tồn tại" }, { status: 400 });
    }

    // 4️⃣ Mã hóa mật khẩu
    const hashed = await bcrypt.hash(password, 10);

    // 5️⃣ Tạo tài khoản mới
    await prisma.account.create({
      data: {
        email,
        password: hashed,
        name,
        phonenumber,
        isactive: 1,
      },
    });

    // 6️⃣ Trả phản hồi
    return NextResponse.json({ message: "Đăng ký thành công" }, { status: 201 });
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json(
      { error: "Lỗi server, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
