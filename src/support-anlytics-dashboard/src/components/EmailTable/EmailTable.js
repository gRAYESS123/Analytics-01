{/* Previous EmailRow component code ... */}

const EmailTable = ({ data, sortConfig, onSortChange }) => {
    // Memoize sorted data to prevent unnecessary sorts
    const sortedData = useMemo(() => {
      return [...data].sort((a, b) => {
        if (sortConfig.key === 'date') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return 0;
      });
    }, [data, sortConfig]);
  
    return (
      <div className="bg-white p-4 rounded-lg shadow col-span-2">
        <h3 className="font-bold mb-4">Email Data Explorer</h3>
  
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-600">
            Showing {data.length} emails
          </div>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 rounded ${
                sortConfig.direction === 'asc' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              } hover:bg-gray-200`}
              onClick={() => onSortChange({ key: 'date', direction: 'asc' })}
            >
              Oldest First
            </button>
            <button 
              className={`px-3 py-1 rounded ${
                sortConfig.direction === 'desc' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              } hover:bg-gray-200`}
              onClick={() => onSortChange({ key: 'date', direction: 'desc' })}
            >
              Newest First
            </button>
          </div>
        </div>
  
        <div className="overflow-x-auto max-h-96">
          <table className="min-w-full table-auto">
            <thead className="sticky top-0 bg-white">
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Sender</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Sentiment</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Content</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((email, index) => (
                <EmailRow 
                  key={`${email.sender}-${email.date}-${index}`}
                  email={email}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default EmailTable;