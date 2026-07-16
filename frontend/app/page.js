import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import ProjectsGrid from '@/components/ProjectsGrid';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import DotGridBackground from '@/components/DotGridBackground';

export default function Home() {
  return (
    <>
      <DotGridBackground />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Skills />
        <About />
        <ProjectsGrid />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
