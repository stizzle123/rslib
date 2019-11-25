import Layout from "../components/Layout";
import HeroContent from "../components/HeroContent";
import Tile from "../components/Tile";
import SectionContent from "../components/SectionContent";

class Index extends React.Component {
  render() {
    const { user } = this.props;
    // console.log(token.avatar);
    return (
      <Layout {...user}>
        <HeroContent {...user} />
        <Tile {...user} />
        {user && <SectionContent {...user} />}
      </Layout>
    );
  }
}

export default Index;
