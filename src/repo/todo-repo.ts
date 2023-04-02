
import Todo, { ITODO } from '../models/todo-model';

export async function getTodos() {
    const todos = await Todo.find();
    return todos;
}
export async function getTodo(id: string) {
    const todos = await Todo.findById(id);
    return todos;
}
export async function saveTodo(data: ITODO) {
    return Todo.create(data);
}
export async function updateTodo(doc: any, data: any) {
    if (doc) {
        doc.set(data);
        await doc.save();
    }
}
export async function deleteTodo(id: string) {
    await Todo.findByIdAndDelete(id);
}