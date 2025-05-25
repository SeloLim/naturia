import React from "react";
import { 
  Leaf, 
  Droplets, 
  Heart, 
  FlowerIcon, 
  Globe, 
  Sparkles 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardTitle 
} from "@/components/ui/card";

const OurStory = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 font-sans pt-40">
      {/* Hero Section */}
      <section className="mb-16 relative overflow-hidden rounded-lg">
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-green-50 to-emerald-100 opacity-70"></div>
        <div className="absolute -z-10 top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        <div className="absolute -z-10 bottom-0 left-0 w-48 h-48 bg-emerald-100 rounded-full -translate-x-1/3 translate-y-1/3 opacity-60"></div>

        <div className="relative z-10 py-20 px-8 text-center">
          <div className="flex justify-center mb-6">
            <FlowerIcon size={48} className="text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-emerald-900 mb-6">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-emerald-800 max-w-2xl mx-auto font-light italic">
            A journey of natural beauty, sustainable practices, and the belief
            that skincare should nurture both you and the planet.
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-serif font-light text-emerald-800 mb-6">
              Our Beginnings
            </h2>
            <p className="text-neutral-700 mb-4">
              Naturia was born in 2015 from a simple yet powerful vision:
              skincare should work in harmony with nature, not against it. Our
              founder, Amelia Chen, struggled with sensitive skin for years and
              was frustrated by products filled with harsh chemicals and
              synthetic ingredients.
            </p>
            <p className="text-neutral-700 mb-4">
              After studying botanical science and traditional herbal remedies,
              Amelia created her first formulations in her small apartment
              kitchen, blending organic botanicals with scientific innovation to
              create gentle yet effective skincare.
            </p>
            <p className="text-neutral-700">
              What began as a personal quest for better skincare has blossomed
              into a globally loved brand committed to purity, sustainability,
              and results you can see and feel.
            </p>
          </div>
          <div className="bg-neutral-100 rounded-lg p-6 order-1 md:order-2 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center">
              <Leaf size={80} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="mb-20">
        <h2 className="text-3xl font-serif font-light text-emerald-800 mb-10 text-center">
          Our Philosophy
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white border-emerald-100 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <Droplets className="h-10 w-10 text-emerald-600" />
              </div>
              <CardTitle className="text-center mb-3 font-serif font-normal text-emerald-800">
                Purity
              </CardTitle>
              <CardDescription className="text-center text-neutral-600">
                We source the highest quality natural ingredients, avoiding
                harsh chemicals, synthetic fragrances, and anything that could
                harm your skin or the environment.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white border-emerald-100 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <Heart className="h-10 w-10 text-emerald-600" />
              </div>
              <CardTitle className="text-center mb-3 font-serif font-normal text-emerald-800">
                Efficacy
              </CardTitle>
              <CardDescription className="text-center text-neutral-600">
                Nature&apos;s power enhanced by science. Our formulations are
                rigorously tested to ensure they deliver real results while
                respecting your skin&apos;s natural balance.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white border-emerald-100 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <Globe className="h-10 w-10 text-emerald-600" />
              </div>
              <CardTitle className="text-center mb-3 font-serif font-normal text-emerald-800">
                Sustainability
              </CardTitle>
              <CardDescription className="text-center text-neutral-600">
                From ethical sourcing to recyclable packaging, we make choices
                that honor our commitment to preserving the planet for future
                generations.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="mb-20">
        <h2 className="text-3xl font-serif font-light text-emerald-800 mb-10 text-center">
          Our Journey
        </h2>
        <div className="space-y-12">
          <div className="flex">
            <div className="mr-6 pt-1">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-emerald-500"></div>
              </div>
              <div className="h-full w-0.5 bg-emerald-200 mx-auto mt-2"></div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-emerald-800 mb-2">
                2015
              </h3>
              <p className="text-neutral-700">
                Naturia founded in a small kitchen laboratory with our first
                three signature products.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-6 pt-1">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-emerald-500"></div>
              </div>
              <div className="h-full w-0.5 bg-emerald-200 mx-auto mt-2"></div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-emerald-800 mb-2">
                2017
              </h3>
              <p className="text-neutral-700">
                Opened our first sustainable laboratory and botanical garden in
                the countryside.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-6 pt-1">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-emerald-500"></div>
              </div>
              <div className="h-full w-0.5 bg-emerald-200 mx-auto mt-2"></div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-emerald-800 mb-2">
                2019
              </h3>
              <p className="text-neutral-700">
                Launched our award-winning Rose Renewal Collection and became
                certified plastic-neutral.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-6 pt-1">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-emerald-500"></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-emerald-800 mb-2">
                2022
              </h3>
              <p className="text-neutral-700">
                Expanded globally while initiating our &quot;Seeds of Change&quot; program
                to support organic farming communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-20 bg-gradient-to-r from-green-50 to-emerald-100 p-10 rounded-lg">
        <h2 className="text-3xl font-serif font-light text-emerald-800 mb-10 text-center">
          Our Promise
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex">
            <div className="mr-4">
              <Sparkles className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-emerald-800 mb-2">
                100% Transparency
              </h3>
              <p className="text-neutral-700">
                We believe you have the right to know exactly what&apos;s in your
                skincare and where it comes from.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4">
              <Sparkles className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-emerald-800 mb-2">
                Cruelty-Free Always
              </h3>
              <p className="text-neutral-700">
                We never test on animals and only partner with suppliers who
                share this commitment.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4">
              <Sparkles className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-emerald-800 mb-2">
                Eco-Conscious
              </h3>
              <p className="text-neutral-700">
                From recyclable glass bottles to biodegradable shipping
                materials, we minimize our environmental footprint.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4">
              <Sparkles className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-emerald-800 mb-2">
                Community Support
              </h3>
              <p className="text-neutral-700">
                We invest in the communities that grow our botanical ingredients
                through fair trade practices and education programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-serif font-light text-emerald-800 mb-6 text-center">
          The Faces Behind Naturia
        </h2>
        <p className="text-center text-neutral-700 mb-10 max-w-2xl mx-auto">
          Our passionate team of botanists, chemists, and skincare experts work
          together to bring you formulations that honor tradition while
          embracing innovation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="h-48 w-48 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <FlowerIcon size={64} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-medium text-emerald-800">
              Amelia Chen
            </h3>
            <p className="text-neutral-600">Founder & Botanical Specialist</p>
          </div>

          <div className="text-center">
            <div className="h-48 w-48 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Droplets size={64} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-medium text-emerald-800">
              Dr. Michael Rivera
            </h3>
            <p className="text-neutral-600">Chief Formulation Scientist</p>
          </div>

          <div className="text-center">
            <div className="h-48 w-48 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Globe size={64} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-medium text-emerald-800">
              Sophia Wong
            </h3>
            <p className="text-neutral-600">Sustainability Director</p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-serif font-light text-emerald-800 mb-6">
          Join Our Journey
        </h2>
        <p className="text-neutral-700 mb-8">
          Thank you for being part of the Naturia family. As we continue to grow
          and evolve, our commitment to natural beauty, sustainability, and your
          wellbeing remains at the heart of everything we do.
        </p>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-full transition-all">
          Explore Our Products
        </button>
      </section>
    </div>
  );
};

export default OurStory;
