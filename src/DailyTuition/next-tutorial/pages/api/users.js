// http://localhost:3000/api/users

export default function get_Users(req, res) {
    res.status(200).json([
        {id: 1, name: 'John Smith'},
        {id: 2, name: 'Jane Doe'}
    ])
}