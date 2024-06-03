import "./App.css";
import { useCreatePostMutation } from "./redux/services/jsonplaceholder";
/* import { useGetPostByIdQuery } from "./redux/services/jsonplaceholder"; */

function App() {
  /* const { data: post, error, isLoading } = useGetPostByIdQuery(8); */
  const [createPost, { isLoading, isError, error }] = useCreatePostMutation();

  console.log(isLoading, isError, error, "Data");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    const newPost = { title, body };

    try {
      await createPost(newPost).unwrap();
      console.log("Ekleme işlemi başarılı.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" />
        <textarea name="body" placeholder="Body" />
        <button type="submit" disabled={isLoading}>
          Create Post
        </button>
      </form>
    </div>
  );
}

export default App;
