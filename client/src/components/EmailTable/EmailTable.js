import React from 'react';
import { format } from 'date-fns';

function EmailTable({ data }) {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">Date</th>
            <th scope="col" className="py-3 px-6">Subject</th>
            <th scope="col" className="py-3 px-6">Status</th>
            <th scope="col" className="py-3 px-6">Response Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((email, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="py-4 px-6">{format(new Date(email.date), 'MM/dd/yyyy')}</td>
              <td className="py-4 px-6">{email.subject}</td>
              <td className="py-4 px-6">
                <span className={`px-2 py-1 rounded-full text-xs ${email.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {email.status}
                </span>
              </td>
              <td className="py-4 px-6">{email.responseTime} hours</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailTable;