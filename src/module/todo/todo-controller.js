import { todos } from '../../models';


// database queries here so using async function
// alternative to promises
export const getAllTodos = async (req, res) => {
  try {
    const fetchedTodos = await todos.find({});
    if (!fetchedTodos) {
      return res.status('200').json({ status: 200, success: false, message: 'Something unexpected happened' });
    }
    return res.status('200').json({
      status: 200,
      success: true,
      data: fetchedTodos,
    });
  }
  catch(dbError) {
    return res.status('500').json({
      status: 500,
      success: false,
      error: dbError,
      message: dbError.message,
    });
  }
}

export const createATodo = async (req, res) => {
  try {
    const { title } = req.body;

    console.log('title', req.body);
    let todoPostResponse = await todos.create({ title });
    return res.status('200').json({
      status: 200,
      success: true,
      title: todoPostResponse.title,
      id: todoPostResponse._id,
      complete: todoPostResponse.complete,
      creation_date: todoPostResponse.creation_date,
    });
  }
  catch(dbError) {
    return res.status('500').json({
      status: 500,
      success: false,
      error: dbError,
      message: dbError.message
    })
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const _id = req.params.delete_id;
    console.log('id hre', _id);
    let removeRes = await todos.deleteOne({ _id: _id });
    if (removeRes.deletedCount) {
      return res.status('200').json({
        status: 200,
        success: true,
        message: 'record deleted successfully'
      });
    }
    return res.status('400').json({
      status: 400,
      success: false,
      message: 'Record not found'
    });
  }
  catch(dbError) {
    return res.status('500').json({
      status: 500,
      error: dbError,
      message: dbError.message
    });
  }
}