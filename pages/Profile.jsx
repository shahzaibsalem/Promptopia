import Prompcard from "./Prompcard";

// const Profile = ({ name, desc, data = [], handleEdit, handleDelete }) => {
//   return (
//     <section className="w-full">
//       <h1 className="head_text text-left">
//         <span className="blue_gradient">{name}</span>
//       </h1>
//       <p className="desc text-left">{desc}</p>
//       <div className="flex flex-wrap gap-6 mt-6">
//         {data.map((post) => (
//           <Prompcard
//             key={post._id}
//             post={post}
//             handleEdit={() => handleEdit(post)}
//             handleDelete={() => handleDelete(post)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  if (data.length === 0) {
    return (
      <section className="w-full">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{name}</span>
        </h1>
        <p className="desc text-left">{desc}</p>
        <p>No posts available.</p>
      </section>
    );
  }

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="flex flex-wrap gap-6 mt-6">
        {data.map((post) => (
          <Prompcard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit(post)}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
