const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  console.log(params);

  return <div>page</div>;
};

export default Page;
