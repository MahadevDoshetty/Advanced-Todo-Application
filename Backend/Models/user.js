import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});
const userInfo = new mongoose.Model("userInfo", schema);
const todos = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    todoLists: {
        type: Array
    }
});
const userTodos = new mongoose.Model("userTodos", todos);
export { userInfo, userTodos };