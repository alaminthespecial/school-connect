import React from 'react'
import AdminSet from './AdminSet'

const WelcomePage = () => {
  return (
    <div className=''>
    
      <title>Welcome | School Connect</title>
      <meta name="description" content="Connect with students across schools, collaborate on projects, and boost your learning with School Connect!" />
    

    <main className="max-w-screen-xl mx-auto py-16 px-4">
      {/* Hero Section */}
      <div className="flex-1">
          <AdminSet/>
        </div>
      <section className="flex flex-col md:flex-row items-center">
        
        <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">Level Up Your Learning</h1>
          <h2 className="text-2xl font-medium text-gray-600 mt-4 md:mt-2">
            <span className="text-teal-600">Connect,</span> collaborate, and <span className="text-teal-600">amplify</span> your studies.
          </h2>
          <p className="text-gray-500 mt-4">
            Join School Connect, the platform that connects students across schools to achieve more together. Find like-minded peers, tackle projects collaboratively, and unlock your full academic potential.
          </p>
        </div>
      

      
        <div className="flex-1 mt-8">
          <img src="/student-teacher.jpeg" alt="Students collaborating" className="w-full rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Key Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
        <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md bg-gray-100 text-center hover:bg-gray-200">
          <span className="text-5xl text-teal-600 font-bold mb-4">Connect</span>
          <p className="text-gray-500 text-lg">Break down school boundaries and find teammates who share your passions.</p>
        </div>
        <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md bg-gray-100 text-center hover:bg-gray-200">
          <span className="text-5xl text-teal-600 font-bold mb-4">Collaborate</span>
          <p className="text-gray-500 text-lg">Form study groups, brainstorm ideas, and tackle projects together, boosting your understanding and retention.</p>
        </div>
        <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md bg-gray-100 text-center hover:bg-gray-200">
          <span className="text-5xl text-teal-600 font-bold mb-4">Amplify</span>
          <p className="text-gray-500 text-lg">Learn from diverse perspectives, gain new skills, and build confidence through collaborative learning.</p>
        </div>
      </section>

      {/* Join the Community Section */}
      <section className="flex flex-col items-center mt-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Ready to connect and learn beyond limits?</h2>
        <a href="/sign-up" className="bg-teal-600 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">Join School Connect</a>
      </section>
    </main>
  </div>
  )
}

export default WelcomePage