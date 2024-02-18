import React from 'react'

const About = () => {
  return (
    <div className=''>
     
        <title>About | School Connect</title>
        <meta name="description" content="Unleash your learning power through collaboration with School Connect!" />
        <meta name="keywords" content="school, connect, learning, collaboration, students, study groups" />

      <main className="max-w-screen-xl mx-auto py-16 px-4">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center">
          <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">School Connect:</h1>
            <h2 className="text-2xl font-medium text-gray-600 mt-4 md:mt-2">
              Unleash Your Learning Power <span className="text-teal-600">Together</span>
            </h2>
            <p className="text-gray-500 mt-4">
              Connect, collaborate, and boost your learning journey with students across schools.
            </p>
          </div>
          <div className="flex-1 mt-8">
            <img src="/student-collaborating.jpeg" alt="Students collaborating" className="w-full rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Sections for Break the Classroom Walls, Boost Your Learning Game, More Than Just Studying, Join the Community */}

        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-8">Break the Classroom Walls</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="p-4 rounded-lg shadow-md bg-gray-100 hover:bg-gray-200">
              <span className="text-teal-600 text-2xl font-bold mr-2"></span> Connect with students beyond your school.
            </li>
            <li className="p-4 rounded-lg shadow-md bg-gray-100 hover:bg-gray-200">
              <span className="text-teal-600 text-2xl font-bold mr-2"></span> Find study buddies who share your interests.
            </li>
            <li className="p-4 rounded-lg shadow-md bg-gray-100 hover:bg-gray-200">
              <span className="text-teal-600 text-2xl font-bold mr-2"></span> Form diverse study groups and broaden your perspective.
            </li>
            <li className="p-4 rounded-lg shadow-md bg-gray-100 hover:bg-gray-200">
              <span className="text-teal-600 text-2xl font-bold mr-2"></span> Tap into a wider pool of knowledge and experiences.
            </li>
          </ul>
        </section>

        {/* ... other sections ... */}

        {/* Call to Action Section */}
        <section className="mt-16 flex justify-center">
          <button className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
            Join School Connect Today
          </button>
        </section>
      </main>
    </div>
  )
}

export default About