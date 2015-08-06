var db = {
    users: [{ username: 'rodrigo', password: 'test', id: 1 }],
    find: function(id) {
        for (var item in db.users){
            if (item.id === id)
                return item;
        }
        return undefined;
    }
};

module.exports = db;