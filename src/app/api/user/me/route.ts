import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/connect";
// import User from "@/models/userModel";
import { getUser } from "@/helpers/getUser";
import User from "@/models/userModel";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getUser(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }


}