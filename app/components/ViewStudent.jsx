import React from 'react'

const ViewStudent = () => {
  return (
    <div className="md:flex-1 border-solid border-2 border-teal-600 p-10 rounded-lg shadow-xl w-126 m-2">

          <table className="table w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-teal-600">Name</th>
                <th className="px-4 py-2 text-left text-teal-600">Field of Interest</th>
                <th className="px-4 py-2 text-left text-teal-600">Team Perfomance</th>
                <th className="px-4 py-2 text-left text-teal-600">
                  <button>
                    Delete
                  </button></th>
              </tr>
            </thead>
            <tbody>
              {/* {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.fieldOfInterest}</td>
                </tr>
              ))} */}
              <tr >
                  <td className="px-4 py-2">Al Amin</td>
                  <td className="px-4 py-2">Software Engineering</td>
                  <td className="px-4 py-2">50%</td>
                  {/* svg delete */}
                  <td className="px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
                <tr >
                  <td className="px-4 py-2">Muhammad Al Amin</td>
                  <td className="px-4 py-2">DevOps Engineering</td>
                  <td className="px-4 py-2">70%</td>
                  <td className="px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
            </tbody>
          </table>


        </div>
  )
}

export default ViewStudent