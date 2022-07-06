

function Home({response}) {

  return (
    <div>
      Hello world, {response}
    </div>
  )
}

Home.getInitialProps = async (ctx) => {



}

export default Home;
