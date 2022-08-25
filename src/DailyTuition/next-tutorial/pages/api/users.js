// http://localhost:3000/api/users
import connectMongoDb from '../../db/connection';
import UserModel from '../../db/schema';

export default function get_Users(req, res) {
    connectMongoDb().catch(err => console.log(err));

    // const user = new UserModel({
    //     name: 'John Smith'
    // });

    // user.save().then(() => {
    //     res.status(200).json(user);
    // });

    // res.status(200).json([
    //     {id: 1, name: 'John Smith'},
    //     {id: 2, name: 'Jane Doe'}
    // ])

    const {method} = req;

    switch (method) {
        case 'GET':
            res.status(200).json({method: 'GET', endpoint: 'Users'});
            break;
        case 'POST':
            res.status(200).json({method: 'POST', endpoint: 'Users'});
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}