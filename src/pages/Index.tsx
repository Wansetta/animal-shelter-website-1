
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import PetsSection from '@/components/home/PetsSection';
import HelpSection from '@/components/home/HelpSection';
import StatsSection from '@/components/home/StatsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PetsSection />
      <StatsSection />
      <HelpSection />
    </Layout>
  );
};

export default Index;
