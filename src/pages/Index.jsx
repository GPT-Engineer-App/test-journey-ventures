import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Paw } from "lucide-react";
import { motion } from "framer-motion";

const CatBreed = ({ name, description, image }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="mb-4 overflow-hidden h-full">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-purple-800">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr.",
  "The first cat in space was French. Her name was Felicette.",
  "Cats can jump up to six times their length.",
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [catFact, setCatFact] = useState("");
  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive coloring and vocal nature.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Maine Coon", description: "Large, gentle giants with long, fluffy coats.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "Persian", description: "Recognizable by their flat faces and long, luxurious fur.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
    { name: "Bengal", description: "Wild-looking cats with distinctive spotted or marbled coats.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
    { name: "Sphynx", description: "Hairless cats known for their wrinkled skin and large ears.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
  ];

  const filteredBreeds = catBreeds.filter(breed =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCatFact(catFacts[Math.floor(Math.random() * catFacts.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 2, 2, 1, 1],
              opacity: [1, 0.5, 0.5, 0.5, 0],
              top: ['0%', '100%'],
              left: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'loop',
              delay: i * 2,
            }}
          >
            <Paw size={24} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-7xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Feline Fancier
        </h1>
        
        <Carousel className="mb-8" opts={{ loop: true }}>
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index}>
                <img src={breed.image} alt={breed.name} className="mx-auto object-cover w-full h-[400px] rounded-lg" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-gray-700 mb-8 text-center"
        >
          Discover the wonderful world of cats! From playful kittens to majestic adults, 
          cats have been cherished companions for millennia. Explore our collection of 
          fascinating feline breeds and fall in love with these captivating creatures.
        </motion.p>

        <div className="flex items-center mb-6">
          <Input
            type="text"
            placeholder="Search cat breeds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-lg shadow-md mb-8"
        >
          <h3 className="text-xl font-semibold mb-2 text-purple-800">Cat Fact of the Day</h3>
          <p className="text-gray-600">{catFact}</p>
        </motion.div>

        <h2 className="text-4xl font-bold mb-6 text-center text-purple-800">Popular Cat Breeds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeds.map((breed, index) => (
            <CatBreed key={index} name={breed.name} description={breed.description} image={breed.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
