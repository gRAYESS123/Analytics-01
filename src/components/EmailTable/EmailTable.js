import React, { useState } from 'react';
import { format } from 'date-fns';

const EmailTable = ({ data = [] }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (index) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subcategory
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Urgency
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sentiment
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((email, index) => (
            <React.Fragment key={index}>
              <tr 
                className={`hover:bg-gray-50 cursor-pointer ${expandedRows.has(index) ? 'bg-blue-50' : ''}`}
                onClick={() => toggleRow(index)}
              >
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className={`mr-2 transform transition-transform ${expandedRows.has(index) ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                    {email.subject}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {email.mainCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {email.subCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {format(new Date(email.date), 'MMM dd, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${email.urgency === 'High' ? 'bg-red-100 text-red-800' : 
                      email.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {email.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${email.sentiment > 0.5 ? 'bg-green-100 text-green-800' : 
                      email.sentiment > 0 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {email.sentiment.toFixed(2)}
                  </span>
                </td>
              </tr>
              {expandedRows.has(index) && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-800 bg-gray-50">
                    <div className="max-h-48 overflow-y-auto">
                      <p className="font-medium text-gray-900 mb-2">Email Body:</p>
                      {email.body || email.content || 'No content available'}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailTable;