import connect from "@/dbConfig/connect"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"
import bcrypt from "bcrypt"

connect()

export async function POST(request: NextRequest) {
   try {
      const body = await request.json()
      const { username, email, password } = body
      const user = await User.findOne({ email })
      if (user) {
         return NextResponse.json({ error: "user already exist" }, { status: 400 })
      }

      //hash password

      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(password, salt)
      const newUser = new User({
         username: username,
         email: email,
         password: hashedPassword
      })

      const savedUser = await newUser.save()

      return NextResponse.json({ message: "user created", success: true, savedUser })

   } catch (error: any) {
      return NextResponse.json({ error: error?.message }, { status: 500 })
   }
}

