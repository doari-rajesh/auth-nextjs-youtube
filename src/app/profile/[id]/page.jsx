export default function UserProfilePage({ params }) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] ">
        <h1 className="text-2xl text-center">{`profile ${params.id}`}</h1>
        <p>
          <span>{params.id}</span>
        </p>
      </div>
    );
  }
  