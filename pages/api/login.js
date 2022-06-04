import cookie from 'cookie';
import {API_URL} from '../../config/index';
import axios from "axios";

export default async (req, res) => {
    const {
        identifier,
        password
    } = req.body
    // console.log(res)
    // if (req.method === 'POST') {
    return axios.post(`${API_URL}/auth/local`, {
            identifier,
            password
    }).then(response => {
        // console.log(response.data.jwt)
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', response.data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/',
            })
        )
        res
            .status(200)
            .json({user: response.data.user})
    }).catch(error => {

        console.log(error)
        res
            .status(500)
            .json({message: error.toJSON().message})
    })
    // console.log(response)
    // } else {
    //     res.setHeader('Allow', ['POST'])
    //     res.status(405).json({message: `Method ${req.method} not allowed`})
    // }
}
