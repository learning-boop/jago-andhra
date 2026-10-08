import Hero from '../components/Hero';
import WhyJago from '../components/WhyJago';
import IssueTimeline from '../components/IssueTimeline';
import Order2025 from '../components/Order2025';
import Demands from '../components/Demands';
import Events from '../components/Events';
import DistrictMap from '../components/DistrictMap';
import Updates from '../components/Updates';
import Media from '../components/Media';
import Gallery from '../components/Gallery';
import Documents from '../components/Documents';
import SocialMedia from '../components/SocialMedia';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyJago />
      <IssueTimeline />
      <Order2025 />
      <Demands />
      <Events />
      <DistrictMap />
      <Updates />
      <Media />
      <Gallery />
      <Documents compact />
      <SocialMedia />
      <Contact />
    </>
  );
}
