import cookie from 'cookie';
import {API_URL} from '../../config/index';
import axios from "axios";
import {toast} from "react-toastify";

export default async (req, res) => {
    const {
        transaction
    } = req.body
    const token = req.headers.authorization
    // console.log(transaction)
    // console.log(token)
    if (req.method === 'POST') {
        return axios.post(`${API_URL}/transactions`,
            {
                data: transaction
            }, {
                headers: {
                    Authorization: token,
                }
            })
            .then(response => {
                console.log('salem')
                res
                    .status(200)
                    .json(response.data)
            })
            .catch(function (error) {
                console.log('khata')
            })
        // console.log(response)
    } else if (req.method === 'PUT') {
        axios.put(`${API_URL}/transactions/${transaction.id}`,
            {
                data: {
                    type: transaction.type,
                    category: transaction.category,
                    description: transaction.description,
                    amount: transaction.amount,
                    date: transaction.date,
                },
            },
            {
                headers: {
                    Authorization: token
                }
            })
            .then(response => {
                console.log('salem')
                res
                    .status(200)
                    .json(response.data)
            })
            .catch(function (error) {
                console.log('khata')
            })
    } else if (req.method === 'DELETE') {
        // console.log(req.headers.cookie.slice(6))
        return axios.delete(`${API_URL}/transactions/${req.headers.id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                console.log('salem')
                res
                    .status(200)
                    .json(response.data)
            })
            .catch(function (error) {
                console.log('khata')
            })
    } else if (req.method === 'GET') {
        // console.log(req.headers.id)
        return axios.get(`${API_URL}/transactions${req.headers?.id ? req.headers.id : ''}`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                console.log('salem')
                res
                    .status(200)
                    .json(response.data)
            })
            .catch(function (error) {
                console.log('khata')
                console.log(error)
            })
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}
