export function getAllPosts(id) {
    const postData = [
        {id: 1, title: 'Post 1', description: 'This is the first post'},
        {id: 2, title: 'Post 2', description: 'This is the second post'},
        {id: 3, title: 'Post 3', description: 'This is the third post'}
    ];

    if (id) {
        return postData.filter(p => p.id == id);
    }

    return postData;
}