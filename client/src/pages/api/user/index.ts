import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/schemas/user'

export default async (req: NextApiRequest, res: NextApiResponse<User>): Promise<void> => {
    switch (req.method) {
        case 'POST':
            const user = await createUser()
            res.status(200).json(user)
            break
        default:
            res.status(405).end()
            break
    }
}

async function createUser(): Promise<User> {
    return await User.create({
        displayName: 'Greg',
        authSub: '123123'
    })
}
