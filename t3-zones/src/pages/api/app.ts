import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log(`hip hop babe`)
    res.status(200).json({ name: 'John Doe' })
}