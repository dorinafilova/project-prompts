import Feed from "@components/Feed";
type Props = {};

const Home = (props: Props) => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center ">
        Discover and share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center ">CHATGPT prompts</span>
      </h1>
      <p className="desc text-center">Test app for sharing prompts</p>
      <Feed />
    </section>
  );
};

export default Home;
