import React ,{useState}from 'react'

const LeaderBoard = () => {
    const [joinedTeam, setJoinedTeam] = useState('');
    const handleJoinTeam = () => {
        setJoinedTeam(selectedTeam);
      };
    
  return (

    <div>
        <section className="bg-gray-100 p-8 rounded-lg shadow-md mb-16">
        <h2 className="text-2xl font-bold mb-4">Leaderboard for {joinedTeam || 'Your Team'}</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border p-4 rounded-md">
            <h3 className="text-lg font-bold mb-2">1. Team A</h3>
            <p>Points: 100</p>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="text-lg font-bold mb-2">2. Team B</h3>
            <p>Points: 80</p>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="text-lg font-bold mb-2">3. Team C</h3>
            <p>Points: 60</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default LeaderBoard