interface Params {
  slug: string;
}

export default function SinglePost({ slug }: Params) {
  return (
    <div className="min-h-screen">
      <div className="container">
        <h1>{slug}</h1>
      </div>
    </div>
  );
}
