// Mock data para simular una base de datos
let lists = [
    { id: 1, name: 'Lista de compras' },
    { id: 2, name: 'Tareas del trabajo' }
];

// Obtener todas las listas
const getAllLists = (req, res) => {
    res.status(200).json(lists);
};

// Crear una nueva lista
const createList = (req, res) => {
    const newList = {
        id: lists.length + 1,
        name: req.body.name
    };
    lists.push(newList);
    res.status(201).json(newList);
};

// Actualizar una lista por ID
const updateList = (req, res) => {
    const listId = parseInt(req.params.id);
    const list = lists.find(l => l.id === listId);
    
    if (!list) {
        return res.status(404).json({ message: 'Lista no encontrada' });
    }

    list.name = req.body.name;
    res.status(200).json(list);
};

// Eliminar una lista por ID
const deleteList = (req, res) => {
    const listId = parseInt(req.params.id);
    lists = lists.filter(l => l.id !== listId);
    res.status(204).end();
};

module.exports = {
    getAllLists,
    createList,
    updateList,
    deleteList,
};
