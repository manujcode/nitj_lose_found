import React, { useState, useEffect } from 'react';
import { databases } from '../appwrite';
import { Query } from 'appwrite';
import SingleFoundItem from './singleFoundItem';

const Found = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await databases.listDocuments(
           import.meta.env.VITE_APPWRITE_DATABASE_ID,
           import.meta.env.VITE_APPWRITE_FOUND_COLLECTION_ID,
          [
            Query.orderDesc('$createdAt'),
          ]
        );
        setItems(response.documents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleClick = (id) => {
    setSelectedItem(id);
  };

  if (selectedItem) {
    return <SingleFoundItem id={selectedItem} setSelectedItem={setSelectedItem} />;
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className=" h-screen container mx-auto px-4 py-8">
      <h1 className="text-7xl underline font-bold text-center mb-8 text-green-500">Found Items</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div 
            key={item.$id} 
            onClick={() => handleClick(item.$id)} 
            className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={item.imageUrl}
                alt={item.title + ' image not available'}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                  Found
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl flex text-gray-800 font-medium mb-2">
                <div className='font-bold'>Title -&nbsp;</div>{item.title}
              </h2>
              <p className="flex text-gray-600 mb-2">
                <div className='font-bold'>Color -&nbsp;</div>
                <div>{item.color}</div>
              </p>
              
              <div className="flex justify-between items-center text-sm text-gray-800">
                <span className='flex'>
                  <div className='font-bold'>Found at:&nbsp;</div>
                  {item.location}
                </span>
                <span>{new Date(item.$createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-green-600 font-medium">
                  Found by: {item.name}
                </span>
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `tel:${item.phone}`;
                  }}
                >
                  {item.phone}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No items found
        </div>
      )}
    </div>
  );
};

export default Found;
