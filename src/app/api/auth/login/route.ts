import { NextResponse } from 'next/server'
import { dbConnection } from 'src/utils/db'
import User from 'src/models/user'
import * as yup from 'yup';
import bcrypt from 'bcrypt';

const postSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
});


export async function POST(request: Request) {
    dbConnection()

    try {
        const { email, password } = await postSchema.validate(await request.json());
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, userFound.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }
        return NextResponse.json(
            { message: "ok", data: userFound }
        );
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}


// export async function GET() {
//     dbConnection()
//     const users = await User.find()
//     return NextResponse.json({ message: "Success", users })
// }

// export function POST() {
//     return NextResponse.json({
//         message: "Creating..."
//     })
// }