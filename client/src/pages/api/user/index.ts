import { NextApiRequest, NextApiResponse } from 'next'

interface User {
    displayName: string
}

export default async (req: NextApiRequest, res: NextApiResponse<User>): Promise<void> => {
    switch (req.method) {
        case 'POST':
            res.status(200).json({ displayName: 'Test' })
            break
        default:
            res.status(405).end()
            break
    }
}
