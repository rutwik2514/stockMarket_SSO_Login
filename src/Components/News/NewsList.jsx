import React from 'react';

export default function NewsList({ articles }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 p-5">
      {articles.map((article, index) => (
        <div key={index} className="bg-white p-6 border-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl bg-white  font-extrabold mb-2">{article.title}</h2>
          <p className="text-gray-700 bg-white mb-4">{article.description}</p>
          <a
            href={article.url}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}
