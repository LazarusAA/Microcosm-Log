import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for featured species
const featuredSpecies = [
  {
    id: '1',
    name: 'Paramecium Caudatum',
    image_url: '/images/species/paramecium.jpg',
    description: 'Common freshwater protist with cilia for movement',
    slug: 'paramecium-caudatum',
  },
  {
    id: '2',
    name: 'Amanita Muscaria',
    image_url: '/images/species/amanita.jpg',
    description: 'Iconic red and white spotted mushroom',
    slug: 'amanita-muscaria',
  },
  {
    id: '3',
    name: 'Euglena Viridis',
    image_url: '/images/species/euglena.jpg',
    description: 'Flagellate with both plant and animal characteristics',
    slug: 'euglena-viridis',
  },
];

// Mock data for community threads
const communityThreads = [
  {
    id: 't1',
    title: 'What scope are you all using for pond samples?',
    author: 'MicroHunter',
    preview:
      "I've been using a basic 40x-1000x but struggling with clarity on ciliate identification...",
    likes: 24,
    replies: 18,
  },
  {
    id: 't2',
    title: 'Observations of Vorticella colonies in urban waterways',
    author: 'BioDiver',
    preview:
      "I've been documenting these fascinating protists in city fountains and finding unusual density patterns...",
    likes: 31,
    replies: 22,
  },
];

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        <title>Microcosm Log | A collective field journal</title>
        <meta
          name="description"
          content="Discover and document the hidden worlds of microorganisms and fungi"
        />
        <meta property="og:title" content="Microcosm Log" />
        <meta
          property="og:description"
          content="A collective journal of microorganisms and fungi."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://microcosmlog.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section with Image on Right */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Microcosm Log
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-12">
                A collective field journal for the hidden worlds beneath the microscope
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/logbook"
                  aria-label="Browse the Logbook"
                  className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                  Browse the Logbook
                </Link>
                <Link
                  href="/about"
                  aria-label="Learn more about Microcosm Log"
                  className="px-8 py-4 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <Image 
                  src="/images/hero.png" 
                  alt="Scientists observing microorganisms"
                  width={600}
                  height={500}
                  className="mx-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Microcosm Log? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">What Is Microcosm Log?</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-6 mb-12">
            <p>
              Microcosm Log combines curated scientific research with community observations to create a
              living archive of microorganisms and fungi. It's a place where professional researchers,
              educators, and curious hobbyists collaborate to document the microscopic world.
            </p>
            <p>
              Our mission is to foster open collaboration, education, and curiosity about the ecosystems that
              exist all around us — but often go unseen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                title: 'Discover', 
                icon: '🧬', 
                text: 'Explore species and observations from around the world',
                color: 'bg-blue-50',
                border: 'border-blue-200',
                shadow: 'shadow-blue-100'
              },
              { 
                title: 'Document', 
                icon: '📝', 
                text: 'Contribute your findings to our growing database',
                color: 'bg-green-50',
                border: 'border-green-200',
                shadow: 'shadow-green-100'
              },
              { 
                title: 'Connect', 
                icon: '🤝', 
                text: 'Join a community of microbe-loving explorers',
                color: 'bg-purple-50',
                border: 'border-purple-200',
                shadow: 'shadow-purple-100'
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`flex flex-col items-center p-6 ${item.color} rounded-lg shadow-md border ${item.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual divider */}
      <div className="relative h-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 text-gray-50 fill-current">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
          </svg>
        </div>
      </div>

      {/* Featured Species */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Species</h2>
            <Link href="/logbook" className="text-blue-600 hover:text-blue-800 font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpecies.map((species) => (
              <Link
                key={species.id}
                href={`/logbook/${species.slug}`}
                className="group"
                aria-label={`View species: ${species.name}`}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src={species.image_url}
                      alt={species.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Species name label that appears on hover */}
                    <div className="absolute left-0 right-0 bottom-0 p-3 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-lg font-semibold">{species.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                      {species.name}
                    </h3>
                    <p className="text-gray-600 mt-1">{species.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visual divider */}
      <div className="relative h-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden transform rotate-180">
        <div className="absolute inset-x-0 bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 text-white fill-current">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
          </svg>
        </div>
      </div>

      {/* Community Threads */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Community Discussions</h2>
            <Link href="/threads" className="text-blue-600 hover:text-blue-800 font-medium">
              All discussions →
            </Link>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {communityThreads.map((thread) => (
              <div
                key={thread.id}
                className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <Link
                  href={`/threads/${thread.id}`}
                  className="block mb-3"
                  aria-label={`Read discussion: ${thread.title}`}
                >
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
                    {thread.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4">{thread.preview}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                      {thread.author.charAt(0)}
                    </div>
                    <span>{thread.author}</span>
                  </div>
                  <div className="flex space-x-4">
                    <span>👍 {thread.likes}</span>
                    <span>💬 {thread.replies}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="relative py-24 text-white text-center overflow-hidden">
        {/* Gradient background with blob shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 z-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
        </div>

        {/* Small decorative microorganisms */}
        <div className="absolute top-10 right-10 w-24 h-24 rounded-full border-2 border-blue-300 opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 rounded-full border border-purple-300 opacity-30"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-blue-300 opacity-10"></div>

        <div className="container relative mx-auto px-4 z-10">
          <h2 className="text-4xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Share your microscope discoveries, contribute to research, and connect with other enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/create"
              className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Log Your First Observation
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 bg-transparent text-white font-medium rounded-lg border border-white shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">Microcosm Log</h3>
              <p className="max-w-xs">Built by curious minds, for curious minds.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Explore</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/logbook" className="hover:text-white">
                      Logbook
                    </Link>
                  </li>
                  <li>
                    <Link href="/threads" className="hover:text-white">
                      Discussions
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="hover:text-white">
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Community</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/guidelines" className="hover:text-white">
                      Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-white">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="hover:text-white">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Microcosm Log. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
